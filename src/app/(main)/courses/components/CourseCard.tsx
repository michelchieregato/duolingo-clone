'use client';

import { Courses } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from "next/image";

type Props = {
    course: Courses,
    isActive: boolean,
    isDisabled: boolean,
    onClick: (id: number) => void,
}

export const CourseCard = ({ course, isDisabled, isActive, onClick }: Props) => {
    return (
        <div onClick={() => onClick(course.id)}
             className={
                 cn('h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 ' +
                     'flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] max-w-[200px]',
                     isDisabled ? 'pointer-events-none opacity-50' : '')
             }
        >
            <div className="min-[24-px] w-full flex items-center justify-end">
                {isActive && (
                    <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
                        <Check className="text-white stroke-[4] h-4 w-4"></Check>
                    </div>
                )}
            </div>
            <Image src={course.imgSrc} alt={course.title} height={70} width={93}
                   className="rounded-lg drop-shadow-md object-cover"/>
            <p className="text-neutral-700 text-center mt-3">
                { course.title }
            </p>
        </div>
    )
};
