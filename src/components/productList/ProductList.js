import {useGetProductsQuery} from "../../api/apiSlice";
import ProductListItem from "../productsListItem/ProductListItem";
import { useSelector } from "react-redux";


const ProductList = () => {
    const activeClient = useSelector(state => state.authUser.client);

    const {
        data: products = [],
        isLoading,
        isError
    } = useGetProductsQuery();

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

    const elements = renderProductList(products);
    return (
        <div className="flex flex-col w-full justify-center p-10">
            {elements}
            <button className="bg-mainOrange-600 shadow-xl rounded-lg px-5 py-2 mt-10">Загрузить еще</button>
        </div>
    )
}

export default ProductList;