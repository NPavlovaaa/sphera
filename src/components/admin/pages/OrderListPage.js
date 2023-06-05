import OrderList from "../orderList/OrderList";


const OrderListPage = () => {
    return (
        <div className="flex flex-col w-full h-fit">
            <h1 className="text-3xl font-bold mb-4">Заказы</h1>
            <div className="flex w-full bg-mainWhite">
                <OrderList/>
            </div>
        </div>

    )
}

export default OrderListPage;