/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../api/cartSlice";
import bobs250 from "../../assets/bobs250.png";
import delivery from "../../assets/delivery.png";
import { Link } from "react-router-dom";
import Card from "../icons/Card";
import { useCreateOrderMutation, useGetDeliveryMethodsQuery } from "../../api/apiSlice";


const Ordering = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const [cart, setCart] = useState()
    const dispatch = useDispatch();
    const [openTab, setOpenTab] = useState(1);
    const [selectedDelivery, setSelectedDelivery] = useState({'delivery': null, 'selected': false});
    const [address, setAddress] = useState({'city': null, 'apartament': null});
    const {data: deliveries = []} = useGetDeliveryMethodsQuery();
    const [createOrder] = useCreateOrderMutation();

    useEffect(()=>{
        if(activeClient){
            dispatch(fetchCart({'client': activeClient.client_id, 'cart': 1})).then(data => {
                setCart(data.payload)
            })
        }
    }, [activeClient])

    const onCreateOrder = () =>{
        console.log(cart)
        const newOrder = {
            'cart': cart,
            'client': activeClient.client_id,
            'delivery': selectedDelivery.delivery,
            'order_sum': totul_sum,
            'package': null,
            'address': address.city + ', ' + address.apartament
        }
        console.log(newOrder)
        createOrder(newOrder)
    }


    let totul_sum  = 0;
    let weight_sum  = 0;
    let count_products = 0;

    const ordering = () => {
        const renderOrdering = cart ? cart.map(({cart_id, price, weight, count}) => {
            totul_sum += price;
            weight_sum += weight * count;
            count_products += 1 * count;

            return (
                <div key={cart_id} className="flex flex-col items-center mr-5">
                    <img src={bobs250} width="75" alt="изображение товара"/>
                    <p className="text-sm text-mainGray mt-2">{weight}г</p>
                </div>
            )
        }) : null
        return renderOrdering
    }

    return (
        <div className="w-full px-20 py-10">
            <h1 className="text-3xl font-bold">Оформление заказа</h1>
            <div className="grid grid-cols-3 gap-16 col-span-2 bg-lightGray p-10 w-full rounded-xl mt-5">
                <div className="flex flex-col col-span-2">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">Способы оплаты</p>
                        <div className="flex flex-row w-full justify-between bg-mainWhite mb-1.5 p-8 rounded-xl mt-2">
                            <div className="flex flex-col justify-center items-center rounded-xl border-4 border-mainOrange-600 py-4 px-5">
                                <Card/>
                                <p className="text-xs mt-2">Новая карта</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-5">
                        <div className="flex flex-row justify-between">
                            <p className="text-lg font-semibold">Способы доставки</p>
                            <div className="flex flex-row">
                                <ul className="flex space-x-10">
                                    <li>
                                        <a className={` ${openTab === 1 ? "text-mainOrange-600" : ""} text-mainGray text-lg flex justify-center cursor-pointer rounded-lg`}
                                        href="#"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(1)
                                        }}>
                                            Курьером
                                        </a>
                                    </li>
                                    <li>
                                        <a className={` ${openTab === 2 ? "text-mainOrange-600" : ""} text-mainGray text-lg flex justify-center cursor-pointer rounded-lg`}
                                        href="#"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(2)
                                        }}>
                                            Пункты выдачи
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`${openTab === 1 ? "flex" : "hidden"} flex-col w-full justify-between bg-mainWhite mb-1.5 p-8 rounded-xl mt-2`}>
                            {deliveries ? deliveries.map(item => {
                                return(
                                    <div key={item.delivery_id}>
                                        <div className={`${selectedDelivery.selected === true && selectedDelivery.delivery === item.delivery_id ? "flex border-2 border-mainOrange-600" : "flex"} flex-row py-4 px-5 rounded-xl justify-between items-center text-lg`} onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedDelivery({'delivery': item.delivery_id, 'selected': !selectedDelivery.selected})
                                            }}>
                                            <img src={delivery} width="70" alt="картинка способа доставки"/>
                                            <p>2 - 4 мая</p>
                                            <p>149 р</p>
                                        </div>
                                        </div>
                                )
                            })
                        : null}
                            <div className={`${selectedDelivery.selected === true ? "flex" : "hidden"} w-4/5 mt-10`}>
                                <input  name="city"
                                        placeholder="Город, улица"
                                        className="w-2/3 border-b-2 border-mainGray mr-10"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setAddress({'city': e.currentTarget.value, 'apartament': address.apartament})
                                        }}
                                />
                                <input  name="apartament"
                                        placeholder="Квартира/Офис"
                                        className="w-1/3 border-b-2 border-mainGray"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setAddress({'city': address.city, 'apartament': e.currentTarget.value})
                                        }}
                                />
                            </div>
                            <div className="flex flex-col mt-8">
                                <p className="text-base font-semibold">Получатель</p>
                                <div className="flex flex-row mt-2">
                                    <p className="mr-10">{activeClient ? activeClient.first_name + ' ' + activeClient.last_name : null}</p>
                                    <p>{activeClient ? activeClient.phone : null}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${openTab === 2 ? "flex" : "hidden"} flex-row w-full justify-between bg-mainWhite mb-1.5 p-8 rounded-xl mt-2`}>
                            <img src={delivery} width="70" alt="картинка способа доставки"/>
                        </div>
                        <div className="flex flex-col mt-5">
                            <p className="text-lg font-semibold">Состав заказа</p>
                            <div className="flex mt-2 bg-mainWhite rounded-xl px-8 py-5">
                                {ordering()}
                            </div>
                        </div>
                    </div>
                </div>

                </div>
                <div className="flex flex-col">
                    {/* <Link to={`/ordering/`}> */}
                        <button onClick={onCreateOrder} type="submit" className="flex bg-mainOrange-600 hover:bg-mainOrange-700 rounded-2xl px-20 py-3 w-full text-lg font-semibold justify-center">
                            Оплатить онлайн
                        </button>
                    {/* </Link> */}
                    <div className="flex flex-row justify-between bg-mainWhite w-full mb-1.5 p-6 rounded-xl mt-3">
                        <p className="text-lg">Ваш заказ</p>
                        <div className="flex">
                            <p className="text-base text-mainGray mr-2">{count_products} шт /</p>
                            <p className="text-base text-mainGray">{weight_sum / 1000} кг</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between bg-mainWhite w-full mb-1.5 p-6 rounded-xl">
                        <p className="flex text-xl">Общая стоимость</p>
                        <p className="flex justify-end items-end text-xl font-semibold">{totul_sum} р</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Ordering;