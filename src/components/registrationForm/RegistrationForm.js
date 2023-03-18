import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {useCreateClientMutation, useCreateUserMutation} from "../../api/apiSlice";
import Arrow from "../icons/Arrow";


const RegistrationForm = ({onToggle}) => {
    const [createUser] = useCreateUserMutation();
    const [createClient, {isError}] = useCreateClientMutation();

    const addUser = ({username, password, first_name, last_name, phone, birthday, avatar}) => {
        const newUser = {
            user_id: uuidv4(),
            username,
            password
        }
        createUser(newUser);

        setTimeout(() => {
            const newClient = {
                first_name,
                last_name,
                phone,
                birthday,
                avatar,
                scores: 0,
                level: 1,
                user: newUser.user_id
            }

            createClient(newClient);

        }, 1000);
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
            {isError ? "Ошибка" : null}
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
                            className="absolute inset-0 shadow-lg rounded-3xl bg-gradient-to-r from-bgMainOrange-100 to-bgMainOrange-600 shadow-lg transform -rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative bg-bgMainWhite shadow-2xl sm:rounded-3xl p-20 rounded-3xl">
                            <div className="mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">Регистрация</h1>
                                </div>
                                <Form>
                                    <div className="py-3 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 flex flex-row justify-between">
                                        <div className="relative w-1/2 mr-10 mt-4">
                                            <div  className="relative">
                                                <label htmlFor="username"
                                                       className="left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Почта</label>
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="username"
                                                    placeholder="Укажите вашу почту"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="username"/>
                                            </div>
                                            <div className="relative top-6">
                                                <label htmlFor="password"
                                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Пароль</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="password"
                                                    placeholder="Придумайте пароль"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="password"/>
                                            </div>
                                            <div className="relative top-14">
                                                <label htmlFor="avatar"
                                                       className="absolute left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                    Фото профиля (Необязательно)</label>
                                                <div className="rounded-md bg-bgMainWhite p-2 shadow-xl">
                                                    <label htmlFor="avatar"
                                                           className="flex flex-col items-center gap-2 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className="h-10 w-10 fill-bgMainWhite stroke-bgMainOrange-600"
                                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                        </svg>
                                                        <span className="text-gray-600 text-sm">Загрузить фото</span>
                                                    </label>
                                                    <input id="avatar" type="file" className="hidden"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative w-1/2">
                                            <div className="relative">
                                                <label htmlFor="first_name"
                                                       className="left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                    Имя</label>
                                                <Field
                                                    type="text"
                                                    name="first_name"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="first_name"
                                                    placeholder="Введите ваше имя"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="first_name"/>
                                            </div>
                                            <div className="relative top-6">
                                                <label htmlFor="last_name"
                                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                    Фамилия</label>
                                                <Field
                                                    type="text"
                                                    name="last_name"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="last_name"
                                                    placeholder="Введите вашу фамилию"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="last_name"/>
                                            </div>
                                            <div className="relative top-12">
                                                <label htmlFor="phone"
                                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                    Номер телефона</label>
                                                <Field
                                                    type="phone"
                                                    name="phone"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="phone"
                                                    placeholder="Введите номер телефона"
                                                    autoComplete="off"/>
                                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="phone"/>
                                            </div>
                                            <div className="relative top-16 mt-2">
                                                <label htmlFor="birthday"
                                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                    Дата рождения</label>
                                                <Field
                                                    type="date"
                                                    name="birthday"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="birthday"
                                                    placeholder="Введите вашу дату рождения"
                                                    autoComplete="off"/>
                                            </div>
                                        </div>
                                        </div>
                                    <div className="relative flex top-14">
                                        <button type="submit" className="bg-bgMainOrange-600 shadow-xl rounded-xl px-4 py-3">Зарегистрироваться</button>
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


{/*<div className="z-10 min-h-screen py-3 flex flex-col sm:py-12 xl:max-w-sm md:max-w-sm">*/}
{/*    <div className="relative py-5  md:max-w-sm sm:max-w-xl sm:mx-auto">*/}
{/*        <div*/}
{/*            className="absolute inset-0 bg-gradient-to-r from-bgMainOrange-100 to-bgMainOrange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">*/}
{/*        </div>*/}
{/*        <div className="relative px-4 py-5 bg-bgMainWhite shadow-lg sm:rounded-3xl sm:p-20">*/}
{/*            <div className="mx-auto">*/}
{/*                <div>*/}
{/*                    <h1 className="text-2xl font-semibold">Регистрация нового пользователя</h1>*/}
{/*                </div>*/}
{/*                <Form>*/}
{/*                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">*/}
{/*                            <div className="relative">*/}
{/*                                <label htmlFor="username" className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Логин</label>*/}
{/*                                <Field*/}
{/*                                    type="text"*/}
{/*                                    name="username"*/}
{/*                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"*/}
{/*                                    id="username"*/}
{/*                                    placeholder="Укажите вашу почту"*/}
{/*                                    autoComplete="off"/>*/}
{/*                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="username"/>*/}
{/*                            </div>*/}
{/*                            <div className="relative top-2">*/}
{/*                                <label htmlFor="password"*/}
{/*                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Пароль</label>*/}
{/*                                <Field*/}
{/*                                    type="password"*/}
{/*                                    name="password"*/}
{/*                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"*/}
{/*                                    id="password"*/}
{/*                                    placeholder="Придумайте пароль"*/}
{/*                                    autoComplete="off"/>*/}
{/*                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="password"/>*/}
{/*                            </div>*/}
{/*                            <div className="relative top-4">*/}
{/*                                <label htmlFor="first_name"*/}
{/*                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">*/}
{/*                                    Имя</label>*/}
{/*                                <Field*/}
{/*                                    type="text"*/}
{/*                                    name="first_name"*/}
{/*                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"*/}
{/*                                    id="first_name"*/}
{/*                                    placeholder="Введите ваше имя"*/}
{/*                                    autoComplete="off"/>*/}
{/*                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="first_name"/>*/}
{/*                            </div>*/}
{/*                            <div className="relative top-6">*/}
{/*                                <label htmlFor="last_name"*/}
{/*                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">*/}
{/*                                    Фамилия</label>*/}
{/*                                <Field*/}
{/*                                    type="text"*/}
{/*                                    name="last_name"*/}
{/*                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"*/}
{/*                                    id="last_name"*/}
{/*                                    placeholder="Введите вашу фамилию"*/}
{/*                                    autoComplete="off"/>*/}
{/*                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="last_name"/>*/}
{/*                            </div>*/}
{/*                            <div className="relative top-8">*/}
{/*                                <label htmlFor="phone"*/}
{/*                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">*/}
{/*                                    Номер телефона</label>*/}
{/*                                <Field*/}
{/*                                    type="phone"*/}
{/*                                    name="phone"*/}
{/*                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"*/}
{/*                                    id="phone"*/}
{/*                                    placeholder="Введите номер телефона"*/}
{/*                                    autoComplete="off"/>*/}
{/*                                <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '2px', 'font-size' : '14px'}} name="phone"/>*/}
{/*                            </div>*/}
{/*                            <div className="relative top-10">*/}
{/*                                <label htmlFor="birthday"*/}
{/*                                       className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">*/}
{/*                                    Дата рождения</label>*/}
{/*                                <Field*/}
{/*                                    type="date"*/}
{/*                                    name="birthday"*/}
{/*                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"*/}
{/*                                    id="birthday"*/}
{/*                                    placeholder="Введите вашу дату рождения"*/}
{/*                                    autoComplete="off"/>*/}
{/*                            </div>*/}
{/*                            <ErrorMessage component="div" style={{'color': 'red', 'margin-top': '35px', 'font-size' : '14px'}} name="birthday"/>*/}
{/*                            <div className="relative top-14">*/}
{/*                                <label htmlFor="avatar"*/}
{/*                                       className="absolute left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">*/}
{/*                                    Фото профиля (Необязательно)</label>*/}
{/*                                    <div className="rounded-md bg-bgMainWhite p-2 shadow-xl">*/}
{/*                                        <label htmlFor="avatar"*/}
{/*                                               className="flex flex-col items-center gap-2 cursor-pointer">*/}
{/*                                            <svg xmlns="http://www.w3.org/2000/svg"*/}
{/*                                                 className="h-10 w-10 fill-bgMainWhite stroke-bgMainOrange-600"*/}
{/*                                                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">*/}
{/*                                                <path stroke-linecap="round" stroke-linejoin="round"*/}
{/*                                                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>*/}
{/*                                            </svg>*/}
{/*                                            <span className="text-gray-600 text-sm">Загрузить фото</span>*/}
{/*                                        </label>*/}
{/*                                        <input id="avatar" type="file" className="hidden"/>*/}
{/*                                </div>*/}
{/*                            </div>*/}
{/*                            <div className="relative flex top-14 justify-center">*/}
{/*                                <button type="submit" className="bg-bgMainOrange-600 text-white rounded-md px-3 py-2">Зарегистрироваться</button>*/}
{/*                            </div>*/}
{/*                        </div>*/}
{/*                    </Form>*/}
{/*                </div>*/}
{/*            </div>*/}
{/*        </div>*/}
{/*    </div>*/}
