import {SvgIcon} from "@mui/material";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import ChatBubbleLeftIcon from '@heroicons/react/24/solid/ChatBubbleLeftIcon';
import ChatBubbleOvalLeftIcon from '@heroicons/react/24/solid/ChatBubbleOvalLeftIcon';
import CubeIcon from '@heroicons/react/24/solid/CubeIcon';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import SwatchIcon from '@heroicons/react/24/solid/SwatchIcon';
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';

const SisAdminMenuPanel = ({changeTab, openTab}) => {
    return (
        <div className="bg-darkMain flex w-1/6 text-gray-800">
            <div className="flex flex-col text-base py-12 w-full px-4 cursor-pointer">
                <div className={`${openTab === 'Обзор' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg mb-1 hover:bg-darkActive`}
                     onClick={() => changeTab('Обзор')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'Обзор' ? 'text-mainOrange-600' : null}`}>
                        <ChartBarIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'Обзор' ? 'text-mainWhite' : null} ml-5`}>Обзор</p>
                </div>
                <div className={`${openTab === 'AdminOrders' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg mb-1 hover:bg-darkActive`}
                     onClick={() => changeTab('AdminOrders')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'AdminOrders'? 'text-mainOrange-600' : null}`}>
                        <ListBulletIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'AdminOrders' ? 'text-mainWhite' : null} ml-5`}>Заказы</p>
                </div>
                <div className={`${openTab === 'WarehousePage' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg mb-1 hover:bg-darkActive`}
                     onClick={() => changeTab('WarehousePage')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'WarehousePage'? 'text-mainOrange-600' : null}`}>
                        <UserCircleIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'WarehousePage'? 'text-mainWhite' : null} ml-5`}>Пользователи</p>
                </div>
                <div className={`${openTab === 'ClientsList' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg mb-1 hover:bg-darkActive`}
                        onClick={() => changeTab('ClientsList')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'ClientsList' ? 'text-mainOrange-600' : null}`}>
                        <UsersIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'ClientsList' ? 'text-mainWhite' : null} ml-5`}>Клиенты</p>
                </div>
                <div className={`${openTab === 'Budget' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg mb-1 hover:bg-darkActive`}
                     onClick={() => changeTab('Budget')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'Budget' ? 'text-mainOrange-600' : null}`}>
                        <Squares2X2Icon />
                    </SvgIcon>
                    <p className={`${openTab === 'Budget' ? 'text-mainWhite' : null} ml-5`}>Статусы заказа</p>
                </div>
                <div className={`${openTab === 'ProductsList' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg mb-1 hover:bg-darkActive`}
                     onClick={() => changeTab('ProductsList')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'ProductsList' ? 'text-mainOrange-600' : null}`}>
                        <CubeIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'ProductsList' ? 'text-mainWhite' : null} ml-5`}>Товары</p>
                </div>
                <div className={`${openTab === 'ProductReviews' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg mb-1 hover:bg-darkActive`}
                     onClick={() => changeTab('ProductReviews')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'ProductReviews' ? 'text-mainOrange-600' : null}`}>
                        <SwatchIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'ProductReviews' ? 'text-mainWhite' : null} ml-5`}>Разновидности</p>
                </div>
                <div className={`${openTab === 'ProductReviews' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg mb-1 hover:bg-darkActive`}
                     onClick={() => changeTab('ProductReviews')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'ProductReviews' ? 'text-mainOrange-600' : null}`}>
                        <ChatBubbleOvalLeftIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'ProductReviews' ? 'text-mainWhite' : null} ml-5`}>Отзывы о товарах</p>
                </div>
                <div className={`${openTab === 'OrderReviews' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg hover:bg-darkActive`}
                     onClick={() => changeTab('OrderReviews')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'OrderReviews' ? 'text-mainOrange-600' : null}`}>
                        <ChatBubbleLeftIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'OrderReviews' ? 'text-mainWhite' : null} ml-5`}>Отзывы о заказах</p>
                </div>
            </div>
        </div>
    )

}
export default SisAdminMenuPanel;