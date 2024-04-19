import Image from "next/image";
import { Button } from '@/components/ui/button';

const FooterComponent = () => {
    const supportedLanguages = [
        { imgSrc: '/en.svg', name: 'Inglês' },
        { imgSrc: '/es.svg', name: 'Espanhol' },
        { imgSrc: '/it.svg', name: 'Italiano' },
        { imgSrc: '/jp.svg', name: 'Japonês' },
    ];

    const languageDivs = supportedLanguages.map(({ imgSrc, name }) => {
        return (
            <Button variant="ghost" className="flex flex-row gap-2" key={name}>
                <Image src={imgSrc} height={32} width={40} alt={name}/>
                { name }
            </Button>
        )
    });

    return (
        <div>
            <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
                <div className="lg:max-w-screen-lg mx-auto flex items-start h-full gap-4">
                    { languageDivs }
                </div>
            </footer>
        </div>
    )
}

export default FooterComponent;
