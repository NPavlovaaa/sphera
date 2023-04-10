import Case1 from "../components/icons/Case1";
import Case2 from "../components/icons/Case2";
import Case3 from "../components/icons/Case3";
import Case4 from "../components/icons/Case4";
import Case5 from "../components/icons/Case5";
import {useGetRoastingMethodsQuery, useGetProcessingMethodsQuery, useGetVarietyQuery, useGetWeightsQuery, useGetWeightSelectionQuery} from "../api/apiSlice";


const useSetParams = (product) => {
    const {data: roasting_methods = []} = useGetRoastingMethodsQuery();
    const {data: processing_methods = []} = useGetProcessingMethodsQuery();
    const {data: varieties = []} = useGetVarietyQuery();
    const {data: weights = []} = useGetWeightsQuery();
    const {data: weightSelection = []} = useGetWeightSelectionQuery();


    const roasting = roasting_methods.map(item => {
        if (item.roasting_method_id === product.roasting_method){
            return item.roasting_method_name
        }
        else{
            return null
        }
    });

    const processing = processing_methods.map(item => {
        if (item.processing_method_id === product.processing_method){
            return item.processing_method_name
        }
        else{
            return null
        }
    });

    const variety = varieties.map(item => {
        if (item.variety_id === product.variety){
            return item.variety_name
        }
        else{
            return null
        }
    });
    const allParams = [product.acidity, product.density, product.sweetness, product.bitterness]
    let params;
    const renderParams = allParams.map(item => {
        switch (item) {
            case 1:
                params = <Case1/>
                break;
            case 2:
                params = <Case2/>
                break;
            case 3:
                params = <Case3/>
                break;
            case 4:
                params = <Case4/>
                break;
            case 5:
                params = <Case5/>
                break;
            default:
                throw new Error('Unexpected process state');
        }
        return params
    })

    const weights_render = weightSelection.map(weight_selection => {
        let current_weight = [];
        if (weight_selection.product === product.product_id){
            weights.map(item => {
                if (item.weight_id === weight_selection.weight){
                    current_weight.push(weight_selection.weight_selection_id)
                    current_weight.push(item.weight)
                    current_weight.push(weight_selection.price)
                }
                return current_weight
        })}
        return current_weight
    });
    return {renderParams, roasting, processing, variety, weights_render}
}
export default useSetParams;