import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import {OverviewTotalCustomers} from "../../adminPanel/sections/overview/overview-total-customers";
import {OverviewWarehouse} from "../../adminPanel/sections/overview/overview-warehouse";
import {OverviewProductReviews} from "../../adminPanel/sections/overview/overview-product-reviews";
import {OverviewSales} from "../../adminPanel/sections/overview/overview-sales";
import {OverviewLatestProducts} from "../../adminPanel/sections/overview/overview-latest-products";
import {OverviewLatestOrders} from "../../adminPanel/sections/overview/overview-latest-orders";
import {useEffect, useState} from "react";
import AdminOrders from "../adminOrders/AdminOrders";
import WarehousePage from "./WarehousePage";
import MenuPanel from "../menuPanel/MenuPanel";
import IncomeList from "../income/IncomeList";
import OrdersReviewPage from "../../pages/OrdersReviewPage";
import {OverviewOrderReviews} from "../../adminPanel/sections/overview/overview-order-reviews";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductWarehouse} from "../../products/productSlice";
import ClientsList from "../../clientsList/ClientsList";
import {fetchCustomers} from "../../../api/userSlice";
import ProductListPage from "./ProductListPage";


const AdminMainPage = () => {
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
        <div className="bg-lightGray flex w-full">
            <Box
                component="main"
                className="flex w-full"
                sx={{
                    flexGrow: 1,
                }}
            >
                <MenuPanel changeTab={changeTab} openTab={openTab} className="w-1/6"/>
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
                            <OverviewOrderReviews changeTab={changeTab}/>
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
                            sm={6}
                            lg={3}
                        >
                            <OverviewWarehouse total_quantity={total_quantity} sx={{height: '100%'}} changeTab={changeTab}/>
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
                            lg={8}
                        >
                            <OverviewSales sx={{height: '100%'}}/>
                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                            lg={4}
                        >
                            {/*<OverviewBudget difference={12} positive sx={{height: '100%'}} changeTab={changeTab}/>*/}
                            <OverviewLatestProducts sx={{height: '100%'}} changeTab={changeTab}/>
                        </Grid>
                        <Grid
                            xs={12}
                            md={12}
                            lg={12}
                        >
                            <OverviewLatestOrders sx={{height: '100%'}} changeTab={changeTab}/>
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
                            {openTab === 'AdminOrders' ? <AdminOrders/> : null}
                            {openTab === 'WarehousePage' ? <WarehousePage/> : null}
                            {openTab === 'Budget' ? <IncomeList/> : null}
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

export default AdminMainPage;
