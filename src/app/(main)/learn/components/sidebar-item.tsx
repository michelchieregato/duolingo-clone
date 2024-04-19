'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    imgSrc: string,
    name: string,
    href: string
}

export const SidebarItem = ({ name, imgSrc, href }: Props) => {
    const pathName = usePathname();
    const active = pathName == href;

    return (
        <Button key={name} variant={active ? 'sidebarOutline': 'sidebar'}
                className="flex gap-4 justify-start h-[52px]" asChild>
            <Link href={href}>
                <Image src={imgSrc} alt={name} width={32} height={32}></Image>
                {name}
            </Link>
        </Button>
    );

}
