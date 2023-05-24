import OrdersReviewList from "../reviews/reviewsOrders/OrdersReviewList";
import OrderReviewForm from "../reviews/reviewsOrders/OrderReviewForm";
import ProductReviewForm from "../reviews/reviewsProducts/ProductReviewForm";
import {useEffect, useState} from "react";
import {fetchCartInOrders} from "../clientCart/cartSlice";
import {useDispatch} from "react-redux";
import {fetchOrders} from "../orders/orderSlice";


const OrdersReviewPage = ({detail, product}) => {
    const role = localStorage.getItem('ROLE');
    const [cart, setCarts] = useState([]);
    const [orders, setOrders] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartInOrders())
            .then(data => setCarts(data.payload))
        dispatch(fetchOrders())
            .then(data => setOrders(data.payload))
    }, [])

    const availableOrders = orders.filter(item => item.status.status_name === 'Получено')
    let availableCarts;
    product ? availableCarts = cart.filter(item => item.order_data.status === 6 && item.product.product_id === product.product_id) : availableCarts = []

    return (
        <>
            {role && role === "2" ?
                <>
                    {detail === 'product' ?
                        <div className="w-full px-5 py-5">
                            <h1 className="text-3xl font-bold">Отзывы</h1>
                            <p className="mt-3">Здесь можно оставить свой отзыв о кофе. Это поможет другим покупателям сделать правильный выбор, а нам — становиться лучше.</p>
                            <div className="bg-lightGray py-10 px-20 w-full rounded-xl mt-6">
                                {availableCarts.length > 0 ?
                                    <ProductReviewForm availableCarts={availableCarts}/>
                                    :
                                    <div className="mb-3">
                                        <div className="flex justify-center">
                                            <p>Вы еще не заказывали кофе</p>
                                            <p className="font-semibold ml-2">{product ? product.product_name : null}</p>
                                        </div>
                                        <div className="flex justify-center mt-2">
                                            <p>Попробуйте, чтобы оставить отзыв!</p>
                                        </div>
                                    </div>
                                }
                                <div>
                                    <h3 className="text-xl font-bold">Все отзывы</h3>
                                    <OrdersReviewList detail={detail}/>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="w-full px-20 py-10">
                            <h1 className="text-3xl font-bold">Отзывы</h1>
                            <p className="mt-3">Здесь можно оставить свой отзыв о кофе, удобстве магазина и скорости доставки или просто написать свои впечатления о работе с нами. Это поможет другим покупателям сделать правильный выбор, а нам — становиться лучше.</p>
                            <div className="bg-lightGray py-10 px-20 w-full rounded-xl mt-6">
                                <div>
                                    {availableOrders.length > 0 ?
                                        <OrderReviewForm availableOrders={availableOrders}/>
                                        :
                                        <div className="mb-3 flex justify-center">
                                            <p className="mb-3">Вы еще не совершили ни одного заказа</p>
                                            <p>Закажите что-нибудь, чтобы оставить отзыв!</p>
                                        </div>
                                    }
                                    <div>
                                        <h3 className="text-xl font-bold">Все отзывы</h3>
                                        <OrdersReviewList detail={detail}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </>

            :
                <div className="w-full">
                <h1 className="text-3xl font-bold">Отзывы</h1>
                    <div className="bg-lightGray py-10 px-16 w-full rounded-xl mt-6">
                        <div>
                            <h3 className="text-xl font-bold">Все отзывы</h3>
                            <OrdersReviewList detail={detail}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OrdersReviewPage;