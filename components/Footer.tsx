import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className='border-t py-10'>
            <div className="max-w-7xl px-5 md:p-0 space-y-5 mx-auto justify-between md:items-end flex-col md:flow-row">
                <div className="space-y-10">
                    <div className="space-y-2 w-full sm:w96">
                        <h1 className='text-3xl font-bold'>Twist blog</h1>
                        <p>
                            I created this blog app as part of a tutorial then it become my playground to play with React/NextJs ecosystem. My initial plan was to populate it with lorem ipsum content.
                            However, I decided to add a twist: use it as dual opportunity to enhance my writing skills as well. That said PLEASE consider this blog not stable and may change or vanish any time.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href='https://github.com/elhoucine' target='_blank'>
                            <GithubIcon className='w-5 h-5' />
                        </Link>
                        <Link href='https://twitter.com/elhoucineaz' target='_blank'>
                            <TwitterIcon className='w-5 h-5' />
                        </Link>
                        <Link href='https://www.linkedin.com/in/elhoucineaz/' target='_blank'>
                            <LinkedinIcon className='w-5 h-5' />
                        </Link>
                    </div>
                </div>
                <h1>
                    &copy; 2024 Twist. All right reserved.
                </h1>
            </div>

        </footer>
    )
}
