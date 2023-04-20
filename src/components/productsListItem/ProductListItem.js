import bobs250 from "../../assets/bobs250.png"
import { Link } from "react-router-dom";
import { useRef } from "react";
import setParams from "../../hooks/useSetParams"
import { useEffect, useState } from "react";
import { fetchProcessingMethod, fetchRoastingMethod, fetchWeight } from "../../api/productSlice";
import { useDispatch } from "react-redux";


const ProductListItem = ({product, i, product_id}) => {
    const itemRefs = useRef([]);
    const dispatch = useDispatch();
    const [processing, setProcessing] = useState();
    const [roasting, setRoasting] = useState();
    const [checkedList, setCheckedList] = useState();

    useEffect(()=>{
        dispatch(fetchProcessingMethod(product.processing_method)).then(data => {
            setProcessing(data.payload)
        })
        dispatch(fetchRoastingMethod(product.roasting_method)).then(data => {
            setRoasting(data.payload)
        })
        dispatch(fetchWeight(product.product_id)).then(data => {
            setCheckedList(data.payload)
        })
      }, [])

    function toggleOption(options, id, checked) {
        return options.map((option) =>
            option.id === id ? { ...option, checked } : { ...option, checked: false }
        );
    }

    const changeList = (id, checked) => {
        setCheckedList((checkedList) => toggleOption(checkedList, id, checked));
    };

    const {renderParams} = setParams(product);

    return (
        <li
        className=""
        tabIndex={0}
        ref={el => itemRefs.current[i] = el}
        >
            <div className="bg-lightGray rounded-lg px-8 py-4 pb-5">
                <div className="mb-5 flex flex-row text-xs">
                    <p className="text-mainGray l-0">{roasting ? roasting.roasting_method_name : null}</p>
                    <p className="text-mainGray ml-3">{processing ? processing.processing_method_name : null}</p>
                </div>
                <div className="flex flex-col items-center w-full">
                    <Link to={`/products/${product.product_id}/`}>
                        <p className="text-xl font-medium mb-3">{product.product_name}</p>
                        <img src={bobs250} width="200" alt="Картинка товара" />
                    </Link>
                    <p className="text-md text-mainGray mt-3">{}</p>
                    <p className="text-sm w-full left-0 text-mainGray mt-3 h-9">{product.taste}</p>
                    <div className="flex flex-col text-sm text-mainGray w-full mt-5">
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center mb-2">
                                <p className="flex mb-0.5">Кислотность</p>
                                {renderParams ? renderParams[0] : null}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="flex mb-0.5">Плотность</p>
                                {renderParams ? renderParams[1] : null}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                <p className="flex mb-0.5">Сладость</p>
                                {renderParams ? renderParams[2] : null}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="flex mb-0.5">Горечь</p>
                                {renderParams ? renderParams[3] : null}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between w-full mt-5">
                        {checkedList ? checkedList.map(({id, weight, price, checked}) => {
                            return (
                                <div key={id}>
                                    <input className="peer"
                                        type="radio"
                                        name={id}
                                        value={id}
                                        checked={checked}
                                        onChange={(e) => changeList(id, e.target.checked)}/>
                                    <label className="text-xs text-mainGray flex justify-center cursor-pointer rounded-lg border-b-mainOrange-600 mainOrange py-1 px-2 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-mainOrange-600 transition-all duration-400 ease-in-out" for={id}>
                                        {weight}
                                    </label>
                                    <div className="mt-3 text-xl justify-center flex transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1">
                                        {price} р
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    <button type="submit" className="flex bg-mainOrange-600 rounded-2xl px-5 py-2">В корзину</button>
                </div>
            </div>
        </li>
    )

}

export default ProductListItem;