"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { createBlog } from '@/lib/ations/blog';
import { toast } from "@/components/ui/use-toast"
import { BlogFormSchematype } from '../../schema';
import BlogForm from '../../components/BlogForm'

export default function Page() {
  const router = useRouter()

  const handleCreate = async (data: BlogFormSchematype) => {
    const result = await createBlog(data);
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: "Failed to create post.",
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      })
    } else {
      toast({
        title: "Successfully create " + data.title,
      });

      router.push('/dashboard');
    }
  }

  return (
    <BlogForm onSubmit={handleCreate} />
  )
}
