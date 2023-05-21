import {useGetOrdersReviewsQuery} from "../../../api/apiSlice";
import OrderReviewListItem from "./OrderReviewListItem";

const OrdersReviewList = () => {
    const {
        data: reviews = [],
        isLoading,
        isError
    } = useGetOrdersReviewsQuery();


    if (isLoading) {
        return <h5 className="text-center mt-5">Загрузка</h5>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    function renderReviewList(arr){
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Отзывов пока нет</h5>
        }

        const items = arr.map(({review, ...props}) => {
            return (
                <OrderReviewListItem key={review.review_id} review={review} {...props}/>
            )
        })

        return (
            <ul className="w-full">
                {items}
            </ul>
        )

    }

    const elements = renderReviewList(reviews);

    return (
        <div className="flex flex-row mt-4">
            {elements}
        </div>
    )
}
export default OrdersReviewList;