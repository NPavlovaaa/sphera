import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchOrders} from "../orderSlice";
import {fetchCartInOrders} from "../../clientCart/cartSlice";
import Spinner from "../../spinner/Spinner";
import {Link} from "react-router-dom";

const ClientOrders = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const ordersLoadingStatus = useSelector(state => state.getOrders.ordersLoadingStatus);
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState([])

    const dispatch = useDispatch();

    useEffect(()=>{
        if(activeClient){
            updateOrders();
        }
    }, [activeClient])

    const updateOrders = () =>{
        dispatch(fetchOrders()).then(data => {
            setOrders(data.payload)
        })
        dispatch(fetchCartInOrders()).then(data => {
            setCart(data.payload)
        })
    }
    const renderStatus = (id) => {
        let typeStatus;
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
                typeStatus = 'text-gray-700 bg-green-gray';
                break;
            default:
                typeStatus = 'text-blue-700 bg-blue-100';
                break;
        }
        return typeStatus;
    }

    return(
        <div className="w-full px-28 py-10">
            <h1 className="text-3xl font-bold">Заказы</h1>
            {ordersLoadingStatus === 'loading' ? <Spinner/> : null}
            {orders.map((item) => {
                return(
                    <div className="flex flex-col bg-lightGray pt-6 w-full rounded-xl mt-6 shadow-md" key={item.order.order_id}>
                        <div className="flex justify-between pr-10">
                            <p className="text-lg font-semibold ml-10">Заказ №{item.order.order_id}  от {item.order_date}</p>
                            <div className="flex items-center">
                                <p className="text-base">Оплачено</p>
                                <p className="text-xl font-semibold ml-2">{item.order.order_sum} Р</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-between bg-mainWhite px-10 py-5 mt-5 rounded-xl">
                            <div className="flex flex-col">
                                <div className="flex flex-row w-full rounded-xl">
                                    <p className="mr-5 font-semibold">Доставка в постамат</p>
                                    <div className={`${renderStatus(item.status.status_id)} text-xs flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-lg`}>
                                        {item.status.status_name}
                                    </div>
                                </div>
                                {item.status.status_id === 6 ?
                                    <div>
                                        <p className="flex text-mainGray mt-5">Дата доставки: {item.delivery_date}</p>
                                        <div className="flex flex-row mt-10 text-sm items-start">
                                            <Link to="/reviews/" className="bg-mainOrange-600 rounded-xl px-3 py-1.5 mr-5">Оценить заказ</Link>
                                            <Link to="" className="border-mainOrange-600 border-2 rounded-xl px-3 py-1.5">Оценить товар</Link>
                                        </div>
                                    </div>
                                    : <p className="flex text-mainGray mt-5">Ожидаемая дата: {item.delivery_date}</p>
                                }
                            </div>
                            <div className="flex pr-10 items-end">
                            {cart.map(({order, product, weight}) => {
                                if(item.order.order_id === order){
                                    let image;
                                    weight === 1000 ? image = product.image_max : image = product.image_min
                                    return <img src={image} alt="картинка товара" width="100" className="h-fit"/>
                                }
                            })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default ClientOrders;