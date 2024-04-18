import React from 'react';
import { Header } from '@/app/(marketing)/components/header';
import FooterComponent from '@/app/(marketing)/components/footer';

interface Props {
    children: React.ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex flex-1 flex-col justify-center items-center">
                {children}
            </main>
            <FooterComponent/>
        </div>
    )
};

export default MarketingLayout;
