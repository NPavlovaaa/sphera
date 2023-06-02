import {useGetUsersQuery} from "../../api/apiSlice";
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


const ClientsList = () => {
    const {
        data: users = [],
        isLoading,
        isError
    } = useGetUsersQuery();

    if (isLoading) {
        return <h5 className="text-center mt-5">Загрузка</h5>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }



    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-2">Клиенты</h1>
            <div className="rounded-2xl shadow-lg bg-mainWhite w-full">
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead className="bg-darkLightGray">
                            <TableRow>
                                <TableCell>
                                    <span className=" pl-8">КЛИЕНТ</span>
                                </TableCell>
                                <TableCell>
                                    <span className="flex justify-center">ПОЧТА</span>
                                </TableCell>
                                <TableCell>
                                    <span className="flex justify-center">ЛОКАЦИЯ</span>
                                </TableCell>
                                <TableCell>
                                    <span className="flex justify-center">ТЕЛЕФОН</span>
                                </TableCell>
                                <TableCell>
                                    <span className="flex justify-center">УРОВЕНЬ</span>
                                </TableCell>
                                <TableCell>
                                    <span className="flex justify-center">БАЛЛЫ</span>
                                </TableCell>
                                <TableCell>
                                    <span className="flex justify-center pr-8">ДАТА РЕГИСТРАЦИИ</span>
                                </TableCell>
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
                                                <div className="flex items-center pl-8">
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
                                        <TableCell>
                                            <div className="flex justify-center items-center">
                                                {customer.username}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center">
                                                {customer.address}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center">
                                                {customer.phone}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center">
                                                {customer.level}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center">
                                                {customer.scores}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center pr-8">
                                                {customer.date_joined}
                                            </div>
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

export default ClientsList;