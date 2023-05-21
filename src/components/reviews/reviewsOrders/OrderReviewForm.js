import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {fetchOrders} from "../../orders/orderSlice";
import {fetchCreateReview} from "../reviewsSlice";


const OrderReviewForm = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        dispatch(fetchOrders()).then(data => setOrders(data.payload))
    }, [])

    const availableOrders = orders.filter(item => item.status.status_name === 'Получено')

    const onCreateReview = (values) => {
        console.log(values)
        dispatch(fetchCreateReview({
            'review_text': values.review_text,
            'order': values.order,
            'delivery_assessment': 5,
            'product_quality_assessment': 5
        }))
    }

    return (
        <>
            <Formik
                initialValues ={{
                    review_text: '',
                    order: null,
                }}
                validationSchema={Yup.object({
                    review_text: Yup.string()
                        .min(10, 'Минимум 10 символов для заполнения')
                })}
                onSubmit = {(values, {resetForm}) => {
                    onCreateReview(values);
                    resetForm();
                }}
            >
                <Form method="POST" enctype="multipart/form-data" >
                    <label htmlFor="order" className="text-xl font-bold">Оставить отзыв о заказе: </label>
                    <Field as="select" id="order" className="bg-mainWhite shadow-lg rounded-lg py-1.5 px-4" name="order">
                        {availableOrders.map(item => {
                            return <option value={item.order.order_id}>№{item.order.order_id} от {item.order_date}</option>
                        })}
                    </Field>
                    <div className="py-5 text-base">
                        <div className="relative bg-mainWhite rounded-lg px-10 pt-6 pb-10">
                            <Field
                                type="text"
                                name="review_text"
                                className="placeholder-transparent h-10 w-full focus:outline-none"
                                id="review_text"
                                placeholder="Оцените заказ, магазин и доставку"
                                autoComplete="off"/>
                        </div>
                        <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '1px', 'font-size' : '14px'}} name="review_text"/>
                        <div className="relative flex mt-5 justify-end">
                            <button type="submit" className="bg-mainOrange-600 shadow-xl rounded-xl px-10 py-3">Отправить отзыв</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default OrderReviewForm;

