import {Link, NavLink} from "react-router-dom";
import Logo from "../icons/Logo";
import Telegram from "../icons/Telegram";
import Instagram from "../icons/Instagram";
import Avatar from "../icons/Avatar";


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
                        <NavLink to="/catalog" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>Каталог товаров</NavLink>
                    </li>
                    <li className="w-2/5">
                        <label htmlFor="default-search"
                               className="mb-2 text-sm font-medium sr-only">Search</label>
                        <div className="relative flex items-center">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                   className="block p-1.5 pl-10 w-full text-sm rounded-xl border focus:ring-mainOrange-600"
                                   placeholder="Поиск..." required/>
                            <button type="submit"
                                    className="text-xs absolute m-1 right-0.5 bg-mainOrange-600 hover:bg-mainOrange-700 focus:outline-none font-normal rounded-lg px-3 py-1">
                                Найти
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
                    <div className="w-fit flex hover:text-mainOrange-600 items-center justify-between font-medium text-xs xl:text-sm lg:text-sm 2xl:text-sm sm:text-sm">
                        <Avatar />
                        <NavLink to="/account" className="p-2 cursor-pointer" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>
                            {/*{activeClient.first_name}*/}
                            Наталья
                        </NavLink>
                        <button type="submit" onClick={logout}>Выйти</button>
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