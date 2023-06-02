import Pagination from "../../pagination/Pagination";
import {useEffect, useState, useMemo} from "react";
import {fetchProductWarehouse} from "../../products/productSlice";
import {useDispatch} from "react-redux";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";


const WarehouseProductList = ({changeTab}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    let pageSize = 10;
    let total_count;

    useEffect(() => {
        dispatch(fetchProductWarehouse()).then(data => setProducts(data.payload))
    }, [])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return products.slice(firstPageIndex, lastPageIndex);
    }, [products, currentPage]);


    return(
        <div className="rounded-2xl shadow-lg bg-mainWhite w-full">
            <Box>
                <Table>
                    <TableHead className="bg-darkLightGray">
                        <TableRow>
                            <TableCell>
                                <span className=" pl-8">НАЗВАНИЕ</span>
                            </TableCell>
                            <TableCell>
                                <span className="flex justify-center">ОБРАБОТКА</span>
                            </TableCell>
                            <TableCell>
                                <span className="flex justify-center">СТОИМОСТЬ ЗА КГ</span>
                            </TableCell>
                            <TableCell>
                                <span className="flex justify-center pr-8">КОЛ-ВО КГ</span>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentTableData ? currentTableData.map(item => {
                            total_count += item.quantity
                            return (
                                <TableRow
                                    hover
                                    key={item.product_id}

                                >
                                    <TableCell>
                                        <div className="justify-center items-center pl-8">
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
                                            {item.price_1000}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center pr-8">
                                            {item.quantity}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <button type="submit"
                                                onClick={() => changeTab('ProductConsumption', item)}
                                                className="flex border border-mainOrange-600 hover:bg-mainOrange-700 rounded-xl px-5 py-1.5">
                                            Расходы
                                        </button>
                                    </TableCell>
                                    <TableCell>
                                        <button type="submit"
                                                onClick={() => changeTab('ProductReceipt', item)}
                                                className="flex bg-mainOrange-600 hover:bg-mainOrange-700 rounded-xl px-5 py-1.5">
                                            Поступления
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        }) : null}
                    </TableBody>
                </Table>
            </Box>
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