import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchOrders, fetchStatuses} from "../../api/orderSlice";
import { fetchAdminCart } from "../../api/cartSlice";
import ModalWindow from "../modalWindow/ModalWindow";
import {activeFilterStatusChange} from "../../api/orderSlice";


const AdminOrders = () => {
    const {changeOrderStatus, activeFilter} = useSelector(state => state.getOrders);
    const activeUser = useSelector(state => state.authUser.user);
    const statuses = useSelector(state => state.getOrders.statuses);

    const [orders, setOrders] = useState();
    const [cart, setCart] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStatuses())
    }, [])

    useEffect(()=>{
        updateOrders();
        updateCarts();
    }, [activeUser, changeOrderStatus])


    const updateOrders = () =>{
        dispatch(fetchOrders()).then(data => {
            setOrders(data.payload)
        })
    }
    const updateCarts = () =>{
        dispatch(fetchAdminCart()).then(data => {
            setCart(data.payload)
        })
    }

    const filteredOrders = useMemo(() => {
        const filteredOrders = orders? orders.slice() : null;
        if (activeFilter === 0){
            return filteredOrders;
        } else {
            return filteredOrders.filter(item => item.status.status_id === activeFilter)
        }
    }, [orders, activeFilter]);


    const renderStatus = ({id, detail}) => {
        let typeStatus;
        if((activeFilter && id === activeFilter) || detail === 'status'){
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
        }
        else {
            typeStatus = 'border-lightGray border-2';
        }

        return typeStatus;
    }

    return(
        <div className="w-full">
            <h1 className="text-3xl font-bold">Заказы</h1>
            <div className="flex flex-row mt-5 items-center">
                <p className="text-mainGray mr-5">Фильтры: </p>
                {statuses ? statuses.map(item =>{
                    return(
                        <button className={`${renderStatus({'id': item.status_id, 'detail': 'filter'})} text-sm flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-sm mr-3`}
                                type="submit"
                                onClick={() => dispatch(activeFilterStatusChange(item.status_id))}
                        >
                            {item.status_name}
                        </button>
                        )
                }) : null}
                <button className="text-sm flex justify-center h-fit py-1.5 px-4"
                        type="submit"
                        onClick={() => dispatch(activeFilterStatusChange(0))}
                >
                    Сбросить фильтр
                </button>
            </div>
            {filteredOrders ? filteredOrders.map((item) => {
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
                                            <div className={`${renderStatus({'id': item.status.status_id, 'detail': 'status'})} text-xs flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-lg`}>
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
                                            <p className="flex text-mainGray mt-5 mr-2 text-sm">Адрес:</p>
                                            <p className="flex mt-5">{item.order.address}</p>
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
                                <ModalWindow order={item.order} />
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