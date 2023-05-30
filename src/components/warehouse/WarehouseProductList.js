import Pagination from "../pagination/Pagination";
import {useEffect, useState, useMemo} from "react";
import {fetchProductWarehouse} from "../products/productSlice";
import {useDispatch} from "react-redux";

const WarehouseProductList = ({changeTab}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    let pageSize = 10;

    useEffect(() => {
        dispatch(fetchProductWarehouse()).then(data => setProducts(data.payload))
    }, [])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return products.slice(firstPageIndex, lastPageIndex);
    }, [products, currentPage]);

    return(
        <div>
            <table className="w-full">
                <thead className="flex flex-col w-full">
                    <tr className="grid grid-cols-6 mb-3 mt-5">
                        <th className="text-start grid col-span-1">Название</th>
                        <th className="text-center grid col-span-1">Обработка</th>
                        <th className="text-center grid col-span-1">Стоимость за кг</th>
                        <th className="text-center grid col-span-1">Кол-во</th>
                    </tr>
                    <span className="border-b border-mainOrange-600 w-full"></span>
                </thead>
                <tbody>
                {currentTableData ? currentTableData.map(item => {
                    return (
                        <div className="flex flex-col py-1.5">
                            <tr className="grid grid-cols-6 mb-2 items-center">
                                <td className="text-start grid col-span-1">{item.product_name}</td>
                                <td className="text-center grid col-span-1 ">{item.processing_method}</td>
                                <td className="text-center grid col-span-1">{item.price} р</td>
                                <td className="text-center grid col-span-1">{item.quantity}</td>
                                <div className="col-span-1">
                                    <button type="submit"
                                            onClick={() => changeTab(2, item)}
                                            className="flex border border-mainOrange-600 hover:bg-mainOrange-700 rounded-xl px-5 py-1.5">
                                        Расходы
                                    </button>
                                </div>
                                <div className="col-span-1">
                                    <button type="submit"
                                            onClick={() => changeTab(3, item)}
                                            className="flex bg-mainOrange-600 hover:bg-mainOrange-700 rounded-xl px-5 py-1.5">
                                        Поступления
                                    </button>
                                </div>
                            </tr>
                            <span className="border-b border-lightGray w-full"></span>
                        </div>
                    );
                }) : null}
                </tbody>
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={products.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}
export default WarehouseProductList