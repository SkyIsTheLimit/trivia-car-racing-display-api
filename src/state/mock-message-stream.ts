import { ArduinoMessagePacket } from 'src/arduino-state';
import { MessageStream } from './message-stream';
import { Logger } from '@nestjs/common';

const mockMessages: ArduinoMessagePacket[] = [
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0],
  // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  // [1, 1, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0],
  // [1, 1, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0],
  // [1, 2, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0],
  // [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  // [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  // [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export class MockMessageStream extends MessageStream {
  private readonly logger = new Logger(MockMessageStream.name);

  private intervalId: NodeJS.Timer;

  private messageNo = 0;
  private running = false;

  constructor() {
    super();
  }

  connect() {
    this.intervalId = setInterval(() => {
      const index = this.messageNo++ % mockMessages.length;
      const mock = mockMessages[index];
      const msg = `[${mock.join(',')}]`;

      this.logger.debug('Sending Message ' + msg);
      this.receiveMessage(msg);
    }, 2000);
    this.running = true;
  }

  disconnect() {
    clearInterval(this.intervalId);
    this.running = false;
  }

  isRunning() {
    return this.running;
  }

  send(message: string): void {
    // Do nothing
  }
}
