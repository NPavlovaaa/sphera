import {useState} from "react";
import WarehouseProductList from "../warehouse/WarehouseProductList";
import ProductConsumption from "../warehouse/ProductConsumption";
import './pages.scss'
import ProductReceipt from "../warehouse/ProductReceipt";


const WarehousePage  = ({}) => {
    const [openTab, setOpenTab] = useState('WarehouseProductList');
    const [product, setProduct] = useState({});
    const changeTab = (value, product) => {
        setOpenTab(value)
        setProduct(product)
    }

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold">Склад</h1>
            <div className="flex w-full rounded-xl mt-3">
                <div className={`${openTab === 'WarehouseProductList' ? "flex" : "hidden"} w-full rounded-xl`}>
                    <WarehouseProductList changeTab={changeTab}/>
                </div>
                <div className={`${openTab === 'ProductConsumption' ? "flex flex-col" : "hidden"} w-full rounded-xl`}>
                    <div className="flex text-sm mb-8">
                        <button type="submit" onClick={() => setOpenTab('WarehouseProductList')} className="flex">
                            <div className="arrow left mr-3"/>
                            Назад
                        </button>
                    </div>
                    <div className="flex rounded-xl">
                        <ProductConsumption product={product ? product : null}/>
                    </div>
                </div>
                <div className={`${openTab === 'ProductReceipt' ? "flex flex-col" : "hidden"} w-full rounded-xl`}>
                    <div className="flex text-sm mb-8">
                        <button type="submit" onClick={() => setOpenTab('WarehouseProductList')} className="flex">
                            <div className="arrow left mr-3"/>
                            Назад
                        </button>
                    </div>
                    <div className="flex rounded-xl">
                        <ProductReceipt product={product ? product : null}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WarehousePage;
