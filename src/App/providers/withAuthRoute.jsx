import {Navigate} from "react-router-dom";
import lstore from "store";


export const withAuthRoute = (Component) => {
    return (props) => {
        if (!lstore.get("user"))
            return <Navigate to="/"/>;

        return <Component {...props}/>;
    };
};