"use client";
import React from 'react'
import { toast } from "@/components/ui/use-toast"
import BlogForm from '../../components/BlogForm'
import { BlogFormSchematype } from '../../schema';
import { createBlog } from '@/lib/ations/blog';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter()

  const handleCreate = async (data: BlogFormSchematype) => {
    const result = await createBlog(data);
    const { error } = JSON.parse(result);

    if(error?.message) {
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
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }
  return (
   <BlogForm onSubmit={handleCreate} />
  )
}
