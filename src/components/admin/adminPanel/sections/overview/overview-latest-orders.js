import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  CardActions,
  CardHeader,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

import {useEffect, useState} from "react";
import {fetchOrders} from "../../../../orders/orderSlice";
import {useDispatch} from "react-redux";
import "./simplebar.min.css";
import {SeverityPill} from "../../components/severity-pill";

const statusMap = {
  'active': 'text-red-700 bg-red-100',
  'new': 'text-blue-700 bg-blue-100',
  'created': 'text-blue-700 bg-blue-100',
  'available': 'text-blue-700 bg-blue-100',
  'completed': 'text-green-700 bg-green-100',
  'canceled': 'text-gray-700 bg-gray-100'
};

export const OverviewLatestOrders = ({changeTab}) => {
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
        <CardHeader title="Последние заказы" />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="">ЗАКАЗ</span>
                </TableCell>
                <TableCell>
                  <span className="flex justify-center">ПОЛУЧАТЕЛЬ</span>
                </TableCell>
                <TableCell>
                  <span className="flex justify-center">ДАТА</span>
                </TableCell>
                <TableCell>
                  <span className="flex justify-center">СУММА ЗАКАЗА</span>
                </TableCell>
                <TableCell>
                  <span className="flex justify-center">СТАТУС</span>
                </TableCell>
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
                  </TableRow>
                );
              }) : null}
            </TableBody>
          </Table>
      <CardActions className="flex justify-end">
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          onClick={() => changeTab('AdminOrders')}
        >
          Перейти
        </Button>
      </CardActions>
    </div>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
