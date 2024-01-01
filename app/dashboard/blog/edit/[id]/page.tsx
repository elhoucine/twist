'use server';
import { readBlogContent } from '@/lib/ations/blog'
import React from 'react'

export default async function Page({ params }: {
    params: { id: string }
}) {
    const { data } = await readBlogContent(params.id);
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}
