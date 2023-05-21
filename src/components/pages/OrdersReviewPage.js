import OrdersReviewList from "../reviews/reviewsOrders/OrdersReviewList";


const OrdersReviewPage = () => {
    return (
        <div className="w-full px-20 py-10">
            <h1 className="text-3xl font-bold">Отзывы</h1>
            <p className="mt-3">Здесь можно оставить свой отзыв о кофе, удобстве магазина и скорости доставки или просто написать свои впечатления о работе с нами. Это поможет другим покупателям сделать правильный выбор, а нам — становиться лучше.</p>
            <div className="bg-lightGray p-10 w-full rounded-xl mt-6">
                <h3 className="text-xl font-bold">Все отзывы</h3>
                <OrdersReviewList/>
            </div>
        </div>
    )
}

export default OrdersReviewPage;