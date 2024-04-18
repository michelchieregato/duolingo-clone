import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="max-w-[980px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center
                        p-4 gap-2">
            <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
                <Image src="/hero.svg" alt="Hero" fill></Image>
            </div>
            <div className="flex flex-col items-center gap-y-8">
                <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
                    O jeito grátis, divertido e eficaz de aprender um idioma!
                </h1>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <Button variant="secondary" size="lg" className="lg:w-[330px]" asChild>
                            <Link href="/learn">
                                Continuar aprendizado
                            </Link>
                        </Button>
                    </SignedIn>
                    <SignedOut>
                        <div className="flex flex-col gap-2">
                            <SignUpButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                                <Button variant="secondary" size="lg" className="lg:w-[330px]">
                                    Comece agora
                                </Button>
                            </SignUpButton>
                            <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                                <Button variant="primaryOutline" size="lg" className="lg:w-[330px]">
                                    Já tenho uma conta
                                </Button>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </div>
    )
}
