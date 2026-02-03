import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IPostPaymentParams } from './types';
import { PURCHAUSE_SUCCESS_CODE } from './const';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async postPayment({ courceId, cardNumber }: IPostPaymentParams) {
    await this.validateCardNumber(cardNumber, courceId);
  }

  private async validateCardNumber(cardNumber: string, courceId: string) {
    if (cardNumber !== PURCHAUSE_SUCCESS_CODE) {
      await this.sendOrderStatus(courceId, 'fialed');
      throw new BadRequestException('Номер карты введён неверно');
    } else {
      await this.sendOrderStatus(courceId, 'success');
    }
  }

  private async sendOrderStatus(order_id: string, status: string) {
    const externalUrl = this.configService.get<string>('EXTERNAL_HOST') ?? '';

    if (!externalUrl) {
      throw new InternalServerErrorException('Ошибка сервера');
    }

    const body = {
      order_id,
      status,
    };

    const response = await fetch(`${externalUrl}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new BadRequestException(
        'Номер карты введён неверно. Для покупки воспользуйтесь другой картой!',
      );
    }
  }
}
