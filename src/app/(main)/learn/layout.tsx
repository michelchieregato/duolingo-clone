import React from 'react';
import { Sidebar } from '@/app/(main)/learn/components/sidebar';
import MobileHeader from '@/app/(main)/learn/components/mobile-header';

interface Props {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <MobileHeader/>
            <Sidebar className="hidden lg:flex"></Sidebar>
            <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
                <div className="h-full">
                     {children }
                </div>
            </main>
        </>
    )
};

export default MainLayout;
