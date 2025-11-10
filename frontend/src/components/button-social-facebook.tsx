import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {API} from "@/config/app.ts";

type buttonSocialFacebookProps = {
    text?: string
}
const ButtonSocialFacebook: React.FC<buttonSocialFacebookProps> = ({text = "Iniciar con sesión con Facebook"}) => {
    return (
        <Button className="bg-[#1877F2] hover:bg-[#166fe5] text-white flex-1" asChild>
            <Link to={`${API.URL}/auth/login/facebook`}>
                {text}
            </Link>
        </Button>
    );
};

export default ButtonSocialFacebook;