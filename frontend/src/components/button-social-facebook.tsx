import {Button} from "@/components/ui/button.tsx";

type buttonSocialFacebookProps = {
    text?: string
}
const ButtonSocialFacebook: React.FC<buttonSocialFacebookProps> = ({text = "Iniciar con sesión con Facebook"}) => {
    return (
        <Button className="bg-[#1877F2] hover:bg-[#166fe5] text-white flex-1">
            {text}
        </Button>
    );
};

export default ButtonSocialFacebook;