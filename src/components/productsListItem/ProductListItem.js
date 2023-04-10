import bobs250 from "../../assets/bobs250.png"
import { Link } from "react-router-dom";
import { useRef } from "react";
import useSetParams from "../../hooks/useSetParams"


const ProductListItem = ({product, i}) => {
    const itemRefs = useRef([]);
    const {renderParams, roasting, processing, variety, weights_render} = useSetParams(product);
    return (
        <li
        className=""
        tabIndex={0}
        ref={el => itemRefs.current[i] = el}
        >
            <div className="bg-lightGray rounded-lg px-8 py-4 pb-5">
                <div className="mb-5 flex flex-row text-xs">
                    <p className="text-mainGray l-0">{roasting}</p>
                    <p className="text-mainGray ml-3">{processing}</p>
                </div>
                <div className="flex flex-col items-center w-full">
                    <Link to={`/products/${product.product_id}/`}>
                        <p className="text-xl font-medium mb-3">{product.product_name}</p>
                        <img src={bobs250} width="200" alt="Картинка товара" />
                    </Link>
                    <p className="text-md text-mainGray mt-3">{variety}</p>
                    <p className="text-sm w-full left-0 text-mainGray mt-3 h-9">{product.taste}</p>
                    <div className="flex flex-col text-sm text-mainGray w-full mt-5">
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center mb-2">
                                <p className="flex mb-0.5">Кислотность</p>
                                {renderParams[0]}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="flex mb-0.5">Плотность</p>
                                {renderParams[1]}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                <p className="flex mb-0.5">Сладость</p>
                                {renderParams[2]}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="flex mb-0.5">Горечь</p>
                                {renderParams[3]}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between w-full mt-5">
                        {weights_render.map(item => {
                            if (item[1] !== undefined) {
                                return (
                                    <div>
                                        <input class="peer sr-only" type="radio" value={item[0]} name="weight" id={item[0]} checked/>
                                        <label class="text-xs text-mainGray flex justify-center cursor-pointer rounded-lg border-b-mainOrange-600 mainOrange py-1 px-2 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-mainOrange-600 transition-all duration-500 ease-in-out" for={item[0]}>
                                            {item[1]}
                                        </label>
                                        <div class="mt-3 text-xl justify-center flex transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1">
                                            {item[2]} р
                                        </div>
                                    </div>
                                )
                            }else return null

                        })}
                    </div>

                </div>
                <div className="flex justify-end mt-5">
                    <button type="submit" className="bg-mainOrange-600 rounded-2xl px-5 py-2">В корзину</button>
                </div>
            </div>
        </li>
    )

}

export default ProductListItem;