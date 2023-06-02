import Pagination from "../../pagination/Pagination";
import {useEffect, useState, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchIncomes} from "../../orders/orderSlice";
import ArrowVertical from "../../icons/ArrowVertical";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import ModalWindowChangeIncomes from "../../modalWindow/ModalWindowChangeIncomes";

const IncomeList = () => {
    const {changeLoadingStatus} = useSelector(state => state.authUser)
    const [currentPage, setCurrentPage] = useState(1);
    const [incomes, setIncomes] = useState([]);
    const [action, setAction] = useState('');
    const dispatch = useDispatch();
    const [openTab, setOpenTab] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [filter, setFilter] = useState(null);
    let pageSize = 10;

    useEffect(() => {
        dispatch(fetchIncomes()).then(data => setIncomes(data.payload))
    }, [openTab, changeLoadingStatus])


    function byField(field, detail) {
        if(detail === 'ascending'){
            return (a, b) => a[field] > b[field] ? 1 : -1;
        }else{
            return (a, b) => a[field] < b[field] ? 1 : -1;
        }
    }

    let sorted_incomes;

    if(openTab === 'date_ascending'){
        sorted_incomes = incomes.sort(byField('date', 'ascending'))
    }
    else if(openTab === 'date_descending'){
        sorted_incomes = incomes.sort(byField('date', 'descending'))
    }
    else if(openTab === 'price_ascending'){
        sorted_incomes = incomes.sort(byField('price', 'ascending'))
    }
    else if(openTab === 'price_descending'){
        sorted_incomes = incomes.sort(byField('price', 'descending'))
    }
    else{
        sorted_incomes = incomes
    }

    const filteredIncomes = useMemo(() => {
        const filteredIncomes = sorted_incomes.slice();
        if(filter === null){
            return filteredIncomes;
        }else{
            setCurrentPage(1);
            if(filter === 'Расходы'){
                return filteredIncomes.filter(item => item.order ? item.action === 'Receipt' : item.action === 'Consumption')
            }else if(filter === 'Доходы'){
                return filteredIncomes.filter(item => item.order ? item.action === 'Consumption' : item.action === 'Receipt')
            }
        }

    }, [sorted_incomes, filter, openTab]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return filteredIncomes.slice(firstPageIndex, lastPageIndex);
    }, [filteredIncomes, currentPage]);

    const onShowModal = (bool) => {
        setShowModal(bool)
    }

    return(
        <div className="w-full">
            <h1 className="text-3xl font-bold">Бюджет</h1>
            {showModal ? <ModalWindowChangeIncomes onShowModal={onShowModal} isShowModal={showModal} action={action}/> : null}
            <div className="flex justify-between">
                <div className="flex items-center mt-5 mb-4">
                    <p className="text-mainGray mr-5">Фильтры: </p>
                    <button className={`${filter === 'Расходы' ? 'text-mainOrange-600 bg-mainOrange-100' : null} bg-mainWhite text-sm flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-md mr-3`}
                            type="submit"
                            onClick={() => {
                                filter !== 'Расходы' ? setFilter('Расходы') : setFilter(null)
                            }}
                    >
                        Расходы
                    </button>
                    <button className={`${filter === 'Доходы' ? 'text-mainOrange-600 bg-mainOrange-100' : null} bg-mainWhite text-sm flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-md mr-3`}
                            type="submit"
                            onClick={() => {
                                filter !== 'Доходы' ? setFilter('Доходы') : setFilter(null)
                            }}
                    >
                        Доходы
                    </button>
                </div>
                <div className="flex text-base items-center">
                    <button className="items-center border border-mainOrange-600 px-4 py-1.5 rounded-xl text-sm mr-3"
                            onClick={() => {
                                setShowModal(true)
                                setAction('Consumption')
                            }}
                    >
                        Добавить расход
                    </button>
                    <button className="items-center bg-mainOrange-600 px-4 py-1.5 rounded-xl text-sm"
                            onClick={() => {
                                setShowModal(true)
                                setAction('Receipt')
                            }}
                    >
                        Добавить доход
                    </button>
                </div>
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
                                <span className="flex justify-center">ОПИСАНИЕ</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center">
                                <span className={` ${openTab === 'price_ascending' || openTab === 'price_descending' ? "text-mainOrange-600" : ""} cursor-pointer mr-1`}
                                   onClick={(e) => {
                                       e.preventDefault();
                                       openTab !== 'price_ascending' ? setOpenTab('price_ascending') : setOpenTab('price_descending')
                                   }}>
                                    СТОИМОСТЬ
                                </span>
                                <ArrowVertical color={openTab === 'price_ascending' || openTab === 'price_descending' ? "#FFA82E" : "#000"}
                                               rotate={openTab === 'price_ascending' ? 180 : 0}
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
                                    {item.order ?
                                        <>
                                            <TableCell>
                                                <div className="flex justify-center items-center">
                                                    Заказ №{item.order}
                                                </div>
                                            </TableCell>
                                            {item.action === 'Consumption' ?
                                                <TableCell>
                                                    <div className="flex justify-center items-center pr-8 text-green-700">
                                                        + {item.price}
                                                    </div>
                                                </TableCell>
                                                :
                                                <TableCell>
                                                    <div className="flex justify-center items-center pr-8 text-red-700">
                                                        - {item.price}
                                                    </div>
                                                </TableCell>
                                            }
                                        </>
                                        :
                                        <>
                                            <TableCell>
                                                <div className="flex justify-center items-center">
                                                    {item.note}
                                                </div>
                                            </TableCell>
                                            {item.action === 'Consumption' ?
                                                <TableCell>
                                                    <div className="flex justify-center items-center pr-8 text-red-700">
                                                        - {item.price}
                                                    </div>
                                                </TableCell>
                                                :
                                                <TableCell>
                                                    <div className="flex justify-center items-center pr-8 text-green-700">
                                                        + {item.price}
                                                    </div>
                                                </TableCell>
                                            }
                                        </>
                                    }

                                </TableRow>
                            );
                        }) : <p className="text-xl text-center mt-8">Данных нет</p>}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                className="pagination-bar justify-center mt-4"
                currentPage={currentPage}
                totalCount={incomes.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>

    )
}
export default IncomeList