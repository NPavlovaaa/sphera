import ClientAccount from "../clientAccount/ClientAccount";
import { useSelector } from "react-redux";


const AccountPage  = () => {
    const activeUser = useSelector(state => state.authUser.user)
    const activeClient = useSelector(state => state.authUser.client);

    return (
        activeUser ?
            <ClientAccount activeUser={activeUser} activeClient={activeClient}/>
        :
        <p>Страница не найдена</p>
    )
}
export default AccountPage ;
