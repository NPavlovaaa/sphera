import {useEffect} from "react";
import {useDispatch} from "react-redux";
import ClientAccount from "../clientAccount/ClientAccount";

const AccountPage  = ({activeClient, activeUser, logout}) => {

    return (
        activeUser ?
            <ClientAccount activeUser={activeUser} activeClient={activeClient} logout={logout}/>
        :
        <p>Страница не найдена</p>
    )
}
export default AccountPage ;
