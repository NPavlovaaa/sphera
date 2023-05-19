import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCart, fetchDeleteProductInCart, fetchUpdateCart } from "./cartSlice";
import { Link } from "react-router-dom";

const ClientCart = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const cartLoadingStatus = useSelector(state => state.getCart.cartLoadingStatus);
    const cart = useSelector(state => state.getCart.cart);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(activeClient){
            updateCart();
        }
    }, [activeClient])

    const updateCart = () =>{
        dispatch(fetchCart())
    }

    let total_sum  = 0;
    let weight_sum  = 0;
    let count_products = 0;

    const renderCart = (arr) => {
        if (arr.length === 0) {
            return (
                <>
                    <p className="text-mainGray text-xl">В корзине ничего нет</p>
                    <Link to={`/products/`} className="text-mainOrange-600 text-base">
                        Перейти к покупкам
                    </Link>
                </>
            )
        }
        return arr.map(({product, roasting, processing, price, weight, cart_id, count, weight_selection}) => {
            const changeCount = (value) => {
                count += value
                if (count > 0){
                    setTimeout(() =>{
                        dispatch(fetchUpdateCart({
                            'client': activeClient ? activeClient.client_id : null,
                            'weight_selection': weight_selection,
                            'product_count': count,
                            'id': cart_id
                        })).then(updateCart)
                    }, 150)
                }else{
                    setTimeout(() =>{
                        dispatch(fetchDeleteProductInCart(cart_id)).then(updateCart)
                    }, 150)
                }

            }

            const deleteProduct = () => {
                dispatch(fetchDeleteProductInCart(cart_id)).then(updateCart)
            }

            let image;
            weight === 1000 ? image = product.image_max : image = product.image_min

            total_sum += price;
            weight_sum += weight * count;
            count_products += 1 * count;
            return (
                <div className="flex flex-row w-full justify-between bg-mainWhite mb-1.5 p-8 rounded-xl" key={cart_id}>
                    <div className="flex flex-row w-2/3 items-center justify-center">
                            <div className="flex py-3 w-1/4 max-h-44 justify-center">
                                <Link to={`/products/${product.product_id}/`}>
                                    <img src={image} alt="картинка товара" className="max-h-40"/>
                                </Link>
                            </div>
                        <div className="flex flex-col w-3/4 ml-5">
                            <p className="flex font-medium text-lg mt-1">
                                {product.product_name}
                            </p>
                            <div className="grid grid-cols-4 mt-1">
                                <p className="flex text-sm text-mainGray">
                                    {roasting}
                                </p>
                                <p className="flex text-sm text-mainGray">
                                    {processing}
                                </p>
                            </div>
                            <p className="flex text-sm text-mainGray mt-1">
                                {product.taste}
                            </p>
                            <div className="grid grid-cols-3 mt-1 text-sm">
                                <button type="submit" className="flex text-mainOrange-600 py-2 w-full">В избранное</button>
                                <button type="submit" onClick={deleteProduct} className="flex text-red py-2 w-full">Удалить</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-1/5 justify-end">
                        <button type="submit" onClick={() => changeCount(-1)} className="flex text-xl mr-2 bg-lightGray px-2.5 py-1 rounded-lg h-fit">-</button>
                        <p className="flex text-lg mr-2 py-1">{count}</p>
                        <button type="submit" onClick={() => changeCount(1)} className="flex text-xl bg-lightGray px-2 py-1 rounded-lg h-fit">+</button>
                    </div>
                    <div className="flex w-1/5 pr-3 justify-end">
                        <div className="flex flex-col items-center">
                            <p className="flex text-xl">{price} р</p>
                            <p className="flex text-sm text-mainGray mt-0.5">{weight} г</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const renderButton = (arr) => {
        if (arr.length === 0) {
            return(
                <button type="submit" disabled className="disabled:bg-mainOrange-100 disabled:text-mainGray flex bg-mainOrange-600 hover:bg-mainOrange-700 rounded-2xl px-5 py-3 w-full text-lg justify-center">
                    Перейти к оформлению
                </button>
                )
        }
        return (
            <button type="submit" className="flex bg-mainOrange-600 hover:bg-mainOrange-700 rounded-2xl px-5 py-3 w-full text-lg font-semibold justify-center">
                Перейти к оформлению
            </button>
        )
    }

    const elements = renderCart(cart)
    const btn = renderButton(cart)

    return (
        <div className="w-full px-20 py-10">
            <h1 className="text-3xl font-bold">Корзина</h1>
            <div className="grid grid-cols-3 gap-16 col-span-2 bg-lightGray p-10 w-full rounded-xl mt-6">
                <div className="flex flex-col col-span-2 items-center justify-center">
                    {/*{cartLoadingStatus === 'loading' ? <Spinner/> : null}*/}
                    {elements}
                </div>
                <div className="flex flex-col">
                    <Link to={`/ordering/`}>
                        {btn}
                    </Link>
                    <p className="text-mainGray text-sm mt-3">Доступные способы и время доставки можно выбрать при оформлении заказа</p>
                    <div className="flex flex-row justify-between bg-mainWhite w-full mb-1.5 p-6 rounded-xl mt-3">
                        <p className="text-lg">Ваша корзина</p>
                        <div className="flex">
                            <p className="text-base text-mainGray mr-2">{count_products} шт /</p>
                            <p className="text-base text-mainGray">{weight_sum / 1000} кг</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between bg-mainWhite w-full mb-1.5 p-6 rounded-xl">
                        <p className="flex text-xl">Общая стоимость</p>
                        <p className="flex justify-end items-end text-xl font-semibold">{total_sum} р</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ClientCart;

