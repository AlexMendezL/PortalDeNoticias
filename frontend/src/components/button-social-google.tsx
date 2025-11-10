import {Button} from "@/components/ui/button.tsx";

type buttonSocialGoogleProps = {
    text?: string
}
const ButtonSocialGoogle: React.FC<buttonSocialGoogleProps> = ({text = "Iniciar con sesión con Google"}) => {
    return (
        <Button variant="outline" className="border-gray-300 hover:bg-gray-100 flex-1">
            {text}
        </Button>
    );
};

export default ButtonSocialGoogle;