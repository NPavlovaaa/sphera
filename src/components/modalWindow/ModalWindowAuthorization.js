import {useState} from "react";
import {useDispatch} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import {fetchLogin} from "../../api/userSlice";


const ModalWindowAuthorization = ({isShowModal, addToCart}) => {
    const [showModal, setShowModal] = useState(isShowModal);
    const dispatch = useDispatch();

    const onLogin = (values) => {
        dispatch(fetchLogin({
            'username': values.username,
            'password': values.password
        }))
            .then(data => {
                localStorage.setItem('TOKEN_AUTH', data.payload.access);
            })
            .then(setShowModal(false))
    }

    return (
        <>
            {showModal ?
            <>
            <Formik
                initialValues ={{
                    username: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .email('Неверный формат email').required('Required')
                        .required('Обязательное поле!'),
                    password: Yup.string()
                        .min(2, 'Минимум 5 символов для заполнения')
                        .required('Обязательное поле!'),
                })}

                onSubmit = {(values, {resetForm}) => {
                    onLogin(values);
                    resetForm();
                }}
            >

                <div className="h-full fixed inset-0 z-50 mt-12 flex justify-center items-center">
                    <div className="relative py-3 w-2/5 lg:w-2/5 md:w-2/5 xl:w-1/3 2xl:w-1/3">
                        <div
                            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-mainOrange-100 to-mainOrange-600 shadow-2xl transform -rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative bg-mainWhite shadow-lg sm:rounded-3xl px-20 py-16 rounded-3xl">
                            <div className="mx-auto">
                                <button
                                    className="items-end flex ml-auto bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => {
                                        setShowModal(false)
                                        addToCart(false)
                                    }}>
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                                </button>
                                <div>
                                    <h1 className="text-2xl font-semibold">Необходимо войти в систему</h1>
                                </div>
                                <Form method="POST">
                                    <div className="divide-y divide-gray-200">
                                        <div className="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                                            <div className="relative">
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    className="placeholder-transparent h-10 w-full border-b-2 focus:outline-none focus:borer-rose-600"
                                                    id="username"
                                                    placeholder="Укажите вашу почту"
                                                    autoComplete="off"/>
                                            </div>
                                            <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '1px', 'font-size' : '14px'}} name="username"/>
                                            <div className="relative">
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 focus:outline-none focus:borer-rose-600"
                                                    id="password"
                                                    placeholder="Введите пароль"
                                                    autoComplete="off"/>
                                            </div>
                                            <div className="relative flex top-10 justify-center">
                                                <button type="submit" className="bg-mainOrange-600 shadow-xl rounded-xl px-10 py-3">Войти</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Formik>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
                : null}

        </>
    )
}
export default ModalWindowAuthorization;