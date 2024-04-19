import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
    className?: string;
}

export const Sidebar = ({ className }: Props) => {
    const buttons = [
        { imgSrc: '/learn.svg', name: 'Aprender' },
        { imgSrc: '/learn.svg', name: 'Aprender' },
        { imgSrc: '/learn.svg', name: 'Aprender' },
        { imgSrc: '/learn.svg', name: 'Aprender' },
    ];

    const buttonsDivs = buttons.map(({ imgSrc, name }) => {
        return (
            <Button key={name} variant="sidebarOutline" className="flex gap-4">
                <Image src={imgSrc} alt={name} width={32} height={32}></Image>
                {name}
            </Button>
        )
    });

    return (
        <div className={cn("lg:w-[256px] h-full p-8 flex flex-col lg:fixed left-0 top-0 border-r-2", className)}>
            <div className="pb-[30px]">
                <Image src="duo2.svg" alt="Duoling" width={128} height={40}></Image>
            </div>
            <div className="flex flex-col gap-4">
                { buttonsDivs }
            </div>
        </div>
    )
};
