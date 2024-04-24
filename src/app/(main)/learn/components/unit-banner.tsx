import { UnitModel } from '@/models/units';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NotebookText } from 'lucide-react';

type Props = {
    unit: UnitModel,
}

export const UnitBanner = ({ unit }: Props) => {
    return (
        <div className="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold">
                    {unit.title}
                </h3>
                <p className="text-lg">
                    { unit.description }
                </p>
            </div>
            <Link href='/lessons'>
                <Button variant="secondary" size="lg" className="hidden lg:flex border-2 border-b-4 active:border-b-2">
                    <NotebookText className="mr-2"></NotebookText>
                    Guia
                </Button>
            </Link>
        </div>
    )
}
