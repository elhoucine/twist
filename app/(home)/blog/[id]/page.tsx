import React from 'react'
import Image from 'next/image';
import { iBlog } from '@/lib/types';
import BlogContent from './components/BlogContent';

export async function generateStaticParams() {
    const { data: blog } = await fetch(process.env.SITE_PROD_URL + '/api/blog?id=*')
        .then(res => res.json()) as { data: iBlog[] };
    return blog
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data: blog } = await fetch(
        process.env.SITE_PROD_URL + '/api/blog?id=' + params.id
    ).then(res => res.json()) as { data: iBlog };

    return {
        title: blog?.title,
        authors: {
            name: 'Twist'
        },
        openGraph: {
            title: blog?.title,
            url: process.env.SITE_PROD_URL + 'blog/' + params.id,
            siteName: 'Twist',
            image: blog?.image_url,
            type: 'website'
        },
        keywords: ['frontend', 'frontend tips', 'frontend blog', 'twist blog']
    }
}

export default async function page({ params }: { params: { id: string } }) {
    const { data: blog } = await fetch(process.env.SITE_PROD_URL + '/api/blog?id=' + params.id)
        .then(res => res.json()) as { data: iBlog };

    if (!blog?.id) {
        return <h1>Not found</h1>;
    }
    return (
        <div className='max-w-5xl max-auto min-h-screen pt-10 space-y-10'>
            <div className="sm:px-10 space-y-5">
                <h1 className='text-3xl font-bold'>{blog?.title}</h1>
                <p className="text-sm text-gray-400">{new Date(blog?.created_at || '').toDateString()}</p>
            </div>
            <div className="relative m-10">
                <Image
                    className='object-hover object-center rounded-md border'
                    src={blog?.image_url || ''}
                    alt='cover'
                    width={800}
                    height={600}
                    priority
                />
            </div>
            <BlogContent blogId={blog.id} />
        </div>
    )
}
