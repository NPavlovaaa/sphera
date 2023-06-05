import ProductListItem from "../productsListItem/ProductListItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {fetchProductList} from "../productSlice";
import {useState} from "react";
import Pagination from "../../pagination/Pagination";
import Spinner from "../../spinner/Spinner";
import ArrowVertical from "../../icons/ArrowVertical";
import ModalWindowAuthorization from "../../modalWindow/ModalWindowAuthorization";


const ProductList = () => {
    const activeClient = useSelector(state => state.authUser.client);
    // const [productList, setProductList] = useState([]);
    const {activeFilterProcessing, activeFilterRoasting, productLoadingStatus} = useSelector(state => state.getProduct)
    let {activeCategory} = useSelector(state => state.getProduct)
    const [openTab, setOpenTab] = useState('');
    // const [newItemLoading, setNewItemLoading] = useState(false);
    // const [offset, setOffset] = useState(0);
    // const [productEnded, setProductEnded] = useState(false);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

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

    function byField(field, detail) {
        if(detail === 'ascending'){
            return (a, b) => a[field] > b[field] ? 1 : -1;
        }else{
            return (a, b) => a[field] < b[field] ? 1 : -1;
        }
    }

    let sorted_products;

    if(openTab === 'rating_ascending'){
        sorted_products = products.sort(byField('rating', 'ascending'))
    }
    else if(openTab === 'rating_descending'){
        sorted_products = products.sort(byField('rating', 'descending'))
    }
    else if(openTab === 'price_ascending'){
        sorted_products = products.sort(byField('base_price', 'ascending'))
    }
    else if(openTab === 'price_descending'){
        sorted_products = products.sort(byField('base_price', 'descending'))
    }
    else{
        sorted_products = products
    }


    const filteredProducts = useMemo(() => {
        const filteredProducts = sorted_products.slice();
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

    }, [sorted_products, activeFilterProcessing, activeFilterRoasting, activeCategory, openTab]);

    let pageSize = 9;
    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return filteredProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredProducts]);

    const addToCart = (bool) => {
        setShowModal(bool)
    }

    function renderProductList(arr){
        const items = arr.map((product, i) => {
            return (
                <ProductListItem key={product.product_id} product={product} i={i} addToCart={addToCart}/>
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
        <div className="flex flex-col w-full p-10">
            {showModal ? <ModalWindowAuthorization isShowModal={showModal} addToCart={addToCart}/> : null}
            <div className="flex w-1/2 items-center justify-between mt-4 mb-8">
                <p>Сортировать по:</p>
                <div className="flex items-center">
                    <a className={` ${openTab === 'rating_ascending' || openTab === 'rating_descending' ? "text-mainOrange-600" : ""} cursor-pointer mr-1`}
                       href=""
                       onClick={(e) => {
                           e.preventDefault();
                           openTab !== 'rating_ascending' ? setOpenTab('rating_ascending') : setOpenTab('rating_descending')
                       }}>
                        Рейтингу
                    </a>
                    <ArrowVertical color={openTab === 'rating_ascending' || openTab === 'rating_descending' ? "#FFA82E" : "#000"}
                                   rotate={openTab === 'rating_ascending' ? 180 : 0}
                    />
                </div>
                <div className="flex items-center">
                    <a className={` ${openTab === 'price_ascending' || openTab === 'price_descending' ? "text-mainOrange-600" : ""} cursor-pointer mr-1`}
                       href=""
                       onClick={(e) => {
                           e.preventDefault();
                           openTab !== 'price_ascending' ? setOpenTab('price_ascending') : setOpenTab('price_descending')
                       }}>
                        Цене
                    </a>
                    <ArrowVertical color={openTab === 'price_ascending' || openTab === 'price_descending' ? "#FFA82E" : "#000"}
                                   rotate={openTab === 'price_ascending' ? 180 : 0}
                    />
                </div>
                <a className="cursor-pointer text-mainGray text-sm"
                   href=""
                   onClick={(e) => {
                       e.preventDefault();
                       setOpenTab('')
                   }}>
                    Сбросить
                </a>
            </div>
            {productLoadingStatus === 'loading' ? <Spinner/> : null}
            {elements}
            {/*<button className="bg-mainOrange-600 shadow-xl rounded-lg px-5 py-2 mt-10"*/}
            {/*        onClick={() => onRequest(offset)}*/}
            {/*        disabled={newItemLoading}*/}
            {/*        style={{'display': productEnded ? 'none' : 'block'}}*/}
            {/*>*/}
            {/*    Загрузить еще*/}
            {/*</button>*/}
            <Pagination
                className="pagination-bar mt-5 flex justify-center items-center"
                currentPage={currentPage}
                totalCount={filteredProducts.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}

export default ProductList;