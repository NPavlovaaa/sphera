import {useGetUsersQuery} from "../../../api/apiSlice";
import {
    Avatar,
    Box,
    Stack,
    Table, TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Pen from "../../icons/Pen";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import LockOpenIcon from "@heroicons/react/24/solid/LockOpenIcon";
import {activeEditUserChange} from "../../../api/userSlice";
import {useDispatch} from "react-redux";

const UserList = () => {
    const {
        data: users = [],
        isLoading,
        isError
    } = useGetUsersQuery();
    const dispatch = useDispatch();


    if (isLoading) {
        return <h5 className="text-center mt-5">Загрузка</h5>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }


    return (
        <div className="rounded-2xl bg-mainWhite w-full text-base border-2 border-r border-lightGray ">
            <div className="rounded-2xl w-full">
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <span className="font-semibold">Пользователь</span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-semibold flex justify-center">Логин</span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-semibold flex justify-center">Дата регистрации</span>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((customer) => {
                                return (
                                    <TableRow
                                        hover
                                        key={customer.id}
                                    >
                                        <TableCell>
                                            <Stack
                                                direction="column"
                                                spacing={5}
                                            >
                                                <div className="flex items-center">
                                                    <Avatar src={customer.avatar}>
                                                    </Avatar>
                                                    <div className="ml-3">
                                                        <Typography variant="subtitle2" >
                                                            {customer.first_name} {customer.last_name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Stack>
                                        </TableCell>
                                        <TableCell className="">
                                            <div className="flex justify-center items-center">
                                                {customer.username}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center pr-8">
                                                {customer.date_joined}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <button className="flex justify-center items-center bg-mainOrange-100 px-3.5 py-2.5 rounded-2xl"
                                                    onClick={() => dispatch(activeEditUserChange(customer))}
                                            >
                                                <Pen/>
                                            </button>
                                        </TableCell>
                                        <TableCell>
                                            <button className="flex justify-center items-center bg-blue-100 px-3 py-2 rounded-2xl"
                                                // onClick={() => dispatch(fetchDeleteProduct(item.product_id))}
                                            >{customer.is_active ?
                                                <LockOpenIcon width="16" color="#0085FF"/>
                                                :
                                                <LockClosedIcon width="16" color="#0085FF"/>
                                            }
                                            </button>
                                        </TableCell>
                                        <TableCell>
                                            <button className="flex justify-center items-center bg-red-100 px-3 py-2 rounded-2xl"
                                                    // onClick={() => dispatch(fetchDeleteProduct(item.product_id))}
                                            >
                                                <TrashIcon width="16" color="#EC5859"/>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </div>
        </div>
    )

}

export default UserList;