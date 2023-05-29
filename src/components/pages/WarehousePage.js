import {useState} from "react";
import WarehouseProductList from "../warehouse/WarehouseProductList";
import ProductConsumption from "../warehouse/ProductConsumption";


const WarehousePage  = () => {
    const [openTab, setOpenTab] = useState(1);
    const [product, setProduct] = useState({});
    const changeTab = (value, product) => {
        setOpenTab(value)
        setProduct(product)
    }
    console.log(product)

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
            <div className="flex bg-lightGray py-10 px-20 w-full rounded-xl mt-6">
                <div className={`${openTab === 1 ? "flex" : "hidden"} w-full`}>
                    <WarehouseProductList changeTab={changeTab}/>
                </div>
                <div className={`${openTab === 2 ? "flex" : "hidden"} w-full`}>
                    <ProductConsumption product={product ? product : null}/>
                </div>
                <div className={`${openTab === 3 ? "flex" : "hidden"} w-full`}>
                    frfrvv
                </div>
            </div>
        </div>
    )
}
export default WarehousePage;
