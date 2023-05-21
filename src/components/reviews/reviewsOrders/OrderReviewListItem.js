import Store from "../../icons/Store";
import Package from "../../icons/Package";
import Rating5 from "../../icons/Rating5";
import Rating1 from "../../icons/Rating1";
import Rating2 from "../../icons/Rating2";
import Rating3 from "../../icons/Rating3";
import Rating4 from "../../icons/Rating4";
import Rating from "../../icons/Rating";


const OrderReviewListItem = ({review, review_date, avatar, first_name, level}) => {
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

    const ratingProduct = renderRating(review.product_quality_assessment)
    const ratingDelivery = renderRating(review.delivery_assessment)

    return(
        <div className="bg-mainWhite rounded-lg p-10 mb-10">
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
                <p className="flex">{review_date}</p>
            </div>
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
            <p className="mt-3">{review.review_text}</p>
        </div>
    )
}
export default OrderReviewListItem;