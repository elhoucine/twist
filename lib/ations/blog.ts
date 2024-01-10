"use server";
import { BlogFormSchematype } from '@/app/dashboard/schema';
import { revalidatePath } from 'next/cache';
import { createSupabaseServer } from '../supabase';

const DASHBOARD = '/dashboard';

export async function createBlog(data: BlogFormSchematype) {
    const supabase = await createSupabaseServer();
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
        revalidatePath(DASHBOARD);
        return JSON.stringify(result);
    }
}

export async function readBlog() {
    const supabase = await createSupabaseServer();
    return supabase
        .from('blog')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: true });
}

export async function readBlogAdmin() {
    const supabase = await createSupabaseServer();
    return supabase
        .from('blog')
        .select('*')
        .order('created_at', { ascending: true });
}

export async function deleteBlogById(id: string) {
    const supabase = await createSupabaseServer();
    const result = await supabase
        .from('blog')
        .delete()
        .eq('id', id);
    revalidatePath(DASHBOARD);
    return JSON.stringify(result);
}

export async function updateBlogById(id: string, data: BlogFormSchematype) {
    const supabase = await createSupabaseServer();
    const result = await supabase
        .from('blog')
        .update(data)
        .eq('id', id);
    revalidatePath(DASHBOARD);
    revalidatePath('/blog/' + id);
    return JSON.stringify(result);
}

export async function readBlogContent(blogId: string) {
    const supabase = await createSupabaseServer();
    return supabase
        .from('blog')
        .select('*, blog_content(*)')
        .eq('id', blogId)
        .single();
}

export async function updateBlogDetailById(id: string, data: BlogFormSchematype) {
    const supabase = await createSupabaseServer();
    const { ['content']: excludedKey, ...blog } = data;

    const resultBlog = await supabase
        .from('blog')
        .update(blog)
        .eq('id', id);

    if (resultBlog.error) {
        return JSON.stringify(resultBlog)
    } else {
        const result = await supabase
            .from('blog_content')
            .update({ content: data.content })
            .eq('blog_id', id)

        revalidatePath(DASHBOARD);
        revalidatePath('/blog/' + id);
        return JSON.stringify(result);
    }
}
