import {activeFilterStatusChange} from "../../reviews/reviewsSlice";
import {useDispatch, useSelector} from "react-redux";


const ReviewStatusFilters = () => {
    const {activeFilter, statuses} = useSelector(state => state.getReview);
    const dispatch = useDispatch();

    const renderStatus = (id) => {
        let typeStatus;
        if(activeFilter && id === activeFilter){
            switch(id){
                case 'На рассмотрении':
                    typeStatus = 'text-blue-700 bg-blue-100';
                    break;
                case 'Опубликовано':
                    typeStatus = 'text-green-700 bg-green-100';
                    break;
                case 'Отклонено':
                    typeStatus = 'text-red-700 bg-red-100';
                    break;
                default:
                    typeStatus = 'text-blue-700 bg-blue-100';
                    break;
            }
        }
        else {
            typeStatus = 'bg-mainWhite';
        }
        return typeStatus;
    }

    return(
        <>
            <p className="text-mainGray mr-5">Фильтры: </p>
            {statuses.map(item =>{
                return(
                    <button className={`${renderStatus(item.review_status_name)} text-sm flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-sm mr-3`}
                            type="submit"
                            onClick={() => dispatch(activeFilterStatusChange(item.review_status_name))}
                    >
                        {item.review_status_name}
                    </button>
                )
            })}
            <button className="text-sm flex justify-center h-fit py-1.5 px-4"
                    type="submit"
                    onClick={() => dispatch(activeFilterStatusChange(''))}
            >
                Сбросить фильтр
            </button>
        </>
    )

}
export default ReviewStatusFilters;