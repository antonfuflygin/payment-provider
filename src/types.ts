export interface IPostPaymentPayload {
  cardNumber: string;
}

export interface IPostPaymentParams extends IPostPaymentPayload {
  courceId: string;
}
