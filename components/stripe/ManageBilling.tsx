import React, { FormEvent, useTransition } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { manageBilling } from '@/lib/ations/stripe'
import { useUser } from '@/lib/store/user'
import { cn } from '@/lib/utils';
import { Button } from '../ui/button'

export default function ManageBilling() {
    const [isPending, startTransition] = useTransition();
    const user = useUser(state => state.user);
    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const data = await manageBilling(user?.stripe_customer_id!);
            window.location.href = data.url;
        });
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <Button className='flex items-center justify-between w-full' variant='ghost'>
                <span className="flex items-center gap-2">
                    <AiOutlineLoading3Quarters className={cn('animate-spin', {
                        hidden: !isPending
                    })} />
                    Billing
                </span>
            </Button>
        </form>
    )
}
