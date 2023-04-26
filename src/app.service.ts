import { Injectable, Logger } from '@nestjs/common';
import { GameState } from './types';
import { MessageStream } from './state/message-stream';
import {
  mapArduinoStateToGameState,
  parseArduinoStateFromMesageString,
} from './arduino-state';
import { questions } from './questions';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private messageStream: MessageStream;
  private gameState: GameState;
  private isRegistered = false;
  private isConnected = false;

  setMessageStream(messageStream: MessageStream) {
    this.messageStream = messageStream;
  }

  getMessageStream() {
    return this.messageStream;
  }

  disconnect() {
    if (this.isConnected) {
      this.messageStream.disconnect();
      this.isConnected = false;
      this.logger.log('Disconnected from message stream');
    } else {
      this.logger.warn('Already disconnected from message stream. Skipping');
    }
  }

  connect() {
    if (!this.isRegistered) {
      this.messageStream.on('message', (message) => {
        const arduinoState = parseArduinoStateFromMesageString(message);

        this.gameState = mapArduinoStateToGameState(
          arduinoState,
          this.gameState,
        );

        if (this.gameState.answerRequest === 1) {
          this.messageStream.send(
            this.gameState.currentRound.question.answer + '\n',
          );
        } else if (this.gameState.currentRound.status === 'post-question') {
          this.messageStream.send(
            questions[this.gameState.difficulty][
              (this.gameState.currentRound.questionIndex + 1) %
                questions[this.gameState.difficulty].length
            ].answer || -1 + '\n',
          );
        }
      });
      this.isRegistered = true;

      this.logger.log('Registered with message stream.');
    } else {
      this.logger.warn('Already registered to message stream. Skipping');
    }

    if (!this.isConnected) {
      this.messageStream.connect();
      this.isConnected = true;
      this.logger.log('Connected to message stream.');
    } else {
      this.logger.warn('Already connected to message stream. Skipping');
    }
  }

  getGameState() {
    return this.gameState;
  }
}
