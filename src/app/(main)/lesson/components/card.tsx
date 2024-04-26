import { ChallengeOptions } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
    option: ChallengeOptions,
    shortcut: number,
    selected?: boolean,
    onClick: (id: number) => void,
    disabled?: boolean,
    status?: string,
    type: string,
}

export const Card = ({ option, shortcut, selected, onClick, disabled, status, type }: Props) => {
    return <div
        onClick={() => {
        }}
        className={cn(
            'h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2',
            selected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
            (selected && status === 'correct') && 'border-green-300 bg-green-100 hover:bg-green-100',
            (selected && status === 'wrong') && 'border-rose-300 bg-rose-100 hover:bg-rose-100',
            disabled && 'pointer-events-none hover:bg-white',
            type === 'ASSIST' && 'lg:p-3 w-full'
        )}
    >
        { option.imgSrc && <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
            <Image src={option.imgSrc} fill alt={option.text} />
        </div> }
        <div className={cn(
            'flex items-center justify-between',
            type === 'ASSIST' && 'flex-row-reverse'
        )}>
            {type === 'ASSIST' && <div></div>}
            <p className={cn(
                'text-neutral-600 text-sm lg:text-base font-bold',
                selected && 'text-sky-500',
                selected && status === 'correct' && 'text-green-500',
                selected && status === 'wrong' && 'text-rose-500',
            )}>
                {option.text}
            </p>
            <div className={cn(
                'lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 items-center flex justify-center rounded-xl text-neutral-400 lg:text-[15px] text-xs font-semibold',
                selected && 'border-sky-300 text-sky-500',
                selected && status === 'correct' && 'border-green-500 text-green-500',
                selected && status === 'wrong' && 'border-rose-500 text-rose-500',
            )}>
                {shortcut}
            </div>
        </div>
    </div>
}
