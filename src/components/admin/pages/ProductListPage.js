import ProductList from "../productList/ProductList";
import EditProductForm from "../productList/EditProductForm";


const ProductListPage = () => {
    return (
        <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold mb-4">Товары</h1>
            <div className="flex w-full bg-mainWhite">
                <div className="w-3/5">
                    <ProductList/>
                </div>
                <div className="w-2/5">
                    <EditProductForm/>
                </div>
            </div>
        </div>
    )
}

export default ProductListPage;