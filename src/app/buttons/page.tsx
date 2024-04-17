import { Button } from '@/components/ui/button';

const ButtonsDisplayPage = () => {
    return (
        <div className="flex flex-col gap-4 w-56 mx-auto p-4">
            <h1>
                Botões do Projeto
            </h1>
            <Button variant="default">
                Default
            </Button>
            <Button variant="primary">
                Primary
            </Button>
            <Button variant="primaryOutline">
                Primary Outline
            </Button>
            <Button variant="secondary">
                Secondary
            </Button>
            <Button variant="secondaryOutline">
                Secondary Outline
            </Button>
            <Button variant="danger">
                Danger
            </Button>
            <Button variant="dangerOutline">
                Danger Outline
            </Button>
            <Button variant="super">
                Super
            </Button>
            <Button variant="superOutline">
                Super Outline
            </Button>
            <Button variant="ghost">
                Ghost
            </Button>
            <Button variant="sidebar">
                Sidebar
            </Button>
            <Button variant="sidebarOutline">
                Sidebar Outline
            </Button>
        </div>
    )
}

export default ButtonsDisplayPage;
