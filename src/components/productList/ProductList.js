import {useGetProductsQuery} from "../../api/apiSlice";


const ProductList = () => {
    const {
        data: products = [],
        isLoading,
        isError
    } = useGetProductsQuery();

    if (isLoading) {
        return <h5 className="text-center mt-5">Загрузка</h5>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderProductList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Товаров пока нет</h5>
        }

        // return arr.map(({id, ...props}) => {
        //     return <div key={id} {...props}>{...props}</div>
        // })

        return arr.map(item => {
            return <div>{item.product_name}</div>
        })
    }

    const elements = renderProductList(products);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default ProductList;