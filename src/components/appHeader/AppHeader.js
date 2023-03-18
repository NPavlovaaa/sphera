import {Link, NavLink} from "react-router-dom";
import Logo from "../icons/Logo";
import Telegram from "../icons/Telegram";
import Instagram from "../icons/Instagram";


const AppHeader = ({activeClient, logout}) => {
    return (
        <header className="z-50 header sticky top-0 bg-bgMainWhite shadow-md flex items-center justify-between px-8">
            <div className="p-2.5 w-fit">
                <Link to="/">
                    <Logo/>
                    <p className="text-xs mt-1">Интернет-магазин кофе</p>
                </Link>
            </div>
            <nav className="nav font-normal text-xs xl:text-xs lg:text-xs 2xl:text-sm w-2/3 text-center">
                <ul className="flex justify-around items-center">
                    <li className="p-2 border-b-2 border-bgMainOrange-600 border-opacity-0 hover:border-opacity-100 cursor-pointer">
                        <NavLink to="/catalog" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>Каталог товаров</NavLink>
                    </li>
                    <li className="w-2/5">
                        <label htmlFor="default-search"
                               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                   className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Поиск.." required/>
                            <button type="submit"
                                    className="text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Найти
                            </button>
                        </div>
                    </li>
                    <li className="px-2 border-b-2 border-bgMainOrange-600 border-opacity-0 hover:border-opacity-100 cursor-pointer">
                        <NavLink to="/about" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>О нас</NavLink>
                    </li>
                    <li className="px-2 border-b-2 border-bgMainOrange-600 border-opacity-0 hover:border-opacity-100 cursor-pointer">
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
                    <div className="w-fit flex justify-end font-medium text-base xl:text-base lg:text-md 2xl:text-md sm:text-sm">
                        <NavLink to="/account" className="p-2 cursor-pointer" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>
                            {/*{activeClient.first_name}*/}
                            Наталья
                        </NavLink>
                        <button type="submit" onClick={logout}>Выйти</button>
                    </div>
                :   <div className="w-fit flex justify-between font-medium text-xs xl:text-xs lg:text-xs 2xl:text-sm sm:text-sm">
                        <NavLink to="/login" className="p-2 cursor-pointer" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>
                            Вход | Регистрация
                        </NavLink>
                    </div>
            }
        </header>
    )
}
export default AppHeader;