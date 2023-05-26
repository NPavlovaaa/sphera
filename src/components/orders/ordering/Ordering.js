/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../clientCart/cartSlice";
import Card from "../../icons/Card";
import { useCreateOrderMutation, useGetDeliveryMethodsQuery } from "../../../api/apiSlice";
import scores from "../../../assets/score.png";

const Ordering = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const level = useSelector(state => state.authUser.level);
    const [cart, setCart] = useState()
    const dispatch = useDispatch();
    const [openTab, setOpenTab] = useState(1);
    const [selectedDelivery, setSelectedDelivery] = useState({'delivery': null, 'selected': false});
    const [address, setAddress] = useState({'city': null, 'apartament': null});
    const {data: deliveries = []} = useGetDeliveryMethodsQuery();
    const [createOrder] = useCreateOrderMutation();
    const [redirect, setRedirect] = useState(false);
    const [openTabScores, setOpenTabScores] = useState(1);

    let sum_with_discount;
    const discount = level ? level.available_percent * 0.01 : null;
    let sum = 0;
    let weight_sum = 0;
    let count_products = 0;
    let image;
    let rest_scores;
    let new_scores;
    let total_sum = 0;
    let available_scores = 0;

    useEffect(()=>{
        if(activeClient){
            dispatch(fetchCart()).then(data => {
                setCart(data.payload)
            })
        }
    }, [activeClient])

    const onCreateOrder = () =>{
        const newOrder = {
            // 'delivery': selectedDelivery.delivery,
            'order_sum': total_sum,
            'package': null,
            'address': address.city + ', ' + address.apartament
        }
        createOrder(newOrder)
        setRedirect(true)
    }

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
                                            sum += price;
                                            sum_with_discount = sum - sum * discount;

                                            if(activeClient && (sum * discount - activeClient.scores > 0)){
                                                sum_with_discount += sum * discount - activeClient.scores
                                            }
                                            else{
                                                rest_scores = (activeClient ? activeClient.scores : 0) - sum * discount
                                            }
                                            available_scores = activeClient.scores - rest_scores;
                                            new_scores = Math.round(sum_with_discount * level.loyal_percent / 100)
                                            total_sum = openTabScores === 2 ? sum_with_discount : sum

                                            weight_sum += weight * count;
                                            count_products += 1 * count;
                                            weight === 1000 ? image = product.image_max : image = product.image_min
                                            return (
                                                <div key={cart_id} className="flex flex-col items-center mr-5 justify-end">
                                                    <img src={image} alt="картинка товара" width="100" className="h-fit"/>
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
                        <div className="flex flex-col justify-between bg-mainWhite w-full mb-1.5 p-6 rounded-xl">
                            <div className="flex justify-between">
                                <p className="flex text-xl">Общая стоимость</p>
                                <p className="flex justify-end items-end text-xl font-semibold">{sum} р</p>
                            </div>
                            <div className="flex flex-row justify-between w-full text-sm my-3">
                                <p className="text-mainGray">Использовать баллы</p>
                                <ul className="flex  bg-lightGray rounded-2xl w-fit">
                                    <li>
                                        <a className={` ${openTabScores === 1 ? "bg-mainGray" : ""} flex justify-center cursor-pointer rounded-xl px-2.5`}
                                           href="src/components/products/productItem/ProductItem#"
                                           onClick={(e) => {
                                               e.preventDefault();
                                               setOpenTabScores(1)
                                           }}>
                                            <span className="opacity-0">d</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className={` ${openTabScores === 2 ? "bg-mainOrange-600" : ""} flex justify-center cursor-pointer rounded-xl px-2.5`}
                                           href="src/components/products/productItem/ProductItem#"
                                           onClick={(e) => {
                                               e.preventDefault();
                                               setOpenTabScores(2)
                                           }}>
                                            <span className="opacity-0">d</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {openTabScores === 2 ?
                            <>
                                <div className="flex justify-between items-center text-base">
                                    <p className="flex text-mainGray">Ваши баллы</p>
                                    <div className="flex items-center">
                                        <p className="flex text-lg text-mainGray">{activeClient? activeClient.scores: null}</p>
                                        <img src={scores} className="w-5 h-fit"/>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-base">
                                    <p className="flex text-mainGray">Доступно для списания </p>
                                    <div className="flex items-center">
                                        <p className="flex text-lg text-mainGray">- {available_scores}</p>
                                        <img src={scores} className="w-5 h-fit"/>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xl font-semibold mt-5">
                                    <p className="flex">Итого</p>
                                    <p className="flex3">{total_sum} р</p>
                                </div>
                                <div className="flex items-center justify-end text-mainGray">
                                    <p>+ {new_scores}</p>
                                    <img src={scores} className="w-4 h-fit"/>
                                </div>
                            </>
                                : null
                            }
                        </div>
                    </div>
                    </>
                }
            </div>
        </div>
    )

}
export default Ordering;