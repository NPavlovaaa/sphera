import AvatarDetail from "../icons/AvatarDetail";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {activeUserChange} from "../../api/userSlice";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import PhoneInput from 'react-phone-input-2'
import {useState} from "react";
import 'react-dadata/dist/react-dadata.css';

const ClientInfo = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const activeUser = useSelector(state => state.authUser.user);
    const dispatch = useDispatch();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [username, setUsername] = useState('');
    // const [password, setPass] = useState('');

    const logout = async () => {
        localStorage.removeItem('TOKEN_AUTH');
        dispatch(activeUserChange(null))
    }

    return(
        <>
            <div className="grid grid-cols-3 gap-10 w-full">
                <div className="">
                    <div className="flex flex-col h-fit col-span-1 shadow-md rounded-xl justify-center items-center border-t border-lightGray bg-mainWhite">
                        <div className="flex flex-col items-center justify-center w-full py-8">
                            {activeUser.avatar ?
                                <div className="flex justify-center">
                                    <div className="h-24 w-24">
                                        <img src={activeUser.avatar} className="rounded-full avatar" alt="фотография пользователя"/>
                                    </div>
                                </div>
                                :
                                <AvatarDetail/>
                            }
                            <p className="text-2xl mt-3 font-semibold">{activeClient.first_name} {activeClient.last_name}</p>
                            <div className="flex items-center mt-2">
                                <MapPinIcon width="20" color='#939393'/>
                                <p className="ml-2 text-lg text-mainGray mt-0.5">Москва</p>
                            </div>
                        </div>
                        <div className="flex border-t border-darkLightGray w-full justify-center items-center w-full px-2 py-2">
                            <label htmlFor="avatar" className="label rounded-xl py-2 w-full text-mainOrange-600 font-semibold">Загрузить фотографию</label>
                            <input id="avatar" type="file" className="my"/>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-10">
                        <Link to="/">
                            <button type="submit" className=" w-full bg-mainOrange-100 text-mainOrange-600 hover:bg-mainOrange-200 px-10 py-2 rounded-xl" onClick={logout}>Выйти</button>
                        </Link>
                    </div>
                </div>
                <div className="col-span-2 shadow-md rounded-xl justify-center items-center border-lightGray border-t pt-10">
                    <p className="text-lg px-8 mt-2 font-semibold">Профиль</p>
                    <p className="text-sm px-8 mt-1.5 text-mainGray">Информация может быть отредактирована</p>
                    <form method="POST">
                        <div className="py-10 px-8">
                            <div className="flex">
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="Имя"
                                    onChange={(e) => {
                                        // setProductName(e.target.value)
                                    }}
                                    // value={product_name}
                                    defaultValue={activeClient.first_name}
                                    className="mr-5 border border-darkLightGray rounded-xl px-5 py-3 placeholder-transparent w-full focus:outline-none focus:borer-rose-600"
                                    id="first_name"
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Фамилия"
                                    onChange={(e) => {
                                        // setProductName(e.target.value)
                                    }}
                                    // value={product_name}
                                    defaultValue={activeClient.last_name}
                                    className="border border-darkLightGray rounded-xl px-5 py-2 placeholder-transparent w-full focus:outline-none focus:borer-rose-600"
                                    id="last_name"
                                />
                            </div>
                            <div className="flex mt-6">
                                <PhoneInput
                                    disableDropdown="true"
                                    specialLabel={''}
                                    country={'ru'}
                                    placeholder="+7 (999) 999-99-99"
                                    value={activeClient.phone}
                                    className="border border-darkLightGray rounded-xl px-5 py-3 placeholder-transparent w-full focus:outline-none focus:borer-rose-600"
                                />
                                <input
                                    type="date"
                                    name="birthday"
                                    onChange={(e) => {
                                        // setProductName(e.target.value)
                                    }}
                                    // value={product_name}
                                    defaultValue={activeClient.birthday}
                                    className="ml-5 border border-darkLightGray rounded-xl px-5 py-3 placeholder-transparent w-full focus:outline-none focus:borer-rose-600"
                                    id="birthday"
                                />
                            </div>
                            <div className="flex mt-6">
                                <input
                                    type="email"
                                    name="username"
                                    placeholder="Логин"
                                    onChange={(e) => {
                                        // setProductName(e.target.value)
                                    }}
                                    // value={product_name}
                                    defaultValue={activeUser.username}
                                    className="mr-5 border border-darkLightGray rounded-xl px-5 py-3 placeholder-transparent w-full focus:outline-none focus:borer-rose-600"
                                    id="username"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Пароль"
                                    onChange={(e) => {
                                        // setProductName(e.target.value)
                                    }}
                                    // value={product_name}
                                    className="border border-darkLightGray rounded-xl px-5 py-2 placeholder-transparent w-full focus:outline-none focus:borer-rose-600"
                                    id="password"
                                />
                            </div>
                        </div>
                        <div className="flex border-t border-darkLightGray w-full justify-end items-end w-full px-5 py-2 items-center">
                            <button className="text-mainWhite bg-mainOrange-600 rounded-xl px-6 py-2"
                                    type="submit"
                            >Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
            {/*<div className="flex flex-col w-1/2 pb-5">*/}
            {/*    <div className="flex flex-row items-center mb-5">*/}
            {/*        {activeUser.avatar ?*/}
            {/*            <div className="h-16 w-16">*/}
            {/*                <img src={activeUser.avatar} className="rounded-xl avatar" alt="фотография пользователя"/>*/}
            {/*            </div>*/}
            {/*            :*/}
            {/*            <AvatarDetail/>*/}
            {/*        }*/}
            {/*        <p className="text-xl ml-2 font-semibold">{activeClient.first_name} {activeClient.last_name}</p>*/}
            {/*    </div>*/}
            {/*    <div className="flex flex-row items-center">*/}
            {/*        <Phone/>*/}
            {/*        <p className="ml-3">{activeClient.phone}</p>*/}
            {/*    </div>*/}
            {/*    <div className="flex flex-row items-center mt-3">*/}
            {/*        <Mail/>*/}
            {/*        <p className="ml-3">{activeUser.username}</p>*/}
            {/*    </div>*/}
            {/*    <div className="flex flex-row items-center mt-3">*/}
            {/*        <Calendar/>*/}
            {/*        <p className="ml-3">{activeClient.birthday}</p>*/}
            {/*    </div>*/}
            {/*    <div className="flex mt-3">*/}
            {/*        <Link to="/">*/}
            {/*            <button type="submit" className="text-mainGray hover:text-mainOrange-600" onClick={logout}>Выйти</button>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="flex items-start w-1/2 justify-end">*/}
            {/*    <button type="submit" className="flex flex-row items-center bg-mainOrange-600 shadow-lg rounded-2xl px-5 py-1.5">*/}
            {/*        Редактировать*/}
            {/*        <div className="ml-2">*/}
            {/*            <Pen/>*/}
            {/*        </div>*/}
            {/*    </button>*/}
            {/*</div>*/}
        </>
    )

}
export default ClientInfo;