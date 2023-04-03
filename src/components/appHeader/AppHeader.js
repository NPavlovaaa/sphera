import {Link, NavLink} from "react-router-dom";
import Logo from "../icons/Logo";
import Telegram from "../icons/Telegram";
import Instagram from "../icons/Instagram";
import Avatar from "../icons/Avatar";
import cart from "../../assets/cart.png";
import favorite from "../../assets/favorite.png"

const AppHeader = ({activeClient, logout}) => {

    return (
        <header className="z-50 header bg-mainWhite sticky top-0 shadow-sm flex items-center justify-between px-14">
            <div className="p-2.5 w-fit">
                <Link to="/">
                    <Logo/>
                    <p className="text-xs mt-1">Интернет-магазин кофе</p>
                </Link>
            </div>
            <nav className="nav font-normal text-xs xl:text-xs lg:text-xs 2xl:text-sm w-2/3 text-center">
                <ul className="flex justify-between items-center">
                    <li className="p-2 border-b-3 hover:text-mainOrange-600 cursor-pointer flex flex-row">
                        <NavLink to="/products" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>Каталог товаров</NavLink>
                    </li>
                    <li className="w-2/5">
                        <div className="relative flex items-center">
                            <input className="block p-1.5 pl-4 w-full text-sm rounded-xl border" placeholder="Поиск..."/>
                            <button className="flex absolute right-3 items-center pl-3 cursor-pointer">
                                <svg className="w-5 h-5" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </li>
                    <li className="px-2 hover:text-mainOrange-600 cursor-pointer">
                        <NavLink to="/about" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>О нас</NavLink>
                    </li>
                    <li className="px-2 hover:text-mainOrange-600 cursor-pointer">
                        <NavLink to="/reviews" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>Отзывы</NavLink>
                    </li>
                    <li className="px-2 cursor-pointer flex flex-col justify-between items-center">
                        <div className="flex flex-row">
                            <div className="mr-2">
                                <Telegram/>
                            </div>
                            <div>
                                <Instagram/>
                            </div>
                        </div>
                        <p className="mt-1">+7 (995) 60 495 77</p>
                    </li>
                </ul>
            </nav>
            {activeClient != null ?
                    <div className="w-fit flex items-center justify-between font-medium text-xs xl:text-sm lg:text-sm 2xl:text-sm sm:text-sm">
                        <NavLink to="/account" className="hover:text-mainOrange-600 p-2 cursor-pointer flex flex-row items-center" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>
                            {/*{activeClient.first_name}*/}
                            <Avatar/>
                            <div className="flex flex-col">
                                <p>Наталья</p>
                                <p className="text-xs text-mainGray">Новичок</p>
                            </div>
                        </NavLink>
                        <NavLink to="/favorite" className="ml-1.5">
                            <img src={favorite} width="20px"/>
                        </NavLink>
                        <NavLink to="/cart" className="ml-1.5">
                            <img src={cart} width="32px"/>
                        </NavLink>
                        <button type="submit" className="ml-1.5 hover:text-mainOrange-600" onClick={logout}>Выйти</button>
                    </div>
                :   <div className="w-fit flex hover:text-mainOrange-600 justify-between font-medium text-xs xl:text-xs lg:text-xs 2xl:text-sm sm:text-sm">
                        <NavLink to="/login" className="p-2 cursor-pointer" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>
                            Вход | Регистрация
                        </NavLink>
                    </div>
            }
        </header>
    )
}
export default AppHeader;