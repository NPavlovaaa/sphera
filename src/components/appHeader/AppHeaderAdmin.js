import {Link, NavLink} from "react-router-dom";
import Logo from "../icons/Logo";
import Avatar from "../icons/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {activeUserChange} from "../../api/userSlice";


const AppHeaderAdmin = () => {
    const activeUser = useSelector(state => state.authUser.user);
    const dispatch = useDispatch();

    const logout = async () => {
        localStorage.removeItem('TOKEN_AUTH');
        dispatch(activeUserChange(null))
    }

    return (
        <header className="z-50 header bg-mainWhite sticky top-0 shadow-sm flex items-center justify-between px-14">
            <div className="py-2.5 w-fit px-5">
                <Link to="/">
                    <Logo width="162"/>
                    <p className="text-xs mt-1">Интернет-магазин кофе</p>
                </Link>
            </div>
            {activeUser != null ?
                <div className="w-fit flex flex-col">
                    <NavLink to="/account" className="hover:text-mainOrange-600 py-2 cursor-pointer flex flex-row items-center justify-end" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>
                        <div className="flex flex-col mr-3">
                            <p className="flex justify-end xl:text-md lg:text-sm 2xl:text-md sm:text-sm">{activeUser.first_name}</p>
                            <Link to="/" className="flex justify-end">
                                <button type="submit" className="text-sm text-mainGray" onClick={logout}>Выйти</button>
                            </Link>
                        </div>
                        {activeUser.avatar ?
                            <div className="h-12 w-12">
                                <img src={activeUser.avatar} className="rounded-md avatar" alt="фотография пользователя"/>
                            </div>
                        :
                            <Avatar/>
                        }
                    </NavLink>
                </div>
            :   <div className="w-fit flex justify-betweent font-medium text-xs xl:text-xs lg:text-xs 2xl:text-sm sm:text-sm px-3">
                    <button type="submit" className="bg-mainOrange-600 shadow-lg rounded-2xl px-10 py-3 hover:bg-mainOrange-700">
                        <NavLink to="/login" className="p-2 cursor-pointer">
                            Войти
                        </NavLink>
                    </button>
                </div>
            }
        </header>
    )
}
export default AppHeaderAdmin;