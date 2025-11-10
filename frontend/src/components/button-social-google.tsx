import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {API} from "@/config/app.ts";

type buttonSocialGoogleProps = {
    text?: string
}
const ButtonSocialGoogle: React.FC<buttonSocialGoogleProps> = ({text = "Iniciar con sesión con Google"}) => {
    return (
        <Button variant="outline" className="border-gray-300 hover:bg-gray-100 flex-1" asChild>
            <Link to={`${API.URL}/auth/login/google`}>
                {text}
            </Link>
        </Button>
    );
};

export default ButtonSocialGoogle;