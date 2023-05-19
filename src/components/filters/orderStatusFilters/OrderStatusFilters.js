import {activeFilterStatusChange} from "../../orders/orderSlice";
import {useDispatch, useSelector} from "react-redux";


const OrderStatusFilters = () => {
    const statuses = useSelector(state => state.getOrders.statuses);
    const {activeFilter} = useSelector(state => state.getOrders);
    const dispatch = useDispatch();

    const renderStatus = (id) => {
        let typeStatus;
        if(activeFilter && id === activeFilter){
            switch(id){
                case 1:
                    typeStatus = 'text-red-700 bg-red-100';
                    break;
                case 5:
                    typeStatus = 'text-red-700 bg-red-100';
                    break;
                case 6:
                    typeStatus = 'text-green-700 bg-green-100';
                    break;
                case 7:
                    typeStatus = 'text-gray-700 bg-gray-100';
                    break;
                default:
                    typeStatus = 'text-blue-700 bg-blue-100';
                    break;
            }
        }
        else {
            typeStatus = 'border-lightGray border-2';
        }
        return typeStatus;
    }

    return(
        <>
            <p className="text-mainGray mr-5">Фильтры: </p>
            {statuses.map(item =>{
                return(
                    <button className={`${renderStatus(item.status_id)} text-sm flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-sm mr-3`}
                            type="submit"
                            onClick={() => dispatch(activeFilterStatusChange(item.status_id))}
                    >
                        {item.status_name}
                    </button>
                )
            })}
            <button className="text-sm flex justify-center h-fit py-1.5 px-4"
                    type="submit"
                    onClick={() => dispatch(activeFilterStatusChange(0))}
            >
                Сбросить фильтр
            </button>
        </>
    )

}
export default OrderStatusFilters;