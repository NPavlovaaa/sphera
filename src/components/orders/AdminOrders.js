import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchAdminOrders, fetchChangeOrderStatus} from "../../api/orderSlice";
import { fetchAdminCart } from "../../api/cartSlice";
import ModalWIndow from "../modalWindow/ModalWIndow";


const AdminOrders = () => {
    const token = useSelector(state => state.authUser.token);
    const changeOrderStatus = useSelector(state => state.getOrders.changeOrderStatus);
    const activeUser = useSelector(state => state.authUser.user);
    const [orders, setOrders] = useState();
    const [cart, setCart] = useState();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(token){
            updateOrders();
            updateCarts();
        }
    }, [activeUser, token, changeOrderStatus])


    const updateOrders = () =>{
        dispatch(fetchAdminOrders(token.jwt)).then(data => {
            setOrders(data.payload)
        })
    }
    const updateCarts = () =>{
        dispatch(fetchAdminCart()).then(data => {
            setCart(data.payload)
        })
    }

    const renderStatus = (id) => {
        let typeStatus = '';
        switch(id){
            case 1:
                typeStatus = 'text-red-700 bg-red-100';
                break;
            case 5:
                typeStatus = 'text-red-700 bg-red-100';
                break;
            case 6:
                typeStatus = 'text-green-700 bg-green-100';
                break;
            case 7:
                typeStatus = 'text-gray-700 bg-gray-100';
                break;
            default:
                typeStatus = 'text-blue-700 bg-blue-100';
                break;
        }
        return typeStatus;
    }

    const sucAlert = () => {
        return(
            <div className="bg-green-100 border-t-4 rounded-b px-4 py-3 shadow-md mb-5" role="alert" >
                <div className="flex">
                    <div className="py-1">
                        <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20">
                            <path
                                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                        </svg>
                        {/*<button*/}
                        {/*    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"*/}
                        {/*    onClick={() => setAlert(false)}>*/}
                        {/*<span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">*/}
                        {/*  ×*/}
                        {/*</span>*/}
                        {/*</button>*/}
                    </div>
                    <div>
                        <p className="font-bold">Статус заказа был успешно изменен</p>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="w-full">
            {/*{sucAlert()}*/}
            <h1 className="text-3xl font-bold">Заказы</h1>
            {orders ? orders.map((item) => {
                let total_product_count = 0;
                let total_weight = 0;
                return(
                    <div key={item.order.order_id}>
                        <div className="flex flex-col bg-lightGray pt-6 w-full rounded-xl mt-6 shadow-md" key={item.order.order_id}>
                            <div className="flex justify-between pr-10">
                                <p className="text-lg font-semibold ml-10">Заказ от {item.order_date}</p>
                                <div className="flex items-center">
                                    <p className="text-base">Оплачено</p>
                                    <p className="text-xl font-semibold ml-2">{item.order.order_sum} Р</p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full justify-between bg-mainWhite px-10 py-5 mt-5 rounded-xl">
                                <div className="flex">
                                    <div className="flex flex-col w-5/12">
                                        <div className="flex flex-row w-full rounded-xl">
                                            <p className="mr-5 font-semibold">Доставка в постамат</p>
                                            <div className={`${renderStatus(item.status.status_id)} text-xs flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-lg`}>
                                                {item.status.status_name}
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <p className="flex text-mainGray mt-5 mr-2 text-sm">Номер заказа:</p>
                                            <p className="flex mt-5">{item.order.order_id}</p>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <p className="flex text-mainGray mt-5 mr-2 text-sm">Ожидаемая дата:</p>
                                            <p className="flex mt-5">{item.delivery_date}</p>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <p className="flex text-mainGray mt-5 mr-2 text-sm">Получатель:</p>
                                            <p className="flex mt-5">{item.client.first_name} {item.client.last_name} {item.client.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-7/12">
                                        <p className="flex font-semibold">Состав заказа</p>
                                        <div className="grid grid-cols-8 mt-1 text-sm ">
                                            <p className="flex col-span-2">Название</p>
                                            <p className="flex col-span-2 justify-center">Обжарка</p>
                                            <p className="flex col-span-2 justify-center">Обработка</p>
                                            <p className="flex justify-center">Вес</p>
                                            <p className="flex justify-center">Кол-во</p>
                                        </div>
                                        <span className="flex border-b-2 border-mainOrange-600"></span>
                                        {cart ? cart.map(({order, product, roasting, processing, weight, cart_id, count}) => {
                                            if(item.order.order_id === order){
                                                total_product_count += count
                                                total_weight += weight
                                                return (
                                                    <div className="grid grid-cols-8 mt-2 text-sm" key={cart_id}>
                                                        <p className="flex col-span-2">{product.product_name}</p>
                                                        <p className="flex col-span-2 justify-center">{roasting}</p>
                                                        <p className="flex col-span-2 justify-center">{processing}</p>
                                                        <p className="flex justify-center">{weight}г</p>
                                                        <p className="flex justify-center">{count}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                        : null}
                                        <span className="flex border-b-2 border-lightGray mt-2"></span>
                                        <div className="grid grid-cols-8 mt-1 text-sm mt-3">
                                            <p className="flex col-span-6">Итого</p>
                                            <p className="flex justify-center">{total_weight / 1000} кг</p>
                                            <p className="flex justify-center">{total_product_count}</p>
                                        </div>
                                    </div>
                                </div>
                                <ModalWIndow order={item.order} />
                            </div>
                        </div>
                    </div>
                )
            })
            : null}
        </div>
    )
}
export default AdminOrders;