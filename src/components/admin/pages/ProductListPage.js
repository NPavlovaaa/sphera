import ProductList from "../productList/ProductList";
import EditProductForm from "../productList/EditProductForm";


const ProductListPage = () => {
    return (
        <div className="flex w-full bg-mainWhite">
            <div className="w-3/5">
                <ProductList/>
            </div>
            <div className="w-2/5">
                <EditProductForm/>
            </div>
        </div>
    )
}

export default ProductListPage;