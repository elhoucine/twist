import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'
import React from 'react'

export default function Footer() {
    return (
        <footer className='border-t py-10'>
            <div className="max-w-7xl px-5 md:p-0 space-y-5 mx-auto justify-between md:items-end flex-col md:flow-row">
                <div className="space-y-10">
                    <div className="space-y-2 w-full sm:w96">
                        <h1 className='text-3xl font-bold'>Twist blog</h1>
                        <p>
                            Blog posts about frontend development
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <GithubIcon className='w-5 h-5' />
                        <LinkedinIcon className='w-5 h-5' />
                        <TwitterIcon className='w-5 h-5' />
                    </div>
                </div>
                <h1>
                    &copy; 2024 Twist. All right reserved.
                </h1>
            </div>

        </footer>
    )
}
