import {useAuthStore} from "@/store/useAuthStore.ts";
import {Navigate} from "react-router-dom";
import {ReactNode} from "react";

type protectedRouteProps = {
    children: ReactNode
}
const ProtectedRoute: React.FC<protectedRouteProps> = ({children}) => {

    const auth = useAuthStore((state) => state.auth)
    if (!auth) {
        return <Navigate to="/" replace/>
    }
    return children
};

export default ProtectedRoute;