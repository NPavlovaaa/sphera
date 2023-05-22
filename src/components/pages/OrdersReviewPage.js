import OrdersReviewList from "../reviews/reviewsOrders/OrdersReviewList";
import OrderReviewForm from "../reviews/reviewsOrders/OrderReviewForm";


const OrdersReviewPage = () => {
    const role = localStorage.getItem('ROLE');

    return (
        <>
            {role && role === "2" ?
                <div className="w-full px-20 py-10">
                    <h1 className="text-3xl font-bold">Отзывы</h1>
                    <p className="mt-3">Здесь можно оставить свой отзыв о кофе, удобстве магазина и скорости доставки или просто написать свои впечатления о работе с нами. Это поможет другим покупателям сделать правильный выбор, а нам — становиться лучше.</p>
                    <div className="bg-lightGray py-10 px-20 w-full rounded-xl mt-6">
                        <div>
                            <OrderReviewForm/>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Все отзывы</h3>
                            <OrdersReviewList/>
                        </div>
                    </div>
                </div>
            :
                <div className="w-full">
                <h1 className="text-3xl font-bold">Отзывы</h1>
                    <div className="bg-lightGray py-10 px-16 w-full rounded-xl mt-6">
                        <div>
                            <h3 className="text-xl font-bold">Все отзывы</h3>
                            <OrdersReviewList/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OrdersReviewPage;