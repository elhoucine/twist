import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react'
import React from 'react'

export default function BlogTable() {
    return (
        <div className="overflow-x-auto">
            <div className="border bg-gradient-dark rounded-md w-[900px] md:w-full">
                <div className='grid grid-cols-5 p-5 text-gray-500 border-b'>
                    <h1 className='col-span-2'>Title</h1>
                    <h1 className=''>Premium</h1>
                    <h1>Publish</h1>
                </div>
                <div className='grid grid-cols-5 p-5'>
                    <h1 className='col-span-2'>
                        Blog Title
                    </h1>
                        <Switch checked />
                        <Switch checked={false} />
                    <Actions />
                </div>
            </div>
        </div>
    )
};

const Actions = () => {
    return (
        <div className='flex items-center gap-2 flex-wrap'>
            <Button variant="outline" className='flex items-center gap-2'>
                <EyeIcon />
                View
            </Button>
            <Button variant="outline" className='flex items-center gap-2'>
                <TrashIcon />
                Delete
            </Button>
            <Button variant="outline" className='flex items-center gap-2'>
                <PencilIcon />
                Edit
            </Button>
        </div>
    )
}