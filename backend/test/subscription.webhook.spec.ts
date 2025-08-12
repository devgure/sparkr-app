// backend/test/subscription.webhook.spec.ts
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Stripe Webhook', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/webhook/stripe (POST)', () => {
    return request(app.getHttpServer())
      .post('/webhook/stripe')
      .set('Stripe-Signature', 'valid_signature')
      .send(require('./fixtures/stripe-checkout-session.json'))
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});