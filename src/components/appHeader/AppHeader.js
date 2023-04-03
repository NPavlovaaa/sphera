import {Link, NavLink} from "react-router-dom";
import Logo from "../icons/Logo";
import Telegram from "../icons/Telegram";
import Instagram from "../icons/Instagram";
import Avatar from "../icons/Avatar";
import Favorite from "../icons/Favorite"
import Cart from "../icons/Cart"
import Package from "../icons/Package"

const AppHeader = ({activeClient, logout}) => {

    return (
        <header className="z-50 header bg-mainWhite sticky top-0 shadow-sm flex items-center justify-between px-14">
            <div className="py-2.5 w-fit px-5">
                <Link to="/">
                    <Logo/>
                    <p className="text-xs mt-1">Интернет-магазин кофе</p>
                </Link>
            </div>
            <nav className="nav flex flex-col font-normal xl:text-md lg:text-sm 2xl:text-md 3xl:text-md w-2/3 px-3 text-center">
                <div className="w-full flex justify-between pt-4">
                    <div className="relative flex items-center w-2/3">
                        <input className="block p-1.5 pl-4 w-full text-sm rounded-xl border" placeholder="Поиск..."/>
                        <button className="flex absolute right-3 items-center pl-3 cursor-pointer">
                            <svg className="w-4 h-4" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="mr-3">+7 (995) 60 495 77</p>
                        <div className="flex flex-row cursor-pointer ">
                            <div className="mr-2">
                                <Telegram/>
                            </div>
                            <div>
                                <Instagram/>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="flex justify-between items-center py-1.5">
                    <li className="p-2 border-b-3 hover:text-mainOrange-600 cursor-pointer flex flex-row">
                        <NavLink to="/products" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>Каталог товаров</NavLink>
                    </li>
                    <li className="px-2 hover:text-mainOrange-600 cursor-pointer">
                        <NavLink to="/about" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>О нас</NavLink>
                    </li>
                    <li className="px-2 hover:text-mainOrange-600 cursor-pointer">
                        <NavLink to="/reviews" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>Отзывы</NavLink>
                    </li>
                    <li className="px-2 hover:text-mainOrange-600 cursor-pointer">
                        <NavLink to="/delivery" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>Доставка</NavLink>
                    </li>
                    <li className="px-2 hover:text-mainOrange-600 cursor-pointer">
                        <NavLink to="/sale" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>Акции</NavLink>
                    </li>
                </ul>
            </nav>
            {activeClient != null ?
                <div className="w-fit flex flex-col">
                    <NavLink to="/account" className="hover:text-mainOrange-600 py-2 cursor-pointer flex flex-row items-center justify-end" style={({isActive}) => ({color: isActive ? '#FFA82E' : 'inherit'})}>
                        {/*{activeClient.first_name}*/}
                        <div className="flex flex-col mr-3">
                            <p className="flex justify-end xl:text-md lg:text-sm 2xl:text-md sm:text-sm">Наталья</p>
                            <p className="flex justify-end text-xs text-mainGray">Новичок</p>
                        </div>
                        <Avatar/>
                    </NavLink>
                    <div className="flex justify-between items-center text-xs text-mainGray pb-1.5">
                        <NavLink to="/favorite" className="flex flex-col items-center">
                            <Package/>
                            <p>Заказы</p>
                        </NavLink>
                        <NavLink to="/favorite" className="flex flex-col items-center ml-5">
                            <Favorite/>
                            <p>Избранное</p>
                        </NavLink>
                        <NavLink to="/cart" className="flex flex-col items-center ml-5">
                            <Cart/>
                            <p>Корзина</p>
                        </NavLink>
                    </div>
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
export default AppHeader;