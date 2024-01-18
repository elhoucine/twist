"use client";
import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js';
import Checkout from '@/components/stripe/Checkout';
import MarkdownPreview from '@/components/markdown/MarkdownPreview';
import { Database } from '@/lib/types/supabase';
import BlogLoading from './BlogLoading';

export default function BlogContent({ blogId }: { blogId: string }) {
    const [blog, setBlog] = useState<{
        blog_id: string;
        content: string;
        created_at: string;
    } | null>();
    const [loading, setLoading] = useState(true);

    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const readBlogContent = async () => {
        // TODO: fix is_admin not working in supabase 
        const { data } = await supabase
            .from('blog_content')
            .select('*')
            .eq('blog_id', blogId)
            .single();

        setBlog(data);
        setLoading(false);
    }

    useEffect(() => {
        readBlogContent();
        //eslint-disable-next-line
    }, []);

    if (loading) {
        return <BlogLoading />
    }

    if (!blog?.content) {
        return <Checkout />
    }

    return (
        <MarkdownPreview className='sm:px-10' content={blog?.content || ''} />
    )
}
