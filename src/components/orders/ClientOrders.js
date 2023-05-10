import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchOrders} from "../../api/orderSlice";
import {fetchCartInOrders} from "../../api/cartSlice";
import bobs250 from "../../assets/bobs250.png";


const ClientOrders = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const [orders, setOrders] = useState();
    const [cart, setCart] = useState()

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
            {orders ? orders.map((item) => {
                console.log(item)
                return(
                    <div className="flex flex-col bg-lightGray pt-6 w-full rounded-xl mt-6 shadow-md" key={item.order.order_id}>
                        <div className="flex justify-between pr-10">
                            <p className="text-lg font-semibold ml-10">Заказ от {item.order_date}</p>
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
                                <p className="flex text-mainGray mt-5">Ожидаемая дата: {item.delivery_date}</p>
                            </div>
                            <div className="flex pr-10">
                            {cart ? cart.map(({order, product}) => {
                                if(item.order.order_id === order){
                                    return <img src={bobs250} alt="картинка товар" width="120"/>
                                }
                            })
                            : null}
                            </div>
                        </div>
                    </div>
                )
            })
            : null}
        </div>
    )
}
export default ClientOrders;