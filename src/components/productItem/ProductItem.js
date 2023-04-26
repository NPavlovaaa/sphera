/* eslint-disable jsx-a11y/anchor-is-valid */
import bobs250 from "../../assets/bobs250.png";
import tea from "../../assets/tea.png";
import cookies from "../../assets/cookies.png";
import frutes from "../../assets/frutes.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../api/productSlice";
import { useDispatch } from "react-redux";
import { fetchProcessingMethod, fetchRoastingMethod, fetchVariety, fetchWeight } from "../../api/productSlice";
import setParams from "../setParams/SetParams";
import MakingMethods from "../makingMethods/MakingMethods";
import ProductReview from "../productReview/ProductReview";


const ProductItem = () => {
    const [product, setProduct] = useState({})
    const [variety, setVariety] = useState();
    const [processing, setProcessing] = useState();
    const [roasting, setRoasting] = useState();

    const {id} = useParams();
    const dispatch = useDispatch();
    const [checkedList, setCheckedList] = useState();
    const [openTab, setOpenTab] = useState(1);
    const [openWeight, setOpenWeight] = useState(1);

    console.log(product)

    useEffect(()=>{
        dispatch(fetchProduct(id)).then(data => {
            setProduct(data.payload)
            dispatch(fetchVariety(data.payload.variety)).then(data => {
                setVariety(data.payload)
            })
            dispatch(fetchProcessingMethod(data.payload.processing_method)).then(data => {
                setProcessing(data.payload)
            })
            dispatch(fetchRoastingMethod(data.payload.roasting_method)).then(data => {
                setRoasting(data.payload)
            })
            dispatch(fetchWeight(id)).then(data => {
                setCheckedList(data.payload)
            })
        })
    }, [])

    const pars = () => {
        let renderParams = null;
        if(product.product_id){
            renderParams = setParams(product)
        }
        return renderParams
    }

    function toggleOption(options, id, checked) {
        return options.map((option) =>
            option.id === id ? { ...option, checked } : { ...option, checked: false }
        );
    }

    const changeList = (id, checked) => {
        setCheckedList((checkedList) => toggleOption(checkedList, id, checked));
    };

    return (
        <div className="px-56">
            <div className="grid grid-cols-2 gap-16 w-full py-10 mt-10">
                <div className="flex flex-col items-center bg-lightGray rounded-lg pt-28 pb-20">
                    <img src={bobs250} width="250" alt="Картинка товара" />
                    <div className="flex flex-col text-base text-mainGray w-full mt-20 px-20">
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center mb-2">
                                <p className="flex mb-1">Кислотность</p>
                                {pars() ? pars().renderParams[0] : null}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="flex mb-1">Плотность</p>
                                {pars() ? pars().renderParams[1] : null}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                <p className="flex mb-1">Сладость</p>
                                {pars() ? pars().renderParams[2] : null}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="flex mb-1">Горечь</p>
                                {pars() ? pars().renderParams[3] : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold mb-5">{product.product_name}</p>
                    <div>
                        <p className="text-lg font-semibold mb-1">Разновидность</p>
                        <p className="text-base font-medium mb-3">{variety ? variety.variety_name : null}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-1">Способ обжарки</p>
                        <p className="text-base font-medium mb-3">{roasting ? roasting.roasting_method_name : null}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-1">Способ обработки</p>
                        <p className="text-base font-medium mb-3">{processing ? processing.processing_method_name : null}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-1">Вкус</p>
                        <p className="text-base font-medium mb-3">{product.taste}</p>
                        <div className="flex flex-row">
                            <img src={cookies} width="65" alt="Вкус черный чай" className="mr-5"></img>
                            <img src={frutes} width="65" alt="Вкус черный чай" className="mr-5"></img>
                            <img src={tea} width="65" alt="Вкус черный чай" className="mr-5"></img>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mt-5">
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
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpenWeight(id)
                                                }}
                                                className={` ${openWeight === id ? "border-2 border-mainOrange-600" : ""} text-sm flex justify-center cursor-pointer rounded-lg py-1 px-4`}
                                            >
                                                {dem}
                                            </a>
                                            <div className={`${openWeight === id ? "flex" : "hidden"} mt-3 text-2xl justify-center transition-all duration-500`}>
                                                {price} р
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }) : null}
                    </div>
                    <div className="flex mt-5">
                        <button type="submit" className="bg-mainOrange-600 rounded-xl px-10 py-2">В корзину</button>
                    </div>
                </div>
            </div>
            <div className="flex mx-auto mt-12">
                <div className="flex flex-col w-full">
                    <ul className="flex space-x-10">
                        <li>
                            <a className={` ${openTab === 1 ? "border-2 border-mainOrange-600" : ""} text-lg flex justify-center cursor-pointer rounded-lg py-2 px-4`}
                               href="#"
                               onClick={(e) => {
                               e.preventDefault();
                               setOpenTab(1)
                            }}>
                                Описание
                            </a>
                        </li>
                        <li>
                            <a className={` ${openTab === 2 ? "border-2 border-mainOrange-600" : ""} text-lg flex justify-center cursor-pointer rounded-lg py-2 px-3`}
                               href="#"
                               onClick={(e) => {
                               e.preventDefault();
                               setOpenTab(2)
                            }}>
                                Способы приготовления
                            </a>
                        </li>
                        <li>
                            <a className={` ${openTab === 3 ? "border-2 border-mainOrange-600" : ""} text-lg flex justify-center cursor-pointer rounded-lg py-2 px-3`}
                               href="#"
                               onClick={(e) => {
                               e.preventDefault();
                               setOpenTab(3)
                            }}>
                                Отзывы
                            </a>
                        </li>
                    </ul>
                    <div className="flex px-14 py-8 mt-6 bg-lightGray rounded-lg tracking-wider">
                        <div className={`${openTab === 1 ? "flex" : "hidden"} flex w-full`}>
                            {product.product_description}
                        </div>
                        <div className={`${openTab === 2 ? "flex" : "hidden"} flex w-full`}>
                            <MakingMethods/>
                        </div>
                        <div className={`${openTab === 3 ? "flex" : "hidden"} flex w-full`}>
                            <ProductReview/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductItem;