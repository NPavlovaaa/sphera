import {useEffect} from "react";
import InactiveCircle from "../../icons/InactiveCircle";
import ActiveCircle from "../../icons/ActiveCircle";
import {useDispatch, useSelector} from "react-redux";
import {
    activeFilterProcessingChange,
    activeFilterRoastingChange,
    activeFilterVarietyChange,
    fetchProcessingMethods,
    fetchVariety,
    fetchRoastingMethods, activeCategoryChange
} from "../productSlice";


const ProductsFilters = () => {
    const {activeFilterProcessing, activeFilterRoasting, activeFilterVariety, roasting, processing, variety} = useSelector(state => state.getProduct)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoastingMethods())
        dispatch(fetchProcessingMethods())
        dispatch(fetchVariety())
    }, [])

    const renderVar = (item) => {
        if(activeFilterVariety.length > 0){
            return activeFilterVariety.map(variety => {
                return item.variety_id === variety ? <ActiveCircle/> : <InactiveCircle/>
        })}
        else{
            return <InactiveCircle/>
        }
    }

    return (
        <div className="flex flex-col h-full shadow-lg px-10 py-5">
            <div className="flex flex-col mb-4">
                <div className="flex justify-between items-center rounded-xl mb-3 shadow-xl px-4 py-1.5">
                    <p>Обработка</p>
                </div>
                <div className="flex flex-col px-4">
                    {processing.map(item => {
                        return (
                            <div className="flex flex-row mb-1 items-center">
                                <button type="submit" onClick={() => {
                                    item.processing_method_id === activeFilterProcessing
                                        ? dispatch(activeFilterProcessingChange(null))
                                        : dispatch(activeFilterProcessingChange(item.processing_method_id))
                                }}>
                                    {activeFilterProcessing && activeFilterProcessing === item.processing_method_id ? <ActiveCircle/> : <InactiveCircle/>}
                                </button>
                                <p className="ml-2">{item.processing_method_name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col mb-4">
                <div className="flex justify-between items-center rounded-xl mb-3 shadow-xl px-4 py-1.5">
                    <p>Обжарка</p>
                </div>
                <div className="flex flex-col px-4">
                    {roasting.map(item => {
                        return (
                            <div className="flex flex-row mb-1 items-center">
                                <button type="submit" onClick={() => {
                                    item.roasting_method_id === activeFilterRoasting
                                        ? dispatch(activeFilterRoastingChange(null))
                                        : dispatch(activeFilterRoastingChange(item.roasting_method_id))
                                }}>
                                    {activeFilterRoasting && activeFilterRoasting === item.roasting_method_id ? <ActiveCircle/> : <InactiveCircle/>}
                                </button>
                                <p className="ml-2">{item.roasting_method_name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col mb-4">
                <div className="flex justify-between items-center rounded-xl mb-3 shadow-xl px-4 py-1.5">
                    <p>Разновидность</p>
                </div>
                <div className="flex flex-col px-4">
                    {variety.map(item => {
                        return (
                            <div className="flex flex-row mb-1 items-center">
                                <button type="submit" onClick={() => {
                                    item.variety_id === activeFilterVariety
                                        ? dispatch(activeFilterProcessingChange(null))
                                        : dispatch(activeFilterVarietyChange(item.variety_id))
                                }}>
                                    {renderVar(item)}
                                </button>
                                <p className="ml-2">{item.variety_name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductsFilters;