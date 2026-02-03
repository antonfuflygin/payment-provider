import { BadRequestException, Injectable } from '@nestjs/common';
import { IPostPaymentParams } from './types';
import { PURCHAUSE_SUCCESS_CODE } from './const';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  postPayment({ cardNumber }: IPostPaymentParams) {
    this.validateCardNumber(cardNumber);
  }

  getExternalHost(): string {
    return this.configService.get<string>('EXTERNAL_HOST') ?? '';
  }

  private validateCardNumber(cardNumber: string) {
    if (cardNumber !== PURCHAUSE_SUCCESS_CODE) {
      throw new BadRequestException(
        'Номер карты введён неверно. Для покупки воспользуйтесь другой картой!',
      );
    }
  }
}
