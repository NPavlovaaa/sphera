/* eslint-disable jsx-a11y/anchor-is-valid */
import cup from "../../assets/cup.png"
import bobs from "../../assets/bob-coffee.png"
import gradient from "../../assets/gradient.png"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AdminOrders from "../orders/AdminOrders";


const MainPage = () => {
    const role = useSelector(state => state.authUser.role);
    const [openTab, setOpenTab] = useState();

    return (
        <div className="flex flex-row p-16">
            {role && role === 1 ?
            <>
                <div className="flex flex-row w-full">
                    <ul className="flex flex-col mr-6">
                        <li>
                            <a className={` ${openTab === 1 ? "border-b-2 border-mainOrange-600" : ""} text-lg flex cursor-pointer py-3 px-4`}
                               href="#"
                               onClick={(e) => {
                               e.preventDefault();
                               setOpenTab(1)
                            }}>
                                Заказы
                            </a>
                        </li>
                        <li>
                            <a className={` ${openTab === 2 ? "border-b-2 border-mainOrange-600" : ""} text-lg flex cursor-pointer py-3 px-3`}
                               href="#"
                               onClick={(e) => {
                               e.preventDefault();
                               setOpenTab(2)
                            }}>
                                Отзывы о товарах
                            </a>
                        </li>
                        <li>
                            <a className={` ${openTab === 3 ? "border-b-2 border-mainOrange-600" : ""} text-lg flex cursor-pointer py-3 px-3`}
                               href="#"
                               onClick={(e) => {
                               e.preventDefault();
                               setOpenTab(3)
                            }}>
                                Отзывы о доставке и магазине
                            </a>
                        </li>
                    </ul>
                    <div className="flex w-full px-14 py-3 rounded-lg h-full">
                        <div className={`${openTab === 1 ? "flex" : "hidden"} flex w-full`}>
                            <AdminOrders/>
                        </div>
                        <div className={`${openTab === 2 ? "flex" : "hidden"} flex w-full`}>
                            Отзывы о товарах
                        </div>
                        <div className={`${openTab === 3 ? "flex" : "hidden"} flex w-full`}>
                            Отзывы о доставке и магазине
                        </div>
                    </div>
                </div>
            </>
            :
            <>
                <div className="w-1/2 4xl:text-10xl 3xl:text-9xl 3xl:p-4 2xl:text-8xl xl:text-7xl lg:text-6xl px-12 font-semibold">
                    <h1>Производим <br/>кофе<br/> для бизнеса</h1>
                </div>
                <div className="ml-2 w-1/2">
                    <img className="-top-8 right-0 absolute z-10" src={gradient} alt="градиент"/>
                    <img className="mt-10 absolute z-20 w-5/12" src={bobs} alt="кофейные бобы"/>
                    <img className="-top-6 ml-5 relative z-30 w-3/4" src={cup} alt="стакан кофе"/>
                </div>
            </>
            }
        </div>

    )
}
export default MainPage;