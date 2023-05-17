import {useGetProductsQuery} from "../../../api/apiSlice";
import ProductListItem from "../productsListItem/ProductListItem";
import {useSelector} from "react-redux";
import {useMemo} from "react";


const ProductList = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const {activeFilterProcessing, activeFilterRoasting} = useSelector(state => state.getProduct)

    const {
        data: products = [],
        isLoading,
        isError
    } = useGetProductsQuery();

    const filteredProducts = useMemo(() => {
        const filteredProducts = products.slice();
        if(activeFilterProcessing === null && activeFilterRoasting === null){
            return filteredProducts;
        }else {
            if(activeFilterProcessing && activeFilterRoasting){
                return filteredProducts.filter(item => item.processing_method === activeFilterProcessing && item.roasting_method === activeFilterRoasting)
            }
            else{
                if(activeFilterProcessing){
                    return filteredProducts.filter(item => item.processing_method === activeFilterProcessing)
                }
                else{
                    return filteredProducts.filter(item => item.roasting_method === activeFilterRoasting)
                }
            }
        }

    }, [products, activeFilterProcessing, activeFilterRoasting]);

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
            return (
                <ProductListItem key={product.product_id} product_id={product.product_id} product={product} i={i} client={activeClient ? activeClient.client_id : null}/>
            )
        })

        return (
            <ul className="grid grid-cols-3 gap-10 w-full">
                {items}
            </ul>
        )

    }

    const elements = renderProductList(filteredProducts);
    return (
        <div className="flex flex-col w-full justify-center p-10">
            {elements}
            <button className="bg-mainOrange-600 shadow-xl rounded-lg px-5 py-2 mt-10">Загрузить еще</button>
        </div>
    )
}

export default ProductList;