import { Injectable, Logger } from '@nestjs/common';
import { Game } from './types';
import { SerialPort } from 'serialport';
import { questions } from './questions';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private messageQueue: { time: string; message: string }[] = [];
  private sp: SerialPort;

  isSerialPortRunning = false;
  game: Game = {
    state: 'not-started',
    difficulty: 'easy',
    rounds: [],
    questionNo: -1,
    menu: {
      title: 'Select Difficulty',
      options: ['Easy', 'Medium', 'Hard'],
      highlighted: 0,
    },
  };

  private saveRound(game: Game) {
    if (game.currentRound) {
      game.rounds.push({ ...game.currentRound });
    }
  }

  private checkMessages() {
    while (this.messageQueue.length > 0) {
      const item = this.messageQueue.shift();

      if (item) {
        const { message } = item;
        const [type, value] = message.split(':');

        switch (type) {
          case 'INIT':
            this.game.state = 'not-started';
            this.game.questionNo = -1;
            break;

          case 'START':
            if (this.game.currentRound) {
              this.saveRound(this.game);
            }

            this.game.questionNo =
              (this.game.questionNo + 1) %
              questions[this.game.difficulty].length;
            this.game.currentRound = {
              id: new Date().getTime(),
              question: questions[this.game.difficulty][this.game.questionNo],
            };
            this.game.state = 'waiting-1';

            break;

          case 'MENU':
            if (value === 'UP' && this.game.menu.highlighted > 0) {
              this.game.menu.highlighted--;
            }
            if (
              value === 'DOWN' &&
              this.game.menu.highlighted < this.game.menu.options.length - 1
            ) {
              this.game.menu.highlighted++;
            }
            if (value === 'SELECT') {
              this.game.difficulty =
                this.game.menu.highlighted === 0
                  ? 'easy'
                  : this.game.menu.highlighted === 1
                  ? 'medium'
                  : 'hard';
            }
            return;

          case 'P1':
          case 'P2':
            if (this.game.state !== 'not-started' && this.game.currentRound) {
              if (type === 'P1') {
                this.game.currentRound.p1Answer = value;
              }

              if (type === 'P2') {
                this.game.currentRound.p2Answer = value;
              }
            }

            if (this.game.state === 'waiting-1') {
              this.game.state = 'waiting-2';
            } else if (this.game.state === 'waiting-2') {
              this.game.state = 'finished';
            }

            break;
        }
      }
    }
  }

  connect() {
    if (!process.env.SERIAL_PORT) throw 'Please set SERIAL_PORT variable.';

    if (this.isSerialPortRunning) {
      this.logger.log('Serial port is already connected. Skipping.');
      return;
    } else {
      this.logger.log(
        'Attempting to connect to Serial Port' + process.env.SERIAL_PORT,
      );
      this.isSerialPortRunning = true;

      let temp = '';

      this.sp = new SerialPort({
        path: process.env.SERIAL_PORT,
        baudRate: 115200,
      });

      this.sp.on('data', (_chunk: Buffer) => {
        const text = _chunk.toString();

        for (let i = 0; i < text.length; i++) {
          const ch = text.charAt(i);

          if (ch === '[') {
            temp = '';
          } else if (ch === ']') {
            this.messageQueue.push({
              time: new Date().toISOString(),
              message: temp,
            });

            this.checkMessages();

            if (this.messageQueue.length > 10) {
              this.messageQueue.shift();
            }
          } else {
            temp += ch;
          }
        }
      });

      this.sp.on('close', () => {
        this.isSerialPortRunning = false;
        this.logger.log('The serial port was closed.');
      });

      this.sp.on('error', (err) => {
        this.isSerialPortRunning = false;
        this.logger.error('An error occured : ' + err.message);
      });
    }
  }
}
