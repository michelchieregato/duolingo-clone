import { ChallengeModel } from '@/models/lesson';
import { ChallengeOptions } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Card } from '@/app/(main)/lesson/components/card';

type Props = {
    challenge: ChallengeModel,
    onSelect: (option: ChallengeOptions) => void,
    status: "correct" | "wrong" | "completed" | "",
    selectedOption?: ChallengeOptions,
    disabled?: boolean,
}

export const Challenge = ({ challenge, onSelect, status, selectedOption, disabled }: Props) => {
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
                    selected={selectedOption?.id === option.id}
                    onClick={() => onSelect(option)}
                    type={challenge.type}
                    disabled={disabled}
                    status={status}
                ></Card>
            })}
        </div>
    )
}
