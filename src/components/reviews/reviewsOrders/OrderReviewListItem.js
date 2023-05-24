import Store from "../../icons/Store";
import Package from "../../icons/Package";
import Rating5 from "../../icons/Rating5";
import Rating1 from "../../icons/Rating1";
import Rating2 from "../../icons/Rating2";
import Rating3 from "../../icons/Rating3";
import Rating4 from "../../icons/Rating4";
import Rating from "../../icons/Rating";
import {useUpdateOrdersReviewMutation, useUpdateProductsReviewMutation} from "../../../api/apiSlice";


const OrderReviewListItem = ({detail, review, review_date, avatar, first_name, level, review_status, onChange}) => {
    const role = localStorage.getItem('ROLE');
    const [updateOrdersReview] = useUpdateOrdersReviewMutation();
    const [updateProductsReview] = useUpdateProductsReviewMutation();

    let params;
    const renderRating = (item) => {
        switch (item) {
            case 1:
                params = <Rating1/>
                break;
            case 2:
                params = <Rating2/>
                break;
            case 3:
                params = <Rating3/>
                break;
            case 4:
                params = <Rating4/>
                break;
            case 5:
                params = <Rating5/>
                break;
            default:
                params = <Rating/>
        }
        return params
    }

    const renderStatus = (id) => {
        let typeStatus;
        switch(id){
            case 1:
                typeStatus = 'text-blue-700 bg-blue-100';
                break;
            case 2:
                typeStatus = 'text-green-700 bg-green-100';
                break;
            case 3:
                typeStatus = 'text-red-700 bg-red-100';
                break;
            default:
                typeStatus = 'text-blue-700 bg-blue-100';
                break;
        }
        return typeStatus;
    }

    const ratingProduct = renderRating(review.product_quality_assessment)
    const ratingDelivery = renderRating(review.delivery_assessment)

    const updateReview = (id) => {
        if(detail === 'product'){
            updateProductsReview({'review_id': id, 'detail': 'publish'})
            onChange(id)

        } else{
            updateOrdersReview({'review_id': id, 'detail': 'publish'})
            onChange(id)
        }
    }

    const cancelReview = (id) => {
        if(detail === 'product'){
            updateProductsReview({'review_id': id, 'detail': 'cancel'})
            onChange(id)

        } else{
            updateOrdersReview({'review_id': id, 'detail': 'cancel'})
            onChange(id)
        }
    }

    return(
        <div className="mb-10">
            <div className="bg-mainWhite rounded-lg px-10 pt-5 pb-10 mb-4">
                {role === '1' ?
                    <div className="flex justify-between mb-5">
                        <p className="text-lg font-semibold">Отзыв №{review.review_id}</p>
                        <p className={`${renderStatus(review.review_status)} text-sm flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-lg`}>{review_status}</p>
                    </div>
                    : null
                }
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex flex-row">
                        <div className="h-14 w-14">
                            <img src={avatar} className="rounded-xl avatar" alt="фотография пользователя"/>
                        </div>
                        <div className="flex flex-col justify-center ml-2">
                            <p>{first_name}</p>
                            <p className="text-mainGray text-sm">{level}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <p className="flex mr-2">{review_date}</p>
                        {detail === 'product' ?
                            <span className="ml-1.5">{ratingProduct}</span>
                            : null}
                    </div>
                </div>
                {detail !== 'product' ?
                    <div className="flex">
                        <div className="flex items-center mr-10">
                            <Store/>
                            <p className="ml-1.5 text-sm">Магазин</p>
                            <span className="ml-1.5">{ratingProduct}</span>
                        </div>
                        <div className="flex items-center">
                            <Package/>
                            <p className="ml-1.5 text-sm">Доставка</p>
                            <span className="ml-1.5">{ratingDelivery}</span>
                        </div>
                    </div>
                    : null
                }
                <p className="mt-3">{review.review_text}</p>
            </div>
            {role === '1' && review_status === 'На рассмотрении' ?
                <div className="flex justify-end">
                    <button type="submit" onClick={() => cancelReview(review.review_id)} className="text-red-700 px-5 py-2 mr-5">Отклонить</button>
                    <button type="submit" onClick={() => updateReview(review.review_id)} className="bg-mainOrange-600 shadow-xl rounded-xl px-5 py-2">Опубликовать</button>
                </div>
                : null
            }
        </div>
    )
}
export default OrderReviewListItem;