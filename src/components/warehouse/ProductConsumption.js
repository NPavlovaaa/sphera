import Pagination from "../pagination/Pagination";
import {useEffect, useState, useMemo} from "react";
import {fetchProductConsumption, fetchProductWarehouse} from "../products/productSlice";
import {useDispatch, useSelector} from "react-redux";
import ModalWindowChangeProductCount from "../modalWindow/ModalWindowChangeProductCount";

const ProductConsumption = ({product}) => {
    const {count} = useSelector(state => state.getProduct)
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    let pageSize = 10;
    console.log(count)

    useEffect(() => {
        if(product.product_name){
            dispatch(fetchProductConsumption(product.product_name)).then(data => setProducts(data.payload))
        }
    }, [product, count])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return products.slice(firstPageIndex, lastPageIndex);
    }, [products, currentPage, count]);

    const onShowModal = (bool) => {
        setShowModal(bool)
    }

    return(
        <div className="w-full">
            {showModal ? <ModalWindowChangeProductCount onShowModal={onShowModal} isShowModal={showModal} product={product ? product : null} action={'Consumption'}/> : null}
            <div className="flex justify-between mb-2">
                <h3 className="text-xl font-semibold">Расходы сорта {product.product_name}</h3>
                <div className="flex text-lg items-center">
                    <p className="mr-2">Текущее кол-во кг:</p>
                    <p className="mr-5">{product.quantity}</p>
                    <button className="bg-mainOrange-600 px-4 py-1.5 rounded-xl text-base"
                        onClick={() => setShowModal(true)}
                    >
                        Добавить расход
                    </button>
                </div>
            </div>
            <table className="w-full">
                <thead className="flex flex-col w-full">
                    <tr className="grid grid-cols-7 mb-3 mt-5 w-full">
                        <th className="text-start grid col-span-1">Пользователь</th>
                        <th className="text-center grid col-span-1">Дата</th>
                        <th className="text-center grid col-span-1">Обжарка</th>
                        <th className="text-center grid col-span-1">Обработка</th>
                        <th className="text-center grid col-span-1">Вес</th>
                        <th className="text-center grid col-span-1">Стоимость</th>
                        <th className="text-center grid col-span-1">Кол-во</th>
                    </tr>
                    <span className="border-b border-mainOrange-600 w-full"></span>
                </thead>
                <tbody className="w-full">
                {currentTableData && currentTableData.length > 0 ? currentTableData.map(item => {
                    return (
                        <div className="flex flex-col py-1.5 w-full">
                            <tr className="grid grid-cols-7 mb-2 items-center">
                                <td className={`${item.username === 'Администратор' ? "text-mainOrange-600" : ""} text-start grid col-span-1`}>{item.username}</td>
                                <td className="text-center grid col-span-1">{item.date}</td>
                                <td className="text-center grid col-span-1">{item.roasting_method ? item.roasting_method : <span>---</span>}</td>
                                <td className="text-center grid col-span-1">{item.processing_method}</td>
                                <td className="text-center grid col-span-1">{item.weight ? item.weight : 1000} г</td>
                                <td className="text-center grid col-span-1">{item.price ? item.price : <span>---</span>}</td>
                                <td className="text-center grid col-span-1 text-red-700">- {item.product_count} шт</td>
                            </tr>
                            <span className="border-b border-lightGray w-full"></span>
                        </div>
                    );
                }) :
                <p className="text-xl text-center mt-8">Расходов еще нет</p>
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
export default ProductConsumption