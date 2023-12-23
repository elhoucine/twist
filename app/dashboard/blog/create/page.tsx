"use client";
import React from 'react'
import { toast } from "@/components/ui/use-toast"
import BlogForm from '../../components/BlogForm'
import { BlogFormSchematype } from '../../schema';

export default function page() {

  const handleCreate = (data: BlogFormSchematype) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
   <BlogForm onSubmit={handleCreate} />
  )
}
