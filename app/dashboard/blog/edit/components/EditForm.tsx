"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { updateBlogDetailById } from '@/lib/ations/blog';
import { BlogDetail } from '@/lib/types'
import { BlogFormSchematype } from '@/app/dashboard/schema';
import BlogForm from '@/app/dashboard/components/BlogForm'
import { toast } from '@/components/ui/use-toast';

export default function EditForm({ blog }: { blog: BlogDetail }) {
  const router = useRouter()

  const handleSubmit = async (data: BlogFormSchematype) => {
    const result = await updateBlogDetailById(blog?.id!, data);
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: "Failed to update post.",
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      })
    } else {
      toast({
        title: "Successfully updated " + data.title,
      });

      router.push('/dashboard');
    }
  }

  return (
    <BlogForm blog={blog} onSubmit={handleSubmit} />
  )
}
