import {useGetProductsQuery, useGetWeightsQuery, useGetWeightSelectionQuery} from "../../api/apiSlice";
import ProductListItem from "../productsListItem/ProductListItem";

const ProductList = () => {
    const {
        data: products = [],
        isLoading,
        isError
    } = useGetProductsQuery();
    const {data: weights = []} = useGetWeightsQuery();
    const {data: weightSelection = []} = useGetWeightSelectionQuery();


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

            return (
                <ProductListItem key={product.product_id} product={product} i={i}/>
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