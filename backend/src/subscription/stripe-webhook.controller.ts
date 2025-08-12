import { Controller, Post, Req, RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { SubscriptionService } from './subscription.service';
import * as rawBody from 'raw-body';
import * as crypto from 'crypto';
import { Stripe } from 'stripe';

@Controller('webhook')
export class StripeWebhookController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post('stripe')
  async handleWebhook(@Req() req: RawBodyRequest<Request>) {
    const sig = req.headers['stripe-signature'];
    const body = await rawBody(req);

    let event: Stripe.Event;
    try {
      event = require('stripe').webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      return { error: `Webhook signature verification failed: ${err.message}` };
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await this.subscriptionService.handleCheckoutSession(session);
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription;
      await this.subscriptionService.cancelSubscription(sub.id);
    }

    return { received: true };
  }
}