import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrders } from "../../api/orderSlice";
import { fetchAdminCart } from "../../api/cartSlice";
import bobs250 from "../../assets/bobs250.png";


const AdminOrders = () => {
    const token = useSelector(state => state.authUser.token);
    const activeUser = useSelector(state => state.authUser.user);
    console.log(token)

    const [orders, setOrders] = useState();
    const [cart, setCart] = useState()

    const dispatch = useDispatch();

    useEffect(()=>{
        if(token){
            updateOrders();
        }
    }, [activeUser, token])

    const updateOrders = () =>{
        dispatch(fetchAdminOrders(token.jwt)).then(data => {
            setOrders(data.payload)
        })
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
                typeStatus = 'text-gray-700 bg-green-gray';
                break;
            default:
                typeStatus = 'text-blue-700 bg-blue-100';
                break;
        }
        return typeStatus;
    }

    return(
        <div className="w-full px-8">
            <h1 className="text-3xl font-bold">Заказы</h1>
            {orders ? orders.map((item) => {
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
                                        {cart ? cart.map(({order, product, roasting, processing, price, weight, cart_id, count, weight_selection}) => {
                                            if(item.order.order_id === order){
                                                return (
                                                    <div className="grid grid-cols-8 mt-1 text-sm">
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
                                    </div>
                                </div>
                                <button type="submit" className="flex py-1.5 px-5 bg-mainOrange-600 justify-center rounded-lg w-fit text-sm mt-5">Изменить статус или ожидаемую дату</button>
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