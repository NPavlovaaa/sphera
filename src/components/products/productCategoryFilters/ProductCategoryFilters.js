import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchCategory, activeCategoryChange } from "../productSlice";
import Question from "../../icons/Question";


const ProductCategoryFilters = () => {
    const {categories, activeCategory} = useSelector(state => state.getProduct)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory())
    }, [])

    const activeClass = 'bg-mainWhite shadow-mainOrange-200 shadow-xl';

    return (
            <div className="grid grid-cols-4 gap-10 w-full mt-8">
                {categories.map(item => {
                    let width;
                    item.category_id === 2 ? width=90 : width=105
                    return (
                        <div className="flex flex-col items-center">
                            <button type="submit"
                                    onClick={() => {
                                        item.category_id === activeCategory
                                            ? dispatch(activeCategoryChange(null))
                                            : dispatch(activeCategoryChange(item.category_id))
                                    }}>
                            <div className={`${item.category_id === activeCategory ? activeClass : "bg-lightGray hover:bg-mainWhite hover:shadow-mainOrange-200 hover:shadow-xl"} flex flex-col rounded-lg w-52 h-44 justify-between py-1.5 px-4 mb-1.5`}>
                                <div className="flex justify-end">
                                    <Question/>
                                </div>
                                <div className="flex justify-center">
                                    <img src={item.image} width={width}/>
                                </div>
                            </div>
                            </button>
                            <p>{item.category_name}</p>
                            <p className="text-mainGray text-sm">{item.note}</p>
                        </div>
                     )
                 })}
            </div>
    )
}

export default ProductCategoryFilters;