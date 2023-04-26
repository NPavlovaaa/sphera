import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {useRegistrationMutation} from "../../api/apiSlice";
import Arrow from "../icons/Arrow";
import { useState } from 'react';

const RegistrationForm = ({onToggle}) => {
    const [image, setFieldValue] = useState();
    const [registration, {isError}] = useRegistrationMutation();
    const addUser = ({username, password, first_name, last_name, phone, birthday}) => {
        let newUser = new FormData();
        newUser.append('user_id',  uuidv4())
        newUser.append('username', username)
        newUser.append('password', password)
        newUser.append('first_name', first_name)
        newUser.append('last_name', last_name)
        newUser.append('phone', phone)
        newUser.append('birthday', birthday)
        newUser.append('avatar', image ? image : null)

        registration(newUser)
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    return (
        <>
            <div className="flex justify-end m-7">
                <button className="text-base font-normal" onClick={onToggle}>Уже есть аккаунт</button>
                <div className="flex justify-center items-center ml-2">
                    <Arrow/>
                </div>
            </div>
            {isError ? console.log(isError) : null}
            <Formik
                initialValues ={{
                    username: '',
                    password: '',
                    first_name: '',
                    last_name: '',
                    phone: '',
                    birthday: '',
                    avatar: ''
                }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .email('Неверный формат email').required('Required')
                        .required('Обязательное поле!'),
                    password: Yup.string()
                        .min(2, 'Минимум 5 символов для заполнения')
                        .required('Обязательное поле!'),
                    first_name: Yup.string()
                        .min(2, 'Минимум 2 символа для заполнения')
                        .required('Обязательное поле!'),
                    last_name: Yup.string()
                        .min(2, 'Минимум 2 символа для заполнения')
                        .required('Обязательное поле!'),
                    phone: Yup.string()
                        .matches(phoneRegExp, 'Неверный формат номера')
                        .required('Обязательное поле!'),
                })}

                onSubmit = {(values, {resetForm}) => {
                    addUser(values);
                    resetForm();
                }
            }
            >
                <div className="z-30 py-6 flex justify-center sm:py-12 sm:max-w-xl sm:mx-auto md:px-28 lg:px-32 xl:px-48 2xl:px-48">
                    <div className="relative py-3 w-2/3">
                        <div
                            className="absolute inset-0 shadow-lg rounded-3xl bg-gradient-to-r from-mainOrange-100 to-mainOrange-600 transform -rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative bg-mainWhite shadow-2xl sm:rounded-3xl p-20 rounded-3xl">
                            <div className="mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">Регистрация</h1>
                                </div>
                                <Form method="POST" enctype="multipart/form-data">
                                    <div className="py-3 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 flex flex-row justify-between">
                                        <div className="relative w-1/2 mr-10 mt-4">
                                            <div  className="relative">
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 focus:outline-none focus:borer-rose-600"
                                                    id="username"
                                                    placeholder="Укажите вашу почту"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="username"/>
                                            </div>
                                            <div className="relative">
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 focus:outline-none focus:borer-rose-600"
                                                    id="password"
                                                    placeholder="Придумайте пароль"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="password"/>
                                            </div>
                                            <div className="relative top-8">
                                                <label htmlFor="avatar"
                                                       className="absolute left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                    Фото профиля</label>
                                                <div className="rounded-md bg-bgMainWhite p-2 shadow-xl">
                                                    <label htmlFor="avatar"
                                                           className="flex flex-col items-center gap-2 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className="h-10 w-10 fill-mainWhite stroke-mainOrange-600"
                                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                        </svg>
                                                        <span className="text-sm">Загрузить фото</span>
                                                    </label>
                                                    <input
                                                    type="file"
                                                    name="avatar"
                                                    id="avatar"
                                                    className="hidden"
                                                    onChange={(event) => {
                                                        setFieldValue(event.currentTarget.files[0]);
                                                      }}
                                                    />
                                                </div>
                                                <span>{image ? image.name : null}</span>
                                            </div>
                                        </div>
                                        <div className="relative w-1/2">
                                            <div className="relative">
                                                <Field
                                                    type="text"
                                                    name="first_name"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 focus:outline-none focus:borer-rose-600"
                                                    id="first_name"
                                                    placeholder="Введите ваше имя"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="first_name"/>
                                            </div>
                                            <div className="relative">
                                                <Field
                                                    type="text"
                                                    name="last_name"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 focus:outline-none focus:borer-rose-600"
                                                    id="last_name"
                                                    placeholder="Введите вашу фамилию"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="last_name"/>
                                            </div>
                                            <div className="relative">
                                                <Field
                                                    type="phone"
                                                    name="phone"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 focus:outline-none focus:borer-rose-600"
                                                    id="phone"
                                                    placeholder="Введите номер телефона"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="phone"/>
                                            </div>
                                            <div className="relative top-6 mt-2">
                                                <label htmlFor="birthday"
                                                       className="absolute left-0 -top-5 text-gray-600 text-sm">
                                                    Дата рождения</label>
                                                <Field
                                                    type="date"
                                                    name="birthday"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 focus:outline-none focus:borer-rose-600"
                                                    id="birthday"
                                                    placeholder="Введите вашу дату рождения"
                                                    autoComplete="off"/>
                                            </div>
                                        </div>
                                        </div>
                                    <div className="relative flex top-14">
                                        <button type="submit" className="bg-mainOrange-600 shadow-xl rounded-xl px-4 py-3">Зарегистрироваться</button>
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

export default RegistrationForm;