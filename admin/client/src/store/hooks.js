import { useContext } from "react";
import Context from "./Context";

export const useStore = ()  => {
    const [state,dispatch] = useContext(Context);
    
    return [state,dispatch]
}

export const useAuth = () => {
    const [authState,authDispatch] = useContext(Context);
    
    return [authState,authDispatch]
}