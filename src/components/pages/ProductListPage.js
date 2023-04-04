import ProductList from "../productList/ProductList"
import ProductsFilters from "../productsFilters/ProductsFilters";

const ProductListPage = () => {
    return (
        <div className="flex w-full">
            <div className="w-1/6">
                <ProductsFilters/>
            </div>
            <div className="w-5/6">
                <ProductList/>
            </div>
        </div>
    )
}

export default ProductListPage;