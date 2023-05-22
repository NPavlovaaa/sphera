import cup from "../../assets/cup.png"
import bobs from "../../assets/bob-coffee.png"
import gradient from "../../assets/gradient.png"
import { useSelector } from "react-redux";
import { useState } from "react";
import AdminOrders from "../orders/adminOrders/AdminOrders";
import { Helmet } from "react-helmet";
import OrdersReviewPage from "./OrdersReviewPage";

const MainPage = () => {
    const role = useSelector(state => state.authUser.role);
    const [openTab, setOpenTab] = useState(null);

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content='Интернет-магазин кофе "Сфера"'
                />
                <title>Интернет-магазин кофе "Сфера"</title>
            </Helmet>
            <div className="flex flex-row py-16 pl-16 pr-5">
                {role && role === 1 ?
                    <>
                        <div className="flex flex-row w-full">
                            <ul className="flex flex-col">
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
                            <div className="flex w-full px-10 py-3 rounded-lg h-full">
                                <div className={`${openTab === 1 ? "flex" : "hidden"} flex w-full`}>
                                    <AdminOrders/>
                                </div>
                                <div className={`${openTab === 2 ? "flex" : "hidden"} flex w-full`}>

                                </div>
                                <div className={`${openTab === 3 ? "flex" : "hidden"} flex w-full`}>
                                    <OrdersReviewPage/>
                                </div>
                                <div className={`${openTab === null ? "flex" : "hidden"} flex w-full`}>
                                    <div className="w-1/2 4xl:text-10xl 3xl:text-9xl 3xl:p-4 2xl:text-6xl xl:text-6xl lg:text-6xl px-12 font-semibold">
                                        <h1 className="mb-3">Личный</h1>
                                        <h1 className="mb-3">кабинет</h1>
                                        <h1>администратора</h1>
                                    </div>
                                    <div className="ml-2 w-1/2">
                                        <img className="-top-8 right-0 absolute z-10" src={gradient} alt="градиент"/>
                                        <img className="mt-10 absolute z-20 w-5/12" src={bobs} alt="кофейные бобы"/>
                                        <img className="-top-6 ml-5 relative z-30 w-3/4" src={cup} alt="стакан кофе"/>
                                    </div>
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
        </>

    )
}
export default MainPage;