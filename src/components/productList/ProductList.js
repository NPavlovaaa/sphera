import {useGetProductsQuery, useGetRoastingMethodsQuery, useGetProcessingMethodsQuery, useGetWeightsQuery, useGetWeightSelectionQuery, useGetVarietyQuery} from "../../api/apiSlice";
import { useRef } from "react";
import bobs250 from "../../assets/bobs250.png"
import Case1 from "../icons/Case1"
import Case2 from "../icons/Case2"
import Case3 from "../icons/Case3"
import Case4 from "../icons/Case4"
import Case5 from "../icons/Case5"
import CaseDefault from "../icons/CaseDefault"


const ProductList = () => {
    const {
        data: products = [],
        isLoading,
        isError
    } = useGetProductsQuery();
    const {data: roasting_methods = []} = useGetRoastingMethodsQuery();
    const {data: processing_methods = []} = useGetProcessingMethodsQuery();
    const {data: weights = []} = useGetWeightsQuery();
    const {data: weightSelection = []} = useGetWeightSelectionQuery();
    const {data: varieties = []} = useGetVarietyQuery();


    const itemRefs = useRef([]);

    if (isLoading) {
        return <h5 className="text-center mt-5">Загрузка</h5>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    function renderProductList(arr){
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Товаров пока нет</h5>
        }

        const items = arr.map((product, i) => {
            let params;
            const acidity = product.acidity
            const density = product.density
            const sweetness = product.sweetness
            const bitterness = product.bitterness

            const renderParams = (num) => {
                switch (num) {
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
                        params = <CaseDefault/>
                }
                return params
            }
            const roasting = roasting_methods.map(item => {
                if (item.roasting_method_id === product.roasting_method){
                    return item.roasting_method_name
                }
                else{
                    return null
                }
            })
            const processing = processing_methods.map(item => {
                if (item.processing_method_id === product.processing_method){
                    return item.processing_method_name
                }
                else{
                    return null
                }
            })

            const variety = varieties.map(item => {
                if (item.variety_id === product.variety){
                    return item.variety_name
                }
                else{
                    return null
                }
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
            })

            return (
                <li
                    className=""
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={product.product_id}
                >
                    <div className="bg-lightGray rounded-lg px-8 py-4 pb-5">
                        <div className="mb-5 flex flex-row text-xs">
                            <p className="text-mainGray l-0">{roasting}</p>
                            <p className="text-mainGray ml-3">{processing}</p>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <p className="text-xl font-medium mb-3">{product.product_name}</p>
                            <img src={bobs250} width="200" alt="Картинка товара" />
                            <p className="text-md text-mainGray mt-3">{variety}</p>
                            <p className="text-sm w-full left-0 text-mainGray mt-3 h-9">{product.taste}</p>
                            <div className="flex flex-col text-sm text-mainGray w-full mt-5">
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-center mb-2">
                                        <p className="flex mb-0.5">Кислотность</p>
                                        <div className="flex">
                                            {renderParams(acidity)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="flex mb-0.5">Плотность</p>
                                        {renderParams(density)}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-center">
                                        <p className="flex mb-0.5">Сладость</p>
                                        {renderParams(sweetness)}
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="flex mb-0.5">Горечь</p>
                                        {renderParams(bitterness)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between w-full mt-5">
                                {weights_render.map(item => {
                                    if (item[1] !== undefined) {
                                        return (
                                            <div>
                                                <input class="peer sr-only" type="radio" value={item[0]} name="weight" id={item[0]} checked/>
                                                <label class="text-xs text-mainGray flex justify-center cursor-pointer rounded-lg border-b-mainOrange-600 mainOrange py-1 px-2 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-mainOrange-600 transition-all duration-500 ease-in-out" for={item[0]}>
                                                    {item[1]}
                                                </label>
                                                <div class="mt-3 text-xl justify-center flex transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1">
                                                    {item[2]} р
                                                </div>
                                            </div>
                                        )
                                    }else return null

                                })}
                            </div>
                        </div>
                        <div className="flex justify-end mt-5">
                            <button type="submit" className="bg-mainOrange-600 rounded-2xl px-5 py-2">В корзину</button>
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <ul className="grid grid-cols-3 gap-10 w-full">
                {items}
            </ul>
        )

    }

    const elements = renderProductList(products);
    return (
        <div className="flex flex-col w-full justify-center p-10">
            {elements}
            <button className="bg-mainOrange-600 shadow-xl rounded-lg px-5 py-2 mt-10">Загрузить еще</button>
        </div>
    )
}

export default ProductList;