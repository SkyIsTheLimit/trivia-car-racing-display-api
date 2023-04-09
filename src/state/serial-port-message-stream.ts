import { Logger } from '@nestjs/common';
import { MessageStream } from './message-stream';
import { SerialPort } from 'serialport';

export class SerialPortMessageStream extends MessageStream {
  private readonly logger = new Logger(SerialPortMessageStream.name);
  private messageQueue: { time: string; message: string }[] = [];
  private sp?: SerialPort;
  private isSerialPortRunning = false;

  constructor() {
    super();
  }

  checkMessages() {
    while (this.messageQueue.length) {
      const { message } = this.messageQueue.shift();

      this.receiveMessage(message);
    }
  }
  disconnect() {
    if (this.sp) {
      this.sp.close();
      this.sp = undefined;
    }
  }

  connect() {
    if (!process.env.SERIAL_PORT)
      throw 'Unable to connect to serial port. Please provide serial port address by setting the SERIAL_PORT variable.';

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

  isRunning() {
    return this.isSerialPortRunning;
  }
}
