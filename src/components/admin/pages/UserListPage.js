import EditUserForm from "../userList/EditUserForm";
import UserList from "../userList/UserList";


const UserListPage = () => {
    return (
        <div className="flex flex-col w-full h-fit">
            <h1 className="text-3xl font-bold mb-4">Пользователи</h1>
            <div className="flex w-full bg-mainWhite">
                <div className="w-2/3">
                    <UserList/>
                </div>
                <div className="w-1/3">
                    <EditUserForm/>
                </div>
            </div>
        </div>

    )
}

export default UserListPage;