import Pagination from "../pagination/Pagination";
import {useEffect, useState, useMemo} from "react";
import {fetchProductConsumption} from "../products/productSlice";
import {useDispatch, useSelector} from "react-redux";
import ModalWindowChangeProductCount from "../modalWindow/ModalWindowChangeProductCount";
import ArrowVertical from "../icons/ArrowVertical";

const ProductReceipt = ({product}) => {
    const {quantity, productLoadingStatus} = useSelector(state => state.getProduct)
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [openTab, setOpenTab] = useState('');
    let pageSize = 10;

    useEffect(() => {
        if(product.product_name){
            dispatch(fetchProductConsumption(product.product_name)).then(data => {
                let prs = data.payload.data
                prs = prs.filter(item => item.action === 'Receipt')
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

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return sorted_products.slice(firstPageIndex, lastPageIndex);
    }, [sorted_products, currentPage, openTab]);

    const onShowModal = (bool) => {
        setShowModal(bool)
    }

    return(
        <div className="w-full">
            {showModal ? <ModalWindowChangeProductCount onShowModal={onShowModal} isShowModal={showModal} product={product ? product : null} action={'Receipt'}/> : null}
            <div className="flex justify-between mb-2">
                <h3 className="text-xl font-semibold">Поступления сорта {product.product_name}</h3>
                <div className="flex text-lg items-center">
                    <p className="mr-2">Текущее кол-во кг:</p>
                    <p className="mr-5">{quantity ? quantity : null}</p>
                    <button className="bg-mainOrange-600 px-4 py-1.5 rounded-xl text-base"
                        onClick={() => setShowModal(true)}
                    >
                        Добавить поступление
                    </button>
                </div>
            </div>
            <div className="flex w-1/2 items-center justify-between mt-8 mb-2">
                <p>Сортировать по:</p>
                <div className="flex items-center">
                    <a className={` ${openTab === 'date_ascending' || openTab === 'date_descending' ? "text-mainOrange-600" : ""} cursor-pointer mr-1`}
                       href=""
                       onClick={(e) => {
                           e.preventDefault();
                           openTab !== 'date_ascending' ? setOpenTab('date_ascending') : setOpenTab('date_descending')
                       }}>
                        Дате
                    </a>
                    <ArrowVertical color={openTab === 'date_ascending' || openTab === 'date_descending' ? "#FFA82E" : "#000"}
                                   rotate={openTab === 'date_ascending' ? 180 : 0}
                    />
                </div>
                <div className="flex items-center">
                    <a className={` ${openTab === 'count_ascending' || openTab === 'count_descending' ? "text-mainOrange-600" : ""} cursor-pointer mr-1`}
                       href=""
                       onClick={(e) => {
                           e.preventDefault();
                           openTab !== 'count_ascending' ? setOpenTab('count_ascending') : setOpenTab('count_descending')
                       }}>
                        Количеству
                    </a>
                    <ArrowVertical color={openTab === 'count_ascending' || openTab === 'count_descending' ? "#FFA82E" : "#000"}
                                   rotate={openTab === 'count_ascending' ? 180 : 0}
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
            <table className="w-full">
                <thead className="flex flex-col w-full">
                    <tr className="grid grid-cols-5 mb-3 mt-5 w-full">
                        <th className="text-start grid col-span-1">Пользователь</th>
                        <th className="text-center grid col-span-1">Дата</th>
                        <th className="text-center grid col-span-1">Обработка</th>
                        <th className="text-center grid col-span-1">Стоимость</th>
                        <th className="text-center grid col-span-1">Кол-во</th>
                    </tr>
                    <span className="border-b border-mainOrange-600 w-full"></span>
                </thead>
                <tbody className="w-full">
                {currentTableData && currentTableData.length > 0 ? currentTableData.map(item => {
                    return (
                        <div className="flex flex-col py-1.5 w-full">
                            <tr className="grid grid-cols-5 mb-2 items-center">
                                <td className={`${item.username === 'Администратор' ? "text-mainOrange-600" : ""} text-start grid col-span-1`}>{item.username}</td>
                                <td className="text-center grid col-span-1">{item.date}</td>
                                <td className="text-center grid col-span-1">{item.processing_method}</td>
                                <td className="text-center grid col-span-1">{item.price > 0 ? item.price : <span>---</span>}</td>
                                <td className="text-center grid col-span-1 text-green-700">+ {item.product_count} кг</td>
                            </tr>
                            <span className="border-b border-lightGray w-full"></span>
                        </div>
                    );
                }) :
                <p className="text-xl text-center mt-8">Поступлений еще нет</p>
                }
                </tbody>
            </table>
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
export default ProductReceipt