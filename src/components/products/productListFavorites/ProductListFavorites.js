import {useDispatch, useSelector} from "react-redux";
import ProductListItem from "../productsListItem/ProductListItem";
import {useEffect, useState} from "react";
import {fetchFavoriteList} from "../productSlice";
import Spinner from "../../spinner/Spinner";

const ProductListFavorites = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const favoriteLoadingStatus = useSelector(state => state.getProduct.favoriteLoadingStatus);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavoriteList())
            .then(data => setProducts(data.payload))
    }, [])

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
            <ul className="grid grid-cols-4 gap-5 w-full">
                {items}
            </ul>
        )

    }

    const elements = renderProductList(products);
    return (
        <div className="flex flex-col w-full justify-center px-12 py-10">
            {favoriteLoadingStatus === 'loading' ? <Spinner/> : null}
            {elements}
            <button className="bg-mainOrange-600 shadow-xl rounded-lg px-5 py-2 mt-10">Загрузить еще</button>
        </div>
    )
}

export default ProductListFavorites;