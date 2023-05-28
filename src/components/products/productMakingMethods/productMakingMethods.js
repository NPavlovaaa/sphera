import {useEffect} from "react";
import {fetchProductMakingMethods} from "../productSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";
import SetMakingMethods from "./setMakingMethods";

const ProductMakingMethods = ({id}) => {
    const dispatch = useDispatch();
    const [making_methods, setMakingMethods] = useState([]);
    const [openTab, setOpenTab] = useState(0);

    useEffect(() => {
        dispatch(fetchProductMakingMethods(id))
            .then(data => {
                setMakingMethods(data.payload)
                setOpenTab(data.payload[0].making_method_id)
            })
    }, [])

    // function renderMethods(item){
    //     if(item.making_method_id === 1){
    //         return (
    //             <div>
    //                 <p className="font-semibold text-lg mb-2">Рекомендуемые пропорции заваривания</p>
    //                 <p>60 грамм кофе на литр воды. В стандартной чашке около 200 миллилитров. На такой объем вам понадобится около двенадцати грамм кофе — это примерно 4 чайных ложки.</p>
    //                 <p className="font-semibold text-lg mb-2">Рекомендуемые пропорции заваривания</p>
    //                 <p>60 грамм кофе на литр воды. В стандартной чашке около 200 миллилитров. На такой объем вам понадобится около двенадцати грамм кофе — это примерно 4 чайных ложки.</p>
    //
    //             </div>
    //         )
    //     }
    // }
    let width;
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between w-3/5">
                {making_methods ? making_methods.map(item =>{
                    item.making_method_id === 5 ? width = 27 : width = 45
                    return(
                        <div className="flex flex-col mb-5 justify-center items-center">
                            <div className={`${openTab === item.making_method_id ? "border-2 border-mainOrange-600 rounded-xl" : ""} flex justify-end items-end flex-col w-fit h-20 px-4 py-3`}
                                 onClick={(e) => {
                                     e.preventDefault();
                                     setOpenTab(item.making_method_id)
                                 }}>
                                <img src={item.image} width={width}/>
                            </div>
                            <p>{item.making_method_name}</p>
                        </div>
                    )}
                ) : null}
            </div>
            <div className="bg-lightGray px-14 py-10 w-full">
                <SetMakingMethods id={openTab}/>
            </div>
        </div>
    )
}
export default ProductMakingMethods;