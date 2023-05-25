import AvatarDetail from "../icons/AvatarDetail";
import Phone from "../icons/Phone";
import Mail from "../icons/Mail";
import Calendar from "../icons/Calendar";
import {Link} from "react-router-dom";
import Pen from "../icons/Pen";
import {useDispatch, useSelector} from "react-redux";
import {activeUserChange} from "../../api/userSlice";

const ClientInfo = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const activeUser = useSelector(state => state.authUser.user);

    const dispatch = useDispatch();

    const logout = async () => {
        localStorage.removeItem('TOKEN_AUTH');
        dispatch(activeUserChange(null))
    }

    return(
        <>
            <div className="flex flex-col w-1/2 pb-5">
                <div className="flex flex-row items-center mb-5">
                    {activeUser.avatar ?
                        <div className="h-16 w-16">
                            <img src={activeUser.avatar} className="rounded-xl avatar" alt="фотография пользователя"/>
                        </div>
                        :
                        <AvatarDetail/>
                    }
                    <p className="text-xl ml-2 font-semibold">{activeClient.first_name} {activeClient.last_name}</p>
                </div>
                <div className="flex flex-row items-center">
                    <Phone/>
                    <p className="ml-3">{activeClient.phone}</p>
                </div>
                <div className="flex flex-row items-center mt-3">
                    <Mail/>
                    <p className="ml-3">{activeUser.username}</p>
                </div>
                <div className="flex flex-row items-center mt-3">
                    <Calendar/>
                    <p className="ml-3">{activeClient.birthday}</p>
                </div>
                <div className="flex mt-3">
                    <Link to="/">
                        <button type="submit" className="text-mainGray hover:text-mainOrange-600" onClick={logout}>Выйти</button>
                    </Link>
                </div>
            </div>
            <div className="flex items-start w-1/2 justify-end">
                <button type="submit" className="flex flex-row items-center bg-mainOrange-600 shadow-lg rounded-2xl px-5 py-1.5">
                    Редактировать
                    <div className="ml-2">
                        <Pen/>
                    </div>
                </button>
            </div>
        </>
    )

}
export default ClientInfo;