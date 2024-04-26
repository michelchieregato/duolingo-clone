import { ChallengeModel } from '@/models/lesson';
import { ChallengeOptions } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Card } from '@/app/(main)/lesson/components/card';

type Props = {
    challenge: ChallengeModel,
    onSelect: (id: number) => void,
    status: "correct" | "wrong",
    selectedOption?: number,
    disabled?: boolean,
}

export const Challenge = ({ challenge, onSelect, status, selectedOption, disabled }: Props) => {
    console.log(challenge.options);
    return (
        <div className={cn(
            'grid gap-2',
            challenge.type === 'ASSIST' && 'grid-cols-1',
            challenge.type === 'SELECT' && 'grid-cols-2 lg:grid-cols-[repeat(auto-fit,min-max(0,1fr))]'
            )}>
            {challenge.options.map((option, index) => {
                return <Card
                    key={option.id}
                    option={option}
                    shortcut={index + 1}
                    selected={selectedOption === option.id}
                    onClick={() => onSelect(option.id)}
                    type={challenge.type}
                    disabled={disabled}
                    status={status}
                ></Card>
            })}
        </div>
    )
}
