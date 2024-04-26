'use client';

import { useExitModal } from '@/store/use-exit-modal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/sad_mascot.svg" height={80} width={80} alt="Mascot"></Image>
                    </div>
                    <DialogTitle className="text-center text-2xl font-bold">
                        Espera! Você vai perder seu progresso se sair agora!
                    </DialogTitle>
                    <DialogFooter className="mb-4 pt-4 w-full">
                        <div className="flex flex-col items-center mx-auto gap-2 w-full">
                            <Button className="w-full" variant="primary" size="lg" onClick={close}>
                                Aprenda Mais!
                            </Button>
                            <Link href="/learn" onClick={close}>
                                <Button className="w-full" variant="dangerOutline" size="lg">
                                    Sair da licao
                                </Button>
                            </Link>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}
