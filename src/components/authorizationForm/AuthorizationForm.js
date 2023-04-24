import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Arrow from '../icons/Arrow';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {fetchLogin} from "../../api/userSlice";
import {useDispatch} from "react-redux";


const AuthorizationForm = ({onToggle}) => {
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();

    const onLogin = (values) => {
        dispatch(fetchLogin(values))
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <div className="flex justify-end m-7">
                <button className="text-base font-normal" onClick={onToggle}>Регистрация</button>
                <div className="flex justify-center items-center ml-2">
                    <Arrow/>
                </div>
            </div>
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
                }
            }
            >
                <div className="z-30 py-6 flex justify-center sm:py-12 sm:max-w-xl sm:mx-auto">
                    <div className="relative py-3 w-2/5 lg:w-2/5 md:w-2/5 xl:w-1/3 2xl:w-1/3">
                        <div
                            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-mainOrange-100 to-mainOrange-600 shadow-2xl transform -rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative bg-mainWhite shadow-lg sm:rounded-3xl p-20 rounded-3xl">
                            <div className="mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">Авторизация</h1>
                                </div>
                                <Form>
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
        </>

    )
}

export default AuthorizationForm;

