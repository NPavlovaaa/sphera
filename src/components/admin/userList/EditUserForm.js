import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useGetRolesQuery} from "../../../api/apiSlice";
import {Avatar} from "@mui/material";


const EditUserForm = () => {
    const {activeEditUser} = useSelector(state => state.authUser)

    const dispatch = useDispatch();
    const [product_name, setProductName] = useState('');
    const {data: roles = []} = useGetRolesQuery();

    // useEffect(() => {
    //         dispatch(fetchRoastingMethods())
    //         dispatch(fetchCategory())
    //         dispatch(fetchProcessingMethods())
    // }, [activeEditProduct])


    const onEditProduct = (e) => {
        e.preventDefault();
        console.log(product_name)
    //     dispatch(fetchCreateIncomeChange({
    //         'note': values.note,
    //         'price': values.price,
    //         // 'action': action,
    //     }))
    }
    console.log(activeEditUser)


    return (
        <>
            <div className="h-full flex flex-col mt-5 items-center">
                <h1 className="text-xl font-semibold">Изменение пользователя</h1>
                <form onSubmit={onEditProduct} method="POST">
                    <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Имя"
                                    onChange={(e) => {
                                        setProductName(e.target.value)
                                    }}
                                    // value={product_name}
                                    defaultValue={activeEditUser ? activeEditUser.username : null}
                                    className="bg-lightGray rounded-xl px-5 py-2 placeholder-transparent h-10 w-full focus:outline-none focus:borer-rose-600"
                                    id="username"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="Имя"
                                    onChange={(e) => {
                                        setProductName(e.target.value)
                                    }}
                                    // value={product_name}
                                    defaultValue={activeEditUser ? activeEditUser.first_name : null}
                                    className="bg-lightGray rounded-xl px-5 py-2 placeholder-transparent h-10 w-full focus:outline-none focus:borer-rose-600"
                                    id="first_name"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Фамилия"
                                    onChange={(e) => {
                                        setProductName(e.target.value)
                                    }}
                                    // value={product_name}
                                    defaultValue={activeEditUser ? activeEditUser.last_name : null}
                                    className="bg-lightGray rounded-xl px-5 py-2 placeholder-transparent h-10 w-full focus:outline-none focus:borer-rose-600"
                                    id="last_name"
                                />
                            </div>
                            <div className="relative">
                                <select id="role" value={activeEditUser ? activeEditUser.role : null} className="bg-lightGray rounded-xl px-5 py-2 placeholder-transparent h-10 w-full focus:outline-none focus:borer-rose-600" name="processing">
                                    {activeEditUser ?
                                        roles.map(item => {
                                            return <option value={item.role_id}>{item.role_name}</option>
                                        })
                                        :
                                        <option value="" className="disabled selected hidden">Роль</option>
                                    }
                                </select>
                            </div>
                            <div className="relative flex items-center justify-center">
                                <Avatar src={activeEditUser ? activeEditUser.avatar : null} sx={{ width: 56, height: 56 }}/>
                                <p className="text-red-700 ml-4">Удалить</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex justify-center">
                        <button className="bg-mainOrange-600 drop-shadow-md rounded-xl px-10 py-2"
                                type="submit"
                        >Сохранить</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditUserForm;