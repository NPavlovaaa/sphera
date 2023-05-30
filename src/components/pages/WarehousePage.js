import {useState} from "react";
import WarehouseProductList from "../warehouse/WarehouseProductList";
import ProductConsumption from "../warehouse/ProductConsumption";
import './pages.scss'
import ProductReceipt from "../warehouse/ProductReceipt";

const WarehousePage  = () => {
    const [openTab, setOpenTab] = useState(1);
    const [product, setProduct] = useState({});
    const changeTab = (value, product) => {
        setOpenTab(value)
        setProduct(product)
    }

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold">Склад</h1>
            <div className="flex mt-4">
                <button className="text-sm flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-md mr-3"
                        type="submit"
                    // onClick={() => dispatch(activeFilterStatusChange(item.status_id))}
                >
                    Товары
                </button>
            </div>
            <div className="flex w-full rounded-xl mt-6">
                <div className={`${openTab === 1 ? "flex" : "hidden"} w-full bg-lightGray py-10 px-20 rounded-xl`}>
                    <WarehouseProductList changeTab={changeTab}/>
                </div>
                <div className={`${openTab === 2 ? "flex flex-col" : "hidden"} w-full rounded-xl`}>
                    <div className="flex text-sm m-2">
                        <button type="submit" onClick={() => setOpenTab(1)} className="flex">
                            <div className="arrow left mr-3"/>
                            Назад
                        </button>
                    </div>
                    <div className="flex bg-lightGray py-10 px-20 rounded-xl">
                        <ProductConsumption product={product ? product : null}/>
                    </div>
                </div>
                <div className={`${openTab === 3 ? "flex flex-col" : "hidden"} w-full rounded-xl`}>
                    <div className="flex text-sm m-2">
                        <button type="submit" onClick={() => setOpenTab(1)} className="flex">
                            <div className="arrow left mr-3"/>
                            Назад
                        </button>
                    </div>
                    <div className="flex bg-lightGray py-10 px-20 rounded-xl">
                        <ProductReceipt product={product ? product : null}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WarehousePage;
