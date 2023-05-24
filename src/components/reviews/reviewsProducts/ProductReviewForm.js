import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {useState} from "react";
import {fetchCreateReviewProduct} from "../reviewsSlice";
import './../reviews.css';
import RatingRender from "../../rating/RatingRender";

const ProductReviewForm = ({availableCarts}) => {
    const dispatch = useDispatch();
    const [reviewCreated, setReviewCreated] = useState(false);

    const onCreateReview = (values) => {
        dispatch(fetchCreateReviewProduct({
            'review_text': values.review_text,
            'product': values.product,
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
                    product: availableCarts[0].product.product_id,
                    product_quality_assessment: 0,
                }}
                validationSchema={Yup.object({
                    review_text: Yup.string()
                        .min(10, 'Минимум 10 символов для заполнения')
                        .required('Обязательное поле'),
                    product_quality_assessment: Yup.number().required('Обязательное поле'),
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
                            <div className="flex flex-row mt-5">
                                <div className="flex flex-row items-center mr-10">
                                    <p className="mr-2">Оцените кофе</p>
                                    <p className="mr-2 font-semibold">{availableCarts[0].product.product_name}</p>
                                    <RatingRender name="product_quality_assessment"/>
                                </div>
                            </div>
                            <div className="py-5 text-base">
                                <div className="relative bg-mainWhite rounded-lg px-10 pt-6 pb-10">
                                    <Field
                                        type="text"
                                        name="review_text"
                                        className="placeholder-transparent h-10 w-full focus:outline-none"
                                        id="review_text"
                                        placeholder="Напишите отзыв о кофе"
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

export default ProductReviewForm;

