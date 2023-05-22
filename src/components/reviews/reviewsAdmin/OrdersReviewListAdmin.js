import {useGetOrdersReviewsQuery} from "../../../api/apiSlice";

const OrdersReviewListAdmin = () => {
    const {
        data: reviews = [],
        isLoading,
        isError
    } = useGetOrdersReviewsQuery();
    return (
        <div>Отзывы</div>
    )
}
export default OrdersReviewListAdmin;