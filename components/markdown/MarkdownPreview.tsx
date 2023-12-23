import { cn } from '@/lib/utils';
import React from 'react'
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { PiTerminalThin } from "react-icons/pi";

import "highlight.js/styles/atom-one-dark.min.css";
import CopyButton from './CopyButton';
import { icons } from '@/lib/icons';

export default function MarkdownPreview({ content, className }: { content: string, className?: string }) {
    return (
        <Markdown
            rehypePlugins={[
                rehypeHighlight
            ]}
            className={cn(" space-y-6", className)}
            components={{
                h1: ({ node, ...props }) => <h1 {...props} className=" text-3xl font-bold"></h1>,
                h2: ({ node, ...props }) => <h1 {...props} className=" text-2xl font-bold"></h1>,
                h3: ({ node, ...props }) => <h1 {...props} className=" text-xl font-bold"></h1>,
                code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const id = (Math.floor(Math.random() * 1000) + 1).toString();
                    if (match?.length) {
                        let Icon = PiTerminalThin;
                        const isMatch = icons.hasOwnProperty(match[1]);
                        return <div className='bg-gradient-dark text-gray-300 border rounded-md'>
                            <div className="px-5 py-2 border-b flex items-center justify-between">
                                <div className="flex items-center">
                                    <Icon />
                                    <span>{
                                        // @ts-ignore
                                        node?.data?.meta
                                    }</span>
                                </div>
                                <CopyButton id={id} />
                            </div>
                            <div className="overflow-x-auto">
                                <div className="p-5" id={id}>{children}</div>
                            </div>
                        </div>
                    } else {
                        return <code className='bg-red-700 rounded-md px-2'>{children}</code>
                    }
                }
            }}>
            {content}
        </Markdown>
    )
}
