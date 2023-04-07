import {useGetProductsItemQuery} from "../../api/apiSlice";
import { useParams, useLocation } from "react-router-dom";
import bobs250 from "../../assets/bobs250.png"


const ProductListItem = () => {
    const {id} = useParams();
    const {data: product = []} = useGetProductsItemQuery(id);
    const location = useLocation()
    const { props } = location.state

    return (
        <div>
            <div className="grid grid-cols-2 gap-16 w-full py-10 px-32 mt-10">
                <div className="flex flex-col items-center bg-lightGray rounded-lg py-10">
                    <img src={bobs250} width="250" alt="Картинка товара" />
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold mb-5">{product.product_name}</p>
                    <div>
                        <p className="text-lg font-semibold mb-1">Разновидность</p>
                        <p className="text-base font-medium mb-3">{props.variety}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-1">Способ обжарки</p>
                        <p className="text-base font-medium mb-3">{props.roasting}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-1">Способ обработки</p>
                        <p className="text-base font-medium mb-3">{props.processing}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-1">Вкус</p>
                        <p className="text-base font-medium mb-3">{product.taste}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductListItem;