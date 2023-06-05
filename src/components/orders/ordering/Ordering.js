/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../clientCart/cartSlice";
import { useCreateOrderMutation } from "../../../api/apiSlice";
import scores from "../../../assets/score.png";
import './ordering.css';
import {fetchPayment, fetchPaymentHash} from "../orderSlice";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import TruckIcon from "@heroicons/react/24/outline/TruckIcon";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";

import moment from "moment";
import { AddressSuggestions } from 'react-dadata';



const Ordering = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const activeUser = useSelector(state => state.authUser.user);
    const level = useSelector(state => state.authUser.level);
    const [cart, setCart] = useState()
    const dispatch = useDispatch();
    const [address, setAddress] = useState();
    const [userDate, setUserDate] = useState();
    const [time, setTime] = useState();
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
    console.log(time, userDate)

    const onCreateOrder = (price) =>{
        if(activeUser){
            const newPayment =
            {
                "TerminalKey": "TinkoffBankTest",
                "Amount": price,
                "OrderId": "221050",
                "Description": "Заказ",
                "DATA": {
                    "Phone": `${activeClient.phone}`,
                    "Email": `${activeUser.username}`
                },
                "Receipt": {
                    "Email": `${activeUser.username}`,
                    "Phone": `${activeClient.phone}`,
                    "EmailCompany": "b@test.ru",
                    "Taxation": "osn",
                    "Items": [{
                        "Name": "Наименование товара 1",
                        "Price": price,
                        "Quantity": 1.00,
                        "Amount": price,
                        "PaymentMethod": "full_prepayment",
                        "PaymentObject": "commodity",
                        "Tax": "vat10",
                        "Ean13": "0123456789"
                    }]
                }
            }
            const newOrder = {
                'order_sum': total_sum,
                'package': null,
                'address': address.unrestricted_value,
                'user_delivery_time': time,
                'user_delivery_date': userDate,
            }
            createOrder(newOrder)

                dispatch(fetchPayment(newPayment)).then(data => setTimeout(() => {
                    window.location.replace(data.payload.PaymentURL)
                }, 1000).then(setRedirect(true))
            )
        }
    }

    const date = moment().add(1, 'days').format().toString().substring(0, 10)

    return (
        <div className="w-full px-16 py-10">
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
                            <div className="flex flex-col bg-mainWhite py-3 px-7 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <TruckIcon width="25"/>
                                    <p className="text-lg font-semibold ml-2 mt-1">Способ получения</p>
                                </div>
                                <div className="flex w-full mb-1.5 mt-3 items-center">
                                    <p className="mr-3">Доставка курьером до двери:</p>
                                    <p className="font-semibold">0 р</p>
                                </div>
                                <div className="flex w-full mb-1.5 mt-3 items-center">
                                    <p className="mr-3">Курьерская доставка:</p>
                                    <input type="date"
                                           name="date"
                                           id="date"
                                           onChange={(e) => setUserDate(e.target.value)}
                                           defaultValue={date}
                                           value={userDate}
                                           min={date}
                                           max="2023-06-12"
                                           className="bg-lightGray px-5 rounded-lg py-1 mr-3"/>
                                    <select name="time" className="bg-lightGray px-5 rounded-lg py-1" onChange={(e) => setTime(e.target.value)}>
                                        <option value="10:00 - 12:00">10:00 - 12:00</option>
                                        <option value="12:00 - 16:00">12:00 - 16:00</option>
                                        <option value="16:00 - 20:00">16:00 - 20:00</option>
                                        <option value="20:00 - 22:00">20:00 - 22:00</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col bg-mainWhite py-2 px-7 rounded-b-lg shadow-sm mt-0.5">
                                <div className="flex items-center">
                                    <UserCircleIcon width="25"/>
                                    <p className="text-lg font-semibold ml-2 mt-1">Получатель</p>
                                </div>
                                <div className="flex w-full mb-1.5 mt-3 items-center">
                                    <p className="mr-6">{activeClient ? activeClient.first_name + ' ' + activeClient.last_name : null}</p>
                                    <p>{activeClient ? activeClient.phone : null}</p>
                                </div>
                            </div>
                            <div className="flex flex-col bg-mainWhite py-3 px-7 rounded-lg shadow-sm mt-5">
                                <div className="flex flex-col mb-1.5">
                                    <div className="flex items-center">
                                        <MapPinIcon width="25"/>
                                        <p className="text-lg font-semibold ml-2 ">Адрес доставки</p>
                                    </div>
                                    <div className="flex flex-row mt-3">
                                        <AddressSuggestions token="6aca7a280b962588253a2f1485b7554cd3a1550a"
                                                            defaultQuery={'Москва'}
                                                            value={address}
                                                            onChange={setAddress}
                                                            inputProps={{
                                                                placeholder: "Начните вводить адрес...",
                                                                style: {
                                                                    borderRadius: '10px',
                                                                    background: 'rgba(223, 223, 223, 0.27)',
                                                                    padding: '8px 20px',
                                                                    width: '100%'
                                                                }
                                                            }}
                                                            containerClassName="w-2/3"
                                                            suggestionsClassName="shadow-lg px-3 py-3"
                                                            suggestionClassName="py-1.5"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col bg-mainWhite py-3 px-7 rounded-lg shadow-sm mt-5">
                                <div className="flex flex-col mb-1.5">
                                    <div className="flex items-center">
                                        <PhotoIcon width="25"/>
                                        <p className="text-lg font-semibold ml-2 ">Индвидуальная упаковка</p>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <p className="text-sm">Выможете заказать индивидуальную упаковку для выбранных товаров, дял этого загрузите логотип Вашей компании.</p>
                                        <div className="flex items-center cursor-pointer mt-3">
                                            <label htmlFor="logo" className="rounded-xl py-1.5 px-5 bg-mainOrange-100 text-mainOrange-600">Загрузить логотип</label>
                                            <input id="logo" type="file" className="my"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col bg-mainWhite py-3 px-7 rounded-lg shadow-sm mt-5">
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold ml-2 mt-1">Состав заказа</p>
                                </div>
                                <div className="flex w-full mb-1.5 mt-3 items-center">
                                    {
                                        cart && cart.map(({cart_id, price, weight, count, product}) => {
                                            sum += weight === 250 || weight === 1000  ? price : weight * price * count;
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

                                            weight_sum += weight_sum += weight === 250 ? weight * count : weight * count * 1000;
                                            count_products += weight === 250 ? count : weight * count;
                                            weight === 250 ? image = product.image_min : image = product.image_max;
                                            return (
                                                <div key={cart_id} className="flex flex-col text-sm justify-end items-center h-40 mt-5">
                                                    <img src={image} alt="картинка товара" width="100" className="max-h-40"/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <button onClick={() => onCreateOrder(total_sum * 100)} type="submit" className="flex bg-mainOrange-600 hover:bg-mainOrange-700 rounded-2xl px-20 py-3 w-full text-lg font-semibold justify-center">
                            Оплатить онлайн
                        </button>
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
                                    <p className="text-green-700">+ {new_scores}</p>
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