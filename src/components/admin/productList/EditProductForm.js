import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    fetchProcessingMethods,
    fetchRoastingMethods, fetchCategory
} from "../../products/productSlice";


const EditProductForm = () => {
    let {activeEditProduct, processing, roasting} = useSelector(state => state.getProduct)
    const dispatch = useDispatch();
    const [product_name, setProductName] = useState('');

    useEffect(() => {
            dispatch(fetchRoastingMethods())
            dispatch(fetchCategory())
            dispatch(fetchProcessingMethods())
    }, [activeEditProduct])


    const onEditProduct = (e) => {
        e.preventDefault();
        console.log(product_name)
    //     dispatch(fetchCreateIncomeChange({
    //         'note': values.note,
    //         'price': values.price,
    //         // 'action': action,
    //     }))
    }


    return (
        <>
            <div className="h-full flex flex-col mt-10 items-center">
                <h1 className="text-xl font-semibold">Изменение товара</h1>
                <form onSubmit={onEditProduct} method="POST">
                    <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="product_name"
                                    placeholder="Название"
                                    onChange={(e) => {
                                        setProductName(e.target.value)
                                    }}
                                    // value={product_name}
                                    defaultValue={activeEditProduct ? activeEditProduct.product_name : null}
                                    className="bg-lightGray rounded-xl px-5 py-2 placeholder-transparent h-10 w-full focus:outline-none focus:borer-rose-600"
                                    id="product_name"
                                />
                            </div>
                            <div className="relative">
                                <select id="processing" value={activeEditProduct ? activeEditProduct.processing_method : null} className="bg-lightGray rounded-xl px-5 py-2 placeholder-transparent h-10 w-full focus:outline-none focus:borer-rose-600" name="processing">
                                    {activeEditProduct ?
                                        processing.map(item => {
                                            return <option value={item.processing_method_name}>{item.processing_method_name}</option>
                                        })
                                        :
                                        <option value="" className="disabled selected hidden">Обработка</option>
                                    }
                                </select>
                            </div>
                            <div className="relative">
                                <select id="roasting" value={activeEditProduct ? activeEditProduct.roasting_method : 1} className="bg-lightGray rounded-xl px-5 py-2 placeholder-transparent h-10 w-full focus:outline-none focus:borer-rose-600" name="roasting">
                                    {activeEditProduct ?
                                        roasting.map(item => {
                                            return <option
                                                value={item.roasting_method_name}>{item.roasting_method_name}</option>
                                        })
                                    :
                                        <option value="" className="disabled selected hidden">Обжарка</option>
                                    }

                                </select>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="price_250"
                                    defaultValue={activeEditProduct ? activeEditProduct.price_250 : null}
                                    className="bg-lightGray rounded-xl px-5 py-2 placeholder-transparent h-10 w-full focus:outline-none focus:borer-rose-600"
                                    id="price_250"
                                    placeholder="Стоимость 250г"
                                    />
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="price_1000"
                                    defaultValue={activeEditProduct ? activeEditProduct.price_1000 : null}
                                    className="bg-lightGray rounded-xl px-5 py-2 placeholder-transparent h-10 w-full focus:outline-none focus:borer-rose-600"
                                    id="price_1000"
                                    placeholder="Стоимость 1кг"
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex top-5 justify-center">
                        <button className="bg-mainOrange-600 drop-shadow-md rounded-xl px-10 py-2"
                                type="submit"
                        >Сохранить</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditProductForm;