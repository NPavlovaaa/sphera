import {useGetUsersQuery} from "../../api/apiSlice";


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

    const renderClientsList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Клиентов пока нет</h5>
        }

        // return arr.map(({id, ...props}) => {
        //     return <div key={id} {...props}>{...props}</div>
        // })

        return arr.map(item => {
            return <div>{item.username}</div>
        })
    }

    const elements = renderClientsList(users);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default ClientsList;