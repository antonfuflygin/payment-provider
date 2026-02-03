import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import type { IPostPaymentPayload } from './types';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('/:id')
  @Render('index')
  getHello(): { host: string } {
    return { host: this.configService.get('EXTERNAL_HOST') ?? '' };
  }

  @Post('/:id')
  postPayment(
    @Param() { id }: { id: string },
    @Body() formData: IPostPaymentPayload,
  ) {
    this.appService.postPayment({
      courceId: id,
      cardNumber: formData.cardNumber,
    });
  }
}
