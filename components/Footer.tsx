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
                            I began developing this blog application as part of a tutorial then it became my playground to explore and understand React/NextJs,
                            along with various other tools. Initially, the plan was to populate it with placeholder lorem ipsum content for testing purposes.
                            However, I decided to add a twist: rather than filling it with mundane text,
                            I&apos;m using this platform as a dual opportunity to enhance my writing skills as well.
                            <br></br>
                            That said PLEASE consider both the app and its content (as helpful as it could be) not stable and may change or vanish any time.
                            <br></br>
                            If you like anything feel free to copy it somewhere safe 👨‍💻🚀
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
