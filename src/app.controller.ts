import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/start')
  start() {
    this.appService.connect();

    return { running: this.appService.isSerialPortRunning };
  }

  @Get('/status')
  status() {
    return { running: this.appService.isSerialPortRunning };
  }

  @Get('/game')
  getQueue() {
    return this.appService.game;
  }
}
