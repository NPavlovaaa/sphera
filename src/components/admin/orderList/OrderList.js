import {
    Table, TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import {useDispatch} from "react-redux";
import {SeverityPill} from "../adminPanel/components/severity-pill";
import {useEffect, useState} from "react";
import {fetchOrders} from "../../orders/orderSlice";

const OrderList = () => {
    const statusMap = {
        'active': 'text-red-700 bg-red-100',
        'new': 'text-blue-700 bg-blue-100',
        'created': 'text-blue-700 bg-blue-100',
        'available': 'text-blue-700 bg-blue-100',
        'completed': 'text-green-700 bg-green-100',
        'canceled': 'text-gray-700 bg-gray-100'
    };

    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchOrders()).then(data => setOrders(data.payload))
    }, [])

    function byField(field) {
        return (a, b) => a[field] < b[field] ? 1 : -1;
    }

    const sorted_orders = orders.sort(byField('order_date')).slice(0, 8)

    return (
        <div className="rounded-2xl shadow-sm bg-mainWhite w-full">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <span className="font-semibold ">Заказ</span>
                        </TableCell>
                        <TableCell>
                            <span className="flex font-semibold justify-center">Получатель</span>
                        </TableCell>
                        <TableCell>
                            <span className="flex font-semibold justify-center">Дата</span>
                        </TableCell>
                        <TableCell>
                            <span className="flex font-semibold justify-center">Сумма заказа</span>
                        </TableCell>
                        <TableCell>
                            <span className="flex font-semibold justify-center">Статус</span>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sorted_orders ? sorted_orders.map(item => {
                        return (
                            <TableRow
                                hover
                                key={item.order.order_id}
                            >
                                <TableCell>
                                    <div className="justify-center items-center ml-3">
                                        #{item.order.order_id}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center items-center">
                                        {item.client.first_name} {item.client.last_name}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center items-center">
                                        {item.order_date}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center items-center">
                                        {item.order.order_sum} р
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center items-center">
                                        <SeverityPill className={statusMap[item.status.status_id]}>
                                            {item.status.status_name}
                                        </SeverityPill>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <button className="flex justify-center items-center bg-red-100 px-3 py-2 rounded-2xl"
                                        // onClick={() => dispatch(fetchDeleteProduct(item.product_id))}
                                    >
                                        <TrashIcon width="16" color="#EC5859"/>
                                    </button>
                                </TableCell>
                            </TableRow>
                        );
                    }) : null}
                </TableBody>
            </Table>
        </div>
    )

}

export default OrderList;