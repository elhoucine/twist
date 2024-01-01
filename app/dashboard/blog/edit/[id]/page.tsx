'use server';
import { readBlogContent } from '@/lib/ations/blog'
import React from 'react'
import EditForm from '../components/EditForm';

export default async function Page({ params }: {
    params: { id: string }
}) {
    const { data: blog } = await readBlogContent(params.id);
    return <EditForm blog={blog} />
}
