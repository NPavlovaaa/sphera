import ClientAccount from "../clientAccount/ClientAccount";
import { useSelector } from "react-redux";


const AccountPage  = () => {
    const activeClient = useSelector(state => state.authUser.client);

    return (
        activeClient ?
            <ClientAccount/>
        :
        <p>Страница не найдена</p>
    )
}
export default AccountPage;
