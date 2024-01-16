'use server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function checkout(email: string, redirectTo: string) {
    const result = await stripe.checkout.sessions.create({
        success_url: redirectTo || process.env.SITE_URL,
        cancel_url: process.env.SITE_URL,
        customer_email: email,
        line_items: [
            {
                price: process.env.PRO_PRICE_ID,
                quantity: 1
            }],
        mode: 'subscription'
    })

    return JSON.stringify(result);
}

export async function manageBilling(customerId: string) {
    return await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: process.env.SITE_URL
    });
}