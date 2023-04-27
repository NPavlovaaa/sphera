/* eslint-disable jsx-a11y/anchor-is-valid */
import bobs250 from "../../assets/bobs250.png"
import { Link } from "react-router-dom";
import { useRef } from "react";
import setParams from "../setParams/SetParams"
import { useEffect, useState } from "react";
import { fetchFavorite, fetchProcessingMethod, fetchRoastingMethod, fetchWeight } from "../../api/productSlice";
import { useDispatch } from "react-redux";
import { useAddCartMutation, useAddFavoriteMutation} from "../../api/apiSlice";
import { fetchProductInCart, fetchDeleteProductInCart, fetchUpdateCart } from "../../api/cartSlice";
import Star from "../icons/Star";
import Favorite from "../icons/Favorite";

const ProductListItem = ({product, i, client}) => {
    const itemRefs = useRef([]);
    const dispatch = useDispatch();
    const [processing, setProcessing] = useState();
    const [roasting, setRoasting] = useState();
    const [checkedList, setCheckedList] = useState();
    const [openWeight, setOpenWeight] = useState(1);

    const {renderParams} = setParams(product);
    const [addCart] = useAddCartMutation();
    const [addFavorite] = useAddFavoriteMutation();
    const [cart, setCart] = useState();
    const [favorite, setFavorite] = useState(false);

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
        updateCard();

      }, [openWeight])

    const updateCard = () => {
        dispatch(fetchProductInCart({
            'client': client,
            'product': product.product_id,
            'weight_selection': openWeight
        })).then(data => setCart(data.payload))
        dispatch(fetchFavorite(client)).then(data => setFavorite(data.payload))
    }


    const onAddToCart = () => {
        if(client){
            const newCart = {
                'client': client,
                'weight_selection': openWeight
            }
            addCart(newCart).then(updateCard);
        }
    }

    const onAddToFavorite = () => {
        if(client){
            const newFavorite = {
                'client': client,
                'product': product.product_id
            }
            addFavorite(newFavorite).then(updateCard);
        }
    }

    const changeCount = (value) => {
        cart.product_count += value
        if (cart.product_count > 0){
            setTimeout(() =>{
                dispatch(fetchUpdateCart({
                    'client': client,
                    'weight_selection': cart.weight_selection,
                    'product_count': cart.product_count,
                    'id': cart.cart_id
                })).then(updateCard)
            }, 200)
        }else{
            setTimeout(() =>{
                dispatch(fetchDeleteProductInCart(cart.cart_id)).then(updateCard)
            }, 200)
        }

    }

    const active = () => {
        const fav = favorite ? true : false
        return fav
    }
    // console.log(product.product_id, favorite)

    const renBtn = () => {
        let btn = '';
        cart && cart.product_count !== 0 ?
                btn = <div className="flex w-1/4 justify-between border-2 border-mainOrange-600 rounded-2xl py-1 px-3">
                        <button type="submit" onClick={() => changeCount(-1)} className="flex text-xl">-</button>
                        <p className="flex text-xl">{cart.product_count}</p>
                        <button type="submit" onClick={() => changeCount(1)} className="flex text-xl">+</button>
                      </div>
                :
                btn = <button type="submit" onClick={onAddToCart} className="flex bg-mainOrange-600 hover:bg-mainOrange-700 rounded-2xl px-5 py-2">
                        В корзину
                      </button>
        return btn
    }

    return (
        <li
        className="bg-lightGray rounded-lg px-8 py-4 pb-5"
        tabIndex={0}
        ref={el => itemRefs.current[i] = el}
        >
            <div>
                <div className="mb-5 flex text-xs justify-between">
                    <div className="flex">
                        <p className="text-mainGray l-0">{roasting ? roasting.roasting_method_name : null}</p>
                        <p className="text-mainGray ml-3">{processing ? processing.processing_method_name : null}</p>
                    </div>
                    <div className="flex">
                        <Star width="16"/>
                        <p className="text-mainGray text ml-1 mr-4">{product.raiting}</p>
                        <button className="h-fit" onClick={onAddToFavorite}>
                            <Favorite width="20" height="20" strokeColor="#939393" active={active()}/>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full">
                    <Link to={`/products/${product.product_id}/`}>
                        <p className="text-xl font-medium mb-3">{product.product_name}</p>
                        <img src={bobs250} width="200" alt="Картинка товара" />
                    </Link>
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
                    {checkedList ? checkedList.map(({id, weight, price}) => {
                            let dem = '';
                            switch(weight){
                                case 250:
                                    dem = '250г';
                                    break;
                                case 1000:
                                    dem = '1000г';
                                    break;
                                case 10:
                                    dem = 'от 10 кг';
                                    break;
                                case 50:
                                    dem = 'от 50 кг';
                                    break;
                                case 0:
                                    dem = 'Образец';
                                    break;
                                default:
                                    dem = '250г';
                                    break;
                            }
                            return (
                                <div key={id}>
                                    <ul className="flex space-x-10">
                                        <li>
                                            <a  className={` ${openWeight === id ? "border-2 border-mainOrange-600" : ""} text-xs text-mainGray flex justify-center cursor-pointer rounded-lg py-1 px-2`}
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpenWeight(id)
                                                }}
                                            >
                                                {dem}
                                            </a>
                                            <div className={`${openWeight === id ? "flex" : "hidden"} mt-3 text-2xl justify-center`}>
                                                {price} р
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end mt-2">
                {renBtn()}
            </div>
        </li>
    )

}

export default ProductListItem;