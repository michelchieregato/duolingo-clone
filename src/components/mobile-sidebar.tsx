import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Sidebar } from '@/app/(main)/learn/components/sidebar';

const MobileSidebar = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Menu className="text-white"></Menu>
                </SheetTrigger>
                <SheetContent className="p-0 z-[100] w-full" side="left">
                    <Sidebar></Sidebar>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileSidebar;
