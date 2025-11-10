import {useAuthStore} from "@/store/useAuthStore.ts";
import {Navigate} from "react-router-dom";
import {ReactNode} from "react";

type publicRouteProps = {
    children: ReactNode
}
const PublicRoute: React.FC<publicRouteProps> = ({children}) => {

    const auth = useAuthStore((state) => state.auth)

    if (auth) {
        return <Navigate to="/news" replace/>
    }
    return children
};

export default PublicRoute;