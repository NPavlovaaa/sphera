import {SvgIcon} from "@mui/material";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import ChatBubbleLeftIcon from '@heroicons/react/24/solid/ChatBubbleLeftIcon'
import ChatBubbleOvalLeftIcon from '@heroicons/react/24/solid/ChatBubbleOvalLeftIcon'
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon'
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon'
import BanknotesIcon from '@heroicons/react/24/solid/BanknotesIcon'
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon'

const MenuPanel = ({changeTab, openTab}) => {

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
                        <BuildingStorefrontIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'WarehousePage'? 'text-mainWhite' : null} ml-5`}>Склад</p>
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
                        <BanknotesIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'Budget' ? 'text-mainWhite' : null} ml-5`}>Бюджет</p>
                </div>
                <div className={`${openTab === 'ProductList' ? 'bg-darkActive' : null} flex items-center px-4 py-1.5 rounded-lg mb-1 hover:bg-darkActive`}
                     onClick={() => changeTab('ProductList')}>
                    <SvgIcon fontSize="small" className={`${openTab === 'ProductList' ? 'text-mainOrange-600' : null}`}>
                        <ShoppingBagIcon />
                    </SvgIcon>
                    <p className={`${openTab === 'ProductList' ? 'text-mainWhite' : null} ml-5`}>Товары</p>
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
export default MenuPanel;