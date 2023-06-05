import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import {OverviewTotalCustomers} from "../adminPanel/sections/overview/overview-total-customers";
import {OverviewProductReviews} from "../adminPanel/sections/overview/overview-product-reviews";
import {useEffect, useState} from "react";
import WarehousePage from "./WarehousePage";
import OrdersReviewPage from "../../pages/OrdersReviewPage";
import {OverviewOrderReviews} from "../adminPanel/sections/overview/overview-order-reviews";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductWarehouse} from "../../products/productSlice";
import ClientsList from "../../clientsList/ClientsList";
import {fetchCustomers} from "../../../api/userSlice";
import ProductListPage from "./ProductListPage";
import {OverviewProducts} from "../adminPanel/sections/overview/overview-products";
import {OverviewOrders} from "../adminPanel/sections/overview/overview-orders";
import {OverviewUsers} from "../adminPanel/sections/overview/overview-users";
import {OverviewOrderStatuses} from "../adminPanel/sections/overview/overview-order-statuses";
import {OverviewVarieties} from "../adminPanel/sections/overview/overview-varieties";
import SisAdminMenuPanel from "../sisAdminMenuPanel/SisAdminMenuPanel";
import UserListPage from "./UserListPage";
import OrderListPage from "./OrderListPage";


const SisadminMainPage = () => {
    const [openTab, setOpenTab] = useState('Обзор');
    const {total_quantity} = useSelector(state => state.getProduct)
    const {count} = useSelector(state => state.authUser)
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(fetchProductWarehouse())
        dispatch(fetchCustomers())
    }, [])
    const changeTab = (value) => {
        setOpenTab(value)
    }
    return (
        <div className="bg-lightGrayAdmin flex w-full">
            <Box
                component="main"
                className="flex w-full"
                sx={{
                    flexGrow: 1,
                }}
            >
                <SisAdminMenuPanel changeTab={changeTab} openTab={openTab} className="w-1/6"/>
                {openTab === 'Обзор' ?
                <div className="flex w-5/6 px-14 py-8">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            xs={12}
                            sm={6}
                            lg={3}
                        >
                            <OverviewUsers changeTab={changeTab}/>
                        </Grid>
                        <Grid
                            xs={12}
                            sm={6}
                            lg={3}
                        >
                            <OverviewTotalCustomers value={count} changeTab={changeTab}/>
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                            lg={3}
                        >
                            <OverviewOrders sx={{height: '100%'}} changeTab={changeTab}/>
                        </Grid>
                        <Grid
                            xs={12}
                            sm={6}
                            lg={3}
                        >
                            <OverviewProductReviews changeTab={changeTab}/>
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                            lg={3}
                        >
                            <OverviewOrderStatuses changeTab={changeTab}/>
                        </Grid>
                        <Grid
                            xs={12}
                            sm={6}
                            lg={3}
                        >
                            <OverviewOrderReviews changeTab={changeTab}/>
                        </Grid>
                        <Grid
                            xs={12}
                            sm={6}
                            lg={3}
                        >
                            <OverviewProducts sx={{height: '100%'}} changeTab={changeTab}/>
                        </Grid>
                        <Grid
                            xs={12}
                            sm={6}
                            lg={3}
                        >
                            <OverviewVarieties sx={{height: '100%'}} changeTab={changeTab}/>
                        </Grid>
                    </Grid>
                </div>
                    : null}
                {openTab !== 'Обзор' ?
                    <div className="flex flex-col w-5/6">
                        <div className="flex text-sm mt-5 ml-5">
                            <button type="submit" onClick={() => setOpenTab('Обзор')} className="flex">
                                <div className="arrow left mr-3"/>
                                Назад
                            </button>
                        </div>
                        <div className="flex py-10 px-20 rounded-xl">
                            {openTab === 'OrderList' ? <OrderListPage/> : null}
                            {openTab === 'WarehousePage' ? <WarehousePage/> : null}
                            {openTab === 'UserList' ? <UserListPage/> : null}
                            {openTab === 'ProductReviews' ? <OrdersReviewPage detail='product'/> : null}
                            {openTab === 'OrderReviews' ? <OrdersReviewPage detail='order'/> : null}
                            {openTab === 'ClientsList' ? <ClientsList/> : null}
                            {openTab === 'ProductsList' ? <ProductListPage/> : null}
                        </div>
                    </div>
                    : null
                }
            </Box>
        </div>

    )
};

export default SisadminMainPage;
