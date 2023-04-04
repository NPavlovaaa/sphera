import {useGetProductsQuery, useGetRoastingMethodsQuery, useGetProcessingMethodsQuery} from "../../api/apiSlice";
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

            return (
                <li
                    className="flex mr-10"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={product.product_id}
                >
                    <div className="bg-lightGray w-1/3 rounded-lg px-8 py-4">
                        <div className="mb-10 flex flex-row text-xs">
                            <p className="text-mainGray l-0">{roasting}</p>
                            <p className="text-mainGray ml-3">{processing}</p>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <img src={bobs250} width="200" alt="Картинка товара" />
                            <div className="flex flex-col text-sm text-mainGray w-full mt-5">
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-center mb-2">
                                        <p className="flex mb-0.5">Кислотность</p>
                                        {renderParams(acidity)}
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
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <ul className="w-full">
                {items}
            </ul>
        )

    }

    const elements = renderProductList(products);
    return (
        <div className="flex flex-col w-full p-10">
            {elements}
            <button
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ProductList;