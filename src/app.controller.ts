import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MockMessageStream } from './state/mock-message-stream';
import { SerialPortMessageStream } from './state/serial-port-message-stream';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private appService: AppService) {
    if (process.env.DEV_MODE) {
      this.logger.debug('Running in DEV_MODE. Using mock message stream.');
      this.appService.setMessageStream(new MockMessageStream());
    } else {
      this.logger.log(
        'Connecting to serial port for messages. ' + process.env.SERIAL_PORT,
      );
      this.appService.setMessageStream(new SerialPortMessageStream());
    }
  }

  @Get('/start')
  start() {
    this.appService.connect();

    return { running: this.appService.getMessageStream().isRunning() };
  }

  @Get('/stop')
  stop() {
    this.appService.disconnect();
  }

  @Get('/status')
  status() {
    return { running: this.appService.getMessageStream().isRunning() };
  }

  @Get('/game')
  getQueue() {
    return this.appService.getGameState();
  }
}
