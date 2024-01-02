import React from 'react'

export default function Loading() {
    return (
        <div className='animate-pulse space-y-5'>
            <div className="flex items-center justify-between">
                <div className="h10 w-56 bg-gradient-dark rounded-md">

                </div>
                <div className="h10 w-58 bg-gradient-dark rounded-md">

                </div>
            </div>
            <div className="border h-96 rounded-md bg-gradient-dark"></div>
        </div>
    )
}
