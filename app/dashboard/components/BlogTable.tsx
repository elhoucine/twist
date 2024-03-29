"use server";
import React from 'react'
import { Button } from '@/components/ui/button'
import { readBlogAdmin, updateBlogById } from '@/lib/ations/blog'
import { EyeIcon, PencilIcon } from 'lucide-react'
import DeleteAlert from './DeleteAlert'
import SwitchForm from './SwitchForm';
import { BlogFormSchematype } from '../schema';
import Link from 'next/link';


export default async function BlogTable() {

    const { data: blogs } = await readBlogAdmin();

    return (
        <div className="overflow-x-auto">
            <div className="border bg-gradient-dark rounded-md sm:w-[900px] md:w-full">
                <div className='grid grid-cols-5 p-5 text-gray-500 border-b'>
                    <h1 className='col-span-2'>Title</h1>
                    <h1 className=''>Premium</h1>
                    <h1>Publish</h1>
                </div>
                {blogs?.map((blog, index) => {
                    const updatePremium = updateBlogById.bind(null, blog.id, { is_premium: !blog.is_premium } as BlogFormSchematype);
                    const updatePublished = updateBlogById.bind(null, blog.id, { is_published: !blog.is_published } as BlogFormSchematype);

                    return (
                        <div key={index} className='grid grid-cols-5 p-5'>
                            <h1 className='col-span-2'>
                                {blog.title}
                            </h1>
                            <SwitchForm
                                checked={blog.is_premium}
                                name='premium'
                                onToggle={updatePremium}
                            />
                            <SwitchForm
                                checked={blog.is_published}
                                name='published'
                                onToggle={updatePublished}
                            />
                            <Actions id={blog.id} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

const Actions = ({ id }: { id: string }) => {
    return (
        <div className='flex items-center gap-2 flex-wrap md:flex-row'>
            <Link href={'/blog/' + id}>
                <Button variant="outline" className='flex items-center gap-2'>
                    <EyeIcon />
                    View
                </Button></Link>
            <DeleteAlert blogId={id} />
            <Link href={`/dashboard/blog/edit/${id}`}>
                <Button variant="outline" className='flex items-center gap-2'>
                    <PencilIcon />
                    Edit
                </Button>
            </Link>
        </div>
    )
}