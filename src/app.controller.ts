import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): string {
    return 'Hello' + request['user']?.email + '!';
  }

  @Get()
  getDiagnose(@Req() request: Request): any {
    return {
      status: 200,
      message: 'OK',
      diagnose: {
        result: 'Depressed',
      },
    };
  }
}
