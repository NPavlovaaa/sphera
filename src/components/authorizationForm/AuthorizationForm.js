import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Arrow from '../icons/Arrow';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {fetchLogin} from "../../api/userSlice";
import {useDispatch} from "react-redux";


const AuthorizationForm = ({onToggle, setUser}) => {
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
                <button className="text-xl font-semibold" onClick={onToggle}>Регистрация</button>
                <div className="inline-block align-middle">
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
                <div className="min-h-screen py-3 flex flex-col sm:py-12">
                    <div className="relative py-5 sm:max-w-xl sm:mx-auto">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-bgMainOrange-100 to-bgMainOrange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative px-4 py-10 bg-bgMainWhite shadow-lg sm:rounded-3xl sm:p-20">
                            <div className="max-w-md mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">Авторизация пользователя</h1>
                                </div>
                                <Form>
                                    <div className="divide-y divide-gray-200">
                                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                            <div className="relative">
                                                <label htmlFor="username" className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Логин</label>
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="username"
                                                    placeholder="Укажите вашу почту"
                                                    autoComplete="off"/>
                                            </div>
                                            <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '1px', 'font-size' : '14px'}} name="username"/>
                                            <div className="relative top-2">
                                                <label htmlFor="password"
                                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Пароль</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="password"
                                                    placeholder="Введите пароль"
                                                    autoComplete="off"/>
                                            </div>
                                            <div className="relative flex top-14 justify-center">
                                                <button type="submit" className="bg-bgMainOrange-600 text-white rounded-md px-3 py-2">Войти</button>
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

