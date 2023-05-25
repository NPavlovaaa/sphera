import OrderReviewListItem from "./OrderReviewListItem";
import {useState} from "react";
import {useEffect} from "react";
import {fetchReviews, fetchReviewsProduct} from "../reviewsSlice";
import {useDispatch} from "react-redux";

const OrdersReviewList = ({detail}) => {
    const [status, setStatus] = useState();
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        onChange()
    }, [status])

    const onChange = (id) => {
        detail === 'product'
            ? dispatch(fetchReviewsProduct()).then(data => setReviews(data.payload))
            : dispatch(fetchReviews()).then(data => setReviews(data.payload))
        setStatus(id)
    }

    function renderReviewList(arr){
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Отзывов пока нет</h5>
        }

        const items = arr.map(({review, ...props}) => {
            return (
                <>
                    <OrderReviewListItem detail={detail} key={review.review_id} review={review} {...props} onChange={onChange}/>
                </>
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
        <div className="flex flex-row mt-4 w-full">
            {elements}
        </div>
    )
}
export default OrdersReviewList;