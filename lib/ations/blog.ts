"use server";
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { BlogFormSchematype } from '@/app/dashboard/schema';
import { Database } from '../types/supabase';
const cookieStore = cookies()

const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value
            },
            // set(name: string, value: string, options: CookieOptions) {
            //   cookieStore.set({ name, value, ...options })
            // },
            // remove(name: string, options: CookieOptions) {
            //   cookieStore.set({ name, value: '', ...options })
            // },
        },
    }
)

export async function createBlog(data: BlogFormSchematype) {
    const { ['content']: excludedKey, ...blog } = data;
    const resultBlog = await supabase.from("blog")
        .insert(blog)
        .select('id')
        .single();

    if (resultBlog.error) {
        // TODO: should remove inserted blog?
        return JSON.stringify(resultBlog);
    } else {
        const result = await supabase.from('blog_content')
            .insert({ blog_id: resultBlog.data.id, content: data.content })
            // TODO: revalidation
        return JSON.stringify(result);
    }
}

export async function readBlog() {
    return supabase
        .from('blog')
        .select('*')
        .order('created_at', { ascending: true });
}