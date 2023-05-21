/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../clientCart/cartSlice";
import Card from "../../icons/Card";
import { useCreateOrderMutation, useGetDeliveryMethodsQuery } from "../../../api/apiSlice";


const Ordering = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const [cart, setCart] = useState()
    const dispatch = useDispatch();
    const [openTab, setOpenTab] = useState(1);
    const [selectedDelivery, setSelectedDelivery] = useState({'delivery': null, 'selected': false});
    const [address, setAddress] = useState({'city': null, 'apartament': null});
    const {data: deliveries = []} = useGetDeliveryMethodsQuery();
    const [createOrder] = useCreateOrderMutation();
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        if(activeClient){
            dispatch(fetchCart()).then(data => {
                setCart(data.payload)
            })
        }
    }, [activeClient])

    const onCreateOrder = () =>{
        const newOrder = {
            'delivery': selectedDelivery.delivery,
            'order_sum': total_sum,
            'package': null,
            'address': address.city + ', ' + address.apartament
        }
        createOrder(newOrder)
        setRedirect(true)
    }

    let total_sum  = 0;
    let weight_sum  = 0;
    let count_products = 0;
    let image;

    return (
        <div className="w-full px-20 py-10">
            <h1 className="text-3xl font-bold">Оформление заказа</h1>
            <div className="grid grid-cols-3 gap-16 col-span-2 bg-lightGray p-10 w-full rounded-xl mt-5">
                {redirect ?
                    <div className="flex justify-center col-span-3">
                        <p className="text-xl font-semibold">Заказ оформлен!</p>
                    </div>
                    :
                    <>
                    <div className="flex flex-col col-span-2">
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold">Способы оплаты</p>
                                <div className="flex flex-row w-full bg-mainWhite mb-1.5 p-8 rounded-xl mt-2">
                                    <div className="flex flex-col justify-center items-center rounded-xl border-2 border-mainOrange-600 py-4 px-5 mr-5">
                                        <Card/>
                                        <p className="text-xs mt-2">Новая карта</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center rounded-xl border-4 border-mainOrange-600 py-5 px-5">
                                        <p>QR код</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mt-5">
                                <div className="flex flex-row justify-between">
                                    <p className="text-lg font-semibold">Адрес доставки</p>
                                </div>
                                <div className="flex flex-row mt-2">
                                    <input name="city"
                                           placeholder="Город, улица"
                                           className="w-2/3 mr-10 rounded-lg py-1 px-2"
                                           onChange={(e) => {
                                               e.preventDefault();
                                               setAddress({
                                                   'city': e.currentTarget.value,
                                                   'apartament': address.apartament
                                               })
                                           }}
                                    />
                                    <input name="apartament"
                                           placeholder="Квартира/Офис"
                                           className="w-1/3 rounded-lg py-1 px-2"
                                           onChange={(e) => {
                                               e.preventDefault();
                                               setAddress({
                                                   'city': address.city,
                                                   'apartament': e.currentTarget.value
                                               })
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mt-5">
                                <p className="text-lg font-semibold">Получатель</p>
                                <div className="flex flex-row mt-2">
                                    <p className="mr-10">{activeClient ? activeClient.first_name + ' ' + activeClient.last_name : null}</p>
                                    <p>{activeClient ? activeClient.phone : null}</p>
                                </div>
                            </div>
                            <div className="flex flex-col mt-5">
                                <p className="text-lg font-semibold">Состав заказа</p>
                                <div className="flex mt-2 bg-mainWhite rounded-xl px-8 py-5">
                                    {
                                        cart && cart.map(({cart_id, price, weight, count, product}) => {
                                            total_sum += price;
                                            weight_sum += weight * count;
                                            count_products += 1 * count;
                                            weight === 1000 ? image = product.image_max : image = product.image_min
                                            return (
                                                <div key={cart_id} className="flex flex-col items-center mr-5">
                                                    <img src={image} alt="картинка товара" width="100"
                                                         className="h-fit"/>
                                                    <p className="text-sm text-mainGray mt-2">{weight}г</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                {/* <Link to={`/ordering/`}> */}
                {/*    <QRModalWindow/>*/}
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
                    <p className="flex justify-end items-end text-xl font-semibold">{total_sum} р</p>
                    </div>
                    </div>
                    </>
                }
            </div>
        </div>
    )

}
export default Ordering;