import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SidebarItem } from '@/app/(main)/learn/components/sidebar-item';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

type Props = {
    className?: string;
}

export const Sidebar = ({ className }: Props) => {
    const buttons = [
        { imgSrc: '/learn.svg', name: 'Aprender', href: '/learn' },
        { imgSrc: '/leaderboard.svg', name: 'Placar', href: '/leaderboard' },
        { imgSrc: '/quests.svg', name: 'Missões', href: '/quests' },
        { imgSrc: '/shop.svg', name: 'Lojinha', href: '/shop' },
    ];

    const buttonsDivs = buttons.map(({ imgSrc, name, href }) => {
        return (
            <SidebarItem key={name} imgSrc={imgSrc} name={name} href={href}></SidebarItem>
        )
    });

    return (
        <div className={cn("lg:w-[256px] h-full p-4 flex flex-col lg:fixed left-0 top-0 border-r-2", className)}>
            <div className="pb-[30px]">
                <Link href="/learn">
                    <Image src="duo2.svg" alt="Duoling" width={128} height={40} className="pt-2 pl-2"></Image>
                </Link>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                { buttonsDivs }
            </div>
            <div className="p-4">
            <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin"></Loader>
            </ClerkLoading>
            <ClerkLoaded>
                <UserButton afterSignOutUrl="/"></UserButton>
            </ClerkLoaded>
            </div>
        </div>
    )
};
