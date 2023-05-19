import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchChangeOrderStatus, fetchStatuses} from "../orders/orderSlice";
import { Formik, Form, Field} from 'formik';


const ModalWindow = ({order}) => {
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const dispatch = useDispatch();
    const statuses = useSelector(state => state.getOrders.statuses);

    useEffect(() => {
        dispatch(fetchStatuses())
    }, [])


    const changeStatus = ({status, date}) =>{
        console.log(date)
        dispatch(fetchChangeOrderStatus({
            'id': order.order_id,
            'status': status,
            'delivery_date': date,
            'order_sum': order.order_sum,
            'delivery': order.delivery,
            'address': order.address,
        })).then(setAlert(true))
    }

    const sucAlert = () => {
        return(
            <div className="bg-green-100 border-t-4 rounded-b px-4 py-3 shadow-md mb-5" role="alert" >
                <div className="flex items-center">
                    <div className="py-1">
                        <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20">
                            <path
                                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold">Данные успешно изменены!</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <button type="submit"
                    className="flex py-1.5 px-5 bg-mainOrange-600 justify-center rounded-lg w-fit text-sm mt-5 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(true)}>
                Изменить статус или ожидаемую дату
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-2xl">
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-mainWhite outline-none focus:outline-none">
                                {alert ? sucAlert() : null}
                                <div className="flex items-start justify-between items-center px-10 py-8 rounded-t">
                                    <h3 className="text-lg font-semibold mr-6">
                                        Изменение статуса заказа или ожидаемой даты доставки
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => {
                                            setShowModal(false)
                                            setAlert(false)
                                        }}>
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                                    </button>
                                </div>
                                <Formik
                                    initialValues={{
                                        status: order.status,
                                        date: order.delivery_date
                                    }}
                                    onSubmit = {(values) => {
                                        changeStatus(values);
                                    }}
                                >
                                <Form method="POST" enctype="multipart/form-data" className="flex flex-col px-10">
                                    <div className="flex flex-row items-center">
                                        <label for="status" className="text-base text-mainGray mr-3">Текущий статус заказа: </label>
                                        <Field as="select" id="status" className="bg-lightGray rounded-lg py-2 px-4" name="status" defaultValue={order.status}>
                                            {statuses ? statuses.map(item => {
                                                return <option value={item.status_id}>{item.status_name}</option>
                                            })
                                            : null}
                                        </Field>
                                    </div>
                                    <div className="flex flex-row items-center mt-5">
                                        <label htmlFor="date" className="text-base text-mainGray mr-3">Ожидаемая дата доставки: </label>
                                        <Field type="date" id="date" className="bg-lightGray rounded-lg py-2 px-4" name="date" defaultValue={order.delivery_date}/>
                                    </div>
                                    <div className="flex items-center justify-end p-6 rounded-b">
                                        <button
                                            className="bg-mainOrange-600 font-medium text-base font-semibold uppercase text-sm px-6 py-3 rounded-xl shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1"
                                            type="submit">
                                            Сохранить
                                        </button>
                                    </div>
                                </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
export default ModalWindow;