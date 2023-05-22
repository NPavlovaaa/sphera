import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {fetchOrders} from "../../orders/orderSlice";
import {fetchCreateReview} from "../reviewsSlice";
import './../reviews.css';
import RatingRender from "../../rating/RatingRender";

const OrderReviewForm = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [reviewCreated, setReviewCreated] = useState(false);

    useEffect(() => {
        dispatch(fetchOrders())
            .then(data => setOrders(data.payload))
    }, [])

    const availableOrders = orders.filter(item => item.status.status_name === 'Получено')

    const onCreateReview = (values) => {
        dispatch(fetchCreateReview({
            'review_text': values.review_text,
            'order': values.order,
            'delivery_assessment': values.delivery_assessment,
            'product_quality_assessment': values.product_quality_assessment
        }))
            .then(() => {
                setReviewCreated(true);
                RatingRender(null, true)
            })
    }

    return (
        <>
            <Formik
                initialValues ={{
                    review_text: '',
                    order: null,
                    product_quality_assessment: 0,
                    delivery_assessment: 0
                }}
                validationSchema={Yup.object({
                    review_text: Yup.string()
                        .min(10, 'Минимум 10 символов для заполнения')
                        .required('Обязательное поле'),
                    order: Yup.number().required(),
                    product_quality_assessment: Yup.number().required('Обязательное поле'),
                    delivery_assessment: Yup.number().required('Обязательное поле')
                })}
                onSubmit = {(values, {resetForm}) => {
                    onCreateReview(values);
                    resetForm();
                }}
            >
                    {reviewCreated ?
                        <div className="flex flex-col justify-center items-center mb-10">
                            <h5 className="text-xl mb-3">Ваш отзыв отправлен!</h5>
                            <button type="submit" onClick={() => setReviewCreated(false)} className="text-sm bg-mainOrange-600 shadow-xl rounded-xl px-5 py-2">Продолжить написание отзывов</button>
                        </div>
                        :
                        <Form method="POST" enctype="multipart/form-data">
                            <label htmlFor="order" className="text-xl font-bold">Оставить отзыв о заказе: </label>
                            <Field as="select" id="order" className="bg-mainWhite shadow-lg rounded-lg py-1.5 px-3" name="order">
                                {availableOrders.map(item => {
                                    return <option value={item.order.order_id}>№{item.order.order_id} от {item.order_date}</option>
                                })}
                            </Field>
                            <div className="flex flex-row mt-5">
                                <div className="flex flex-row items-center mr-10">
                                    <p className="mr-2">Оцените наш магазин</p>
                                    <RatingRender name="product_quality_assessment"/>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="mr-2">Оцените доставку</p>
                                    <RatingRender name="delivery_assessment"/>
                                </div>
                            </div>
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
                    }
            </Formik>
        </>
    )
}

export default OrderReviewForm;

