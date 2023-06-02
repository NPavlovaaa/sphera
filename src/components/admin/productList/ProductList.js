import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {fetchProductWarehouse, editProduct, fetchDeleteProduct} from "../../products/productSlice"
import {useState} from "react";
import Pagination from "../../pagination/Pagination";
import {
    Box, Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material";
import Pen from "../../icons/Pen";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";

const ProductList = () => {
    const {activeFilterProcessing, activeFilterRoasting, productLoadingStatus} = useSelector(state => state.getProduct)
    let {activeCategory} = useSelector(state => state.getProduct)
    const [openTab, setOpenTab] = useState('');
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    activeCategory === 2 ? activeCategory=1 : activeCategory=activeCategory

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProductWarehouse()).then(data => setProducts(data.payload))
    }, [productLoadingStatus])


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

    let pageSize = 5;
    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return filteredProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredProducts]);


    return(
        <div className="rounded-2xl shadow-lg bg-mainWhite w-full text-base">
            <Box>
                <Table>
                    <TableHead className="">
                        <TableRow>
                            <TableCell>
                                <span className="font-semibold">Название</span>
                            </TableCell>
                            <TableCell>
                                <span className="font-semibold flex justify-center">Обработка</span>
                            </TableCell>
                            <TableCell>
                                <span className="font-semibold flex justify-center">Стоимость за кг</span>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData ? currentData.map(item => {
                            return (
                                <TableRow
                                    key={item.product_id}

                                >
                                    <TableCell>
                                        <div className="flex items-center">
                                            <img src={item.image} width="50" className="mr-3"/>
                                            {item.product_name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center">
                                            {item.processing_method}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center">
                                            {item.price_1000} р
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <button className="flex justify-center items-center bg-mainOrange-100 px-3.5 py-2.5 rounded-2xl"
                                                onClick={() => dispatch(editProduct(item))}
                                        >
                                            <Pen/>
                                        </button>
                                    </TableCell>
                                    <TableCell>
                                        <button className="flex justify-center items-center bg-red-100 px-3 py-2 rounded-2xl"
                                                onClick={() => dispatch(fetchDeleteProduct(item.product_id))}
                                        >
                                            <TrashIcon width="16" color="#EC5859"/>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        }) : null}
                    </TableBody>
                </Table>
            </Box>
            <Pagination
                className="pagination-bar py-5 flex justify-center items-center"
                currentPage={currentPage}
                totalCount={filteredProducts.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}

export default ProductList;