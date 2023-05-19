import {useGetProductsQuery} from "../../../api/apiSlice";
import ProductListItem from "../productsListItem/ProductListItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {fetchProductList} from "../productSlice";
import {useState} from "react";
import Pagination from "../../pagination/Pagination";


const ProductList = () => {
    const activeClient = useSelector(state => state.authUser.client);
    // const [productList, setProductList] = useState([]);
    const {activeFilterProcessing, activeFilterRoasting} = useSelector(state => state.getProduct)
    let {activeCategory} = useSelector(state => state.getProduct)

    // const [newItemLoading, setNewItemLoading] = useState(false);
    // const [offset, setOffset] = useState(0);
    // const [productEnded, setProductEnded] = useState(false);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    activeCategory === 2 ? activeCategory=1 : activeCategory=activeCategory

    const [currentPage, setCurrentPage] = useState(1);
    // const {
    //     data: products = [],
    //     isLoading,
    //     isError
    // } = useGetProductsQuery();

    useEffect(() => {
        dispatch(fetchProductList())
            .then(data => setProducts(data.payload))
    }, [])

    // const onRequest = (offset, initial) => {
    //     initial ? setNewItemLoading(false) : setNewItemLoading(true);
    //     dispatch(fetchProductList(offset))
    //         .then(data => onProductListLoaded(data.payload))
    // }
    //
    // const onProductListLoaded = (newProductList) => {
    //     let ended = false;
    //     if (newProductList.length < 8){
    //         ended = true
    //     }
    //
    //     setProductList([...productList, ...newProductList]);
    //     setNewItemLoading(false);
    //     setOffset(offset + 9);
    //     setProductEnded(ended);
    // }


    const filteredProducts = useMemo(() => {
        const filteredProducts = products.slice();
        setCurrentPage(1);
        if(activeFilterProcessing === null && activeFilterRoasting === null && activeCategory === null){
            return filteredProducts;
        }else {
            if(activeFilterProcessing && activeFilterRoasting && activeCategory){
                return filteredProducts.filter(item => item.processing_method === activeFilterProcessing && item.roasting_method === activeFilterRoasting && item.category === activeCategory)
            }
            else{
                if(activeFilterProcessing && activeFilterRoasting){
                    return filteredProducts.filter(item => item.processing_method === activeFilterProcessing && item.roasting_method === activeFilterRoasting)
                }
                else if(activeFilterProcessing && activeCategory){
                    return filteredProducts.filter(item => item.processing_method === activeFilterProcessing && item.category === activeCategory)
                }
                else if(activeFilterRoasting && activeCategory){
                    return filteredProducts.filter(item => item.roasting_method === activeFilterRoasting && item.category === activeCategory)
                }
                else if(activeCategory){
                    return filteredProducts.filter(item => item.category === activeCategory)
                }
                else if(activeFilterProcessing){
                    return filteredProducts.filter(item => item.processing_method === activeFilterProcessing)
                }
                else{
                    return filteredProducts.filter(item => item.roasting_method === activeFilterRoasting)
                }
            }
        }

    }, [products, activeFilterProcessing, activeFilterRoasting, activeCategory]);

    let pageSize = 9;
    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return filteredProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredProducts]);

    // if (isLoading) {
    //     return <h5 className="text-center mt-5">Загрузка</h5>;
    // } else if (isError) {
    //     return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    // }

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

    const elements = renderProductList(currentData);
    return (
        <div className="flex flex-col w-full justify-center p-10 items-center">
            {elements}
            {/*<button className="bg-mainOrange-600 shadow-xl rounded-lg px-5 py-2 mt-10"*/}
            {/*        onClick={() => onRequest(offset)}*/}
            {/*        disabled={newItemLoading}*/}
            {/*        style={{'display': productEnded ? 'none' : 'block'}}*/}
            {/*>*/}
            {/*    Загрузить еще*/}
            {/*</button>*/}
            <Pagination
                className="pagination-bar mt-5"
                currentPage={currentPage}
                totalCount={filteredProducts.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}

export default ProductList;