import React, { ReactNode } from 'react';
import Footer from '@/components/Footer';

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <Footer />
        </>
    )
}
