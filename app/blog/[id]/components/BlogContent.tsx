"use client";
import MarkdownPreview from '@/components/markdown/MarkDownPreview';
import { Database } from '@/lib/types/supabase';
import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'

export default function BlogContent({ blogId }: { blogId: string }) {
    const [blog, setBlog] = useState<{
        blog_id: string;
        content: string;
        created_at: string;
    } | null>();
    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const readBlogContent = async () => {        
        const { data } = await supabase
            .from('blog_content')
            .select('*')
            .eq('blog_id', blogId)
            .single();

        setBlog(data)
    }

    useEffect(() => {
        readBlogContent();
        //eslint-disable-next-line
    }, []);

    return (
        <MarkdownPreview className='sm:px-10' content={blog?.content || ''} />
    )
}
