import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { buffer } from 'stream/consumers';
import { createSupabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_HOOKS_ENDPOINT_SECRET!;

export async function POST(request: any) {
    const rawBody = await buffer(request.body);
    let event;

    try {
        const sig = headers().get('stripe-signature');
        event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
    } catch (err: any) {
        return NextResponse.json({ error: 'Webhook error' + err?.message });
    }

    // Handle the event
    switch (event.type) {
        case "customer.updated":
            const customer = event.data.object;
            const subscription = await stripe.subscriptions.list({
                customer: customer.id
            });
            if (subscription.data.length) {
                const sub = subscription.data[0];
                // Call subase to user table.
                const { error } = await onSuccessSubscription(
                    sub.status === 'active',
                    customer.id,
                    sub.id,
                    customer.email!
                );

                if (error?.message) {
                    return NextResponse.json({ error: error.message })
                }
            }
        case "customer.subscription.deleted":
            const deleteSub = event.data.object;
            const { error } = await onCancelSubscription(false, deleteSub.id);
            if (error?.message) {
                return NextResponse.json({ error: 'Failed to cancel subscription' + error.message })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({});
}

const onCancelSubscription = async (subscription_status: boolean, subscriptionId: string) => {
    const supabaseAdmin = await createSupabaseAdmin();
    return await supabaseAdmin
        .from('users')
        .update({
            subscription_status,
            stripe_customer_id: null,
            stripe_subscription_id: null
        })
        .eq('stripe_subscription_id', subscriptionId)

}

const onSuccessSubscription = async (
    subscription_status: boolean,
    stripe_customer_id: string,
    stripe_subscription_id: string,
    email: string

) => {
    const supabaseAdmin = await createSupabaseAdmin();
    return await supabaseAdmin
        .from('users')
        .update({
            subscription_status,
            stripe_customer_id,
            stripe_subscription_id
        })
        .eq('email', email)
}