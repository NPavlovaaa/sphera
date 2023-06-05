import Pagination from "../../pagination/Pagination";
import {useEffect, useState, useMemo} from "react";
import {fetchProductConsumption} from "../../products/productSlice";
import {useDispatch, useSelector} from "react-redux";
import ModalWindowChangeProductCount from "../../modalWindow/ModalWindowChangeProductCount";
import ArrowVertical from "../../icons/ArrowVertical";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

const ProductConsumption = ({product}) => {
    const {quantity, productLoadingStatus} = useSelector(state => state.getProduct)
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [openTab, setOpenTab] = useState('');
    const [filter, setFilter] = useState(null);
    let pageSize = 10;

    useEffect(() => {
        if(product.product_name){
            dispatch(fetchProductConsumption(product.product_name)).then(data => {
                let prs = data.payload.data
                prs = prs.filter(item => item.action === 'Consumption')
                setProducts(prs)
            })
        }
    }, [product, openTab, productLoadingStatus])

    function byField(field, detail) {
        if(detail === 'ascending'){
            return (a, b) => a[field] > b[field] ? 1 : -1;
        }else{
            return (a, b) => a[field] < b[field] ? 1 : -1;
        }
    }

    let sorted_products;

    if(openTab === 'date_ascending'){
        sorted_products = products.sort(byField('date', 'ascending'))
    }
    else if(openTab === 'date_descending'){
        sorted_products = products.sort(byField('date', 'descending'))
    }
    else if(openTab === 'count_ascending'){
        sorted_products = products.sort(byField('product_count', 'ascending'))
    }
    else if(openTab === 'count_descending'){
        sorted_products = products.sort(byField('product_count', 'descending'))
    }
    else{
        sorted_products = products
    }

    const filteredProducts = useMemo(() => {
        const filteredProducts = sorted_products.slice();
        if(filter === null){
            return filteredProducts;
        }else{
            setCurrentPage(1);
            if(filter === 'Администратор'){
                return filteredProducts.filter(item => item.username === 'Администратор')
            }else if(filter === 'Пользователи'){
                return filteredProducts.filter(item => item.username !== 'Администратор')
            }
        }

    }, [sorted_products, filter, openTab]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return filteredProducts.slice(firstPageIndex, lastPageIndex);
    }, [filteredProducts, currentPage]);

    const onShowModal = (bool) => {
        setShowModal(bool)
    }

    return(
        <div className="w-full">
            {showModal ? <ModalWindowChangeProductCount onShowModal={onShowModal} isShowModal={showModal} product={product ? product : null} action={'Consumption'}/> : null}
            <div className="flex justify-between mb-2">
                <h3 className="text-xl font-semibold">Расходы сорта {product.product_name}</h3>
                <div className="flex text-base items-center">
                    <p className="mr-2">Текущее кол-во кг:</p>
                    <p className="mr-5">{quantity}</p>
                    <button className="bg-mainOrange-600 px-4 py-1.5 rounded-xl text-base"
                        onClick={() => setShowModal(true)}
                    >
                        Добавить расход
                    </button>
                </div>
            </div>
            <div className="flex items-center mb-5">
                <p className="text-mainGray mr-5">Фильтры: </p>
                <button className={`${filter === 'Пользователи' ? 'text-mainOrange-600 bg-mainOrange-100' : 'bg-mainWhite'} text-sm flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-md mr-3`}
                        type="submit"
                        onClick={() => {
                            filter !== 'Пользователи' ? setFilter('Пользователи') : setFilter(null)
                        }}
                >
                    Пользователи
                </button>
                <button className={`${filter === 'Администратор' ? 'text-mainOrange-600 bg-mainOrange-100' : 'bg-mainWhite'} text-sm flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-md mr-3`}
                        type="submit"
                        onClick={() => {
                            filter !== 'Администратор' ? setFilter('Администратор') : setFilter(null)
                        }}
                >
                    Администратор
                </button>
            </div>
            <div className="rounded-xl shadow-lg bg-mainWhite">
                <Table>
                    <TableHead className="bg-darkLightGray">
                        <TableRow>
                            <TableCell>
                                <span className="pl-8">ПОЛЬЗОВАТЕЛЬ</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center">
                                <span className={` ${openTab === 'date_ascending' || openTab === 'date_descending' ? "text-mainOrange-600" : ""} flex cursor-pointer mr-1`}
                                      onClick={(e) => {
                                          e.preventDefault();
                                          openTab !== 'date_ascending' ? setOpenTab('date_ascending') : setOpenTab('date_descending')
                                      }}
                                >ДАТА</span>
                                <ArrowVertical color={openTab === 'date_ascending' || openTab === 'date_descending' ? "#FFA82E" : "#000"}
                                               rotate={openTab === 'date_ascending' ? 180 : 0}
                                />
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="flex justify-center">ОБЖАРКА</span>
                            </TableCell>
                            <TableCell>
                                <span className="flex justify-center">ОБРАБОТКА</span>
                            </TableCell>
                            <TableCell>
                                <span className="flex justify-center">ВЕС</span>
                            </TableCell>
                            <TableCell>
                                <span className="flex justify-center">СТОИМОСТЬ</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center pr-8">
                                    <span className={` ${openTab === 'count_ascending' || openTab === 'count_descending' ? "text-mainOrange-600" : ""} cursor-pointer mr-1`}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           openTab !== 'count_ascending' ? setOpenTab('count_ascending') : setOpenTab('count_descending')
                                       }}>
                                        КОЛИЧЕСТВО
                                    </span>
                                    <ArrowVertical color={openTab === 'count_ascending' || openTab === 'count_descending' ? "#FFA82E" : "#000"}
                                                   rotate={openTab === 'count_ascending' ? 180 : 0}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentTableData ? currentTableData.map(item => {
                            return (
                                <TableRow
                                    hover
                                    key={item.product_id}

                                >
                                    <TableCell>
                                        <div className="justify-center items-center pl-8">
                                            <span className={`${item.username === 'Администратор' ? "text-blue-700" : ""}`}>{item.username}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center">
                                            {item.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center">
                                            {item.roasting_method ? item.roasting_method : <span>---</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center">
                                            {item.processing_method}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center">
                                            {item.weight ? item.weight : 1000} г
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center">
                                            {item.price > 0 ? item.price : <span>---</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center pr-8 text-red-700">
                                            - {item.product_count} кг
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        }) :
                            <p className="text-xl text-center mt-8">Расходов еще нет</p>
                        }
                    </TableBody>
                </Table>
            </div>
            <Pagination
                className="pagination-bar justify-center mt-4"
                currentPage={currentPage}
                totalCount={products.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}
export default ProductConsumption