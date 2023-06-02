import OrderReviewListItem from "./OrderReviewListItem";
import {useState} from "react";
import {useEffect} from "react";
import {fetchReviews, fetchReviewsProduct, fetchReviewsStatuses} from "../reviewsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";
import ReviewStatusFilters from "../../filters/reviewStatusFilters/ReviewStatusFilters";

const OrdersReviewList = ({detail}) => {
    const [status, setStatus] = useState();
    const [reviews, setReviews] = useState([]);
    const {activeFilter} = useSelector(state => state.getReview);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReviewsStatuses())
        onChange()
    }, [status])

    const onChange = (id) => {
        detail === 'product'
            ? dispatch(fetchReviewsProduct()).then(data => setReviews(data.payload))
            : dispatch(fetchReviews()).then(data => setReviews(data.payload))
        setStatus(id)
    }

    const filteredReviews = useMemo(() => {
        const filteredReviews = reviews.slice();
        if (activeFilter === ''){
            return filteredReviews;
        } else {
            return filteredReviews.filter(item => item.review_status === activeFilter)
        }
    }, [reviews, activeFilter]);

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

    const elements = renderReviewList(filteredReviews);

    return (
        <div className="flex flex-col mt-4 w-full">
            <div className="flex flex-row mt-5 items-center mb-3">
                <ReviewStatusFilters/>
            </div>
            {elements}
        </div>
    )
}
export default OrdersReviewList;