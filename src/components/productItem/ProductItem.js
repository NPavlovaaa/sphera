import bobs250 from "../../assets/bobs250.png";
import tea from "../../assets/tea.png";
import cookies from "../../assets/cookies.png";
import frutes from "../../assets/frutes.png";
import { useParams } from "react-router-dom";
import Case1 from "../icons/Case1";
import Case2 from "../icons/Case2";
import Case3 from "../icons/Case3";
import Case4 from "../icons/Case4";
import Case5 from "../icons/Case5";
import { useEffect } from "react";
import { fetchProduct } from "../../api/productSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ProductItem = () => {
    const [product, setProduct] = useState({})
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProduct(id)).then( data => {
            setProduct(data.payload)
        })
      }, [])

    return (
        <div>
            <div className="grid grid-cols-2 gap-16 w-full py-10 px-56 mt-10">
                <div className="flex flex-col items-center bg-lightGray rounded-lg pt-28 pb-20">
                    <img src={bobs250} width="250" alt="Картинка товара" />
                    {/* <div className="flex flex-col text-base text-mainGray w-full mt-20 px-20">
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center mb-2">
                                <p className="flex mb-1">Кислотность</p>
                                {renderParams[0]}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="flex mb-1">Плотность</p>
                                {renderParams[1]}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                <p className="flex mb-1">Сладость</p>
                                {renderParams[2]}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="flex mb-1">Горечь</p>
                                {renderParams[3]}
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold mb-5">{product.product_name}</p>
                    {/* <div>
                        <p className="text-lg font-semibold mb-1">Разновидность</p>
                        <p className="text-base font-medium mb-3">{variety}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-1">Способ обжарки</p>
                        <p className="text-base font-medium mb-3">{roasting}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-1">Способ обработки</p>
                        <p className="text-base font-medium mb-3">{processing}</p>
                    </div> */}
                    <div>
                        <p className="text-lg font-semibold mb-1">Вкус</p>
                        <p className="text-base font-medium mb-3">{product.taste}</p>
                        <div className="flex flex-row">
                            <img src={cookies} width="65" alt="Вкус черный чай" className="mr-5"></img>
                            <img src={frutes} width="65" alt="Вкус черный чай" className="mr-5"></img>
                            <img src={tea} width="65" alt="Вкус черный чай" className="mr-5"></img>
                        </div>
                    </div>
                    <div className="flex mt-5">
                            <button type="submit" className="bg-mainOrange-600 rounded-xl px-10 py-2">В корзину</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductItem;