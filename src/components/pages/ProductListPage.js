import ProductList from "../products/productList/ProductList"
import ProductsFilters from "../filters/productsFilters/ProductsFilters";
import ProductCategoryFilters from "../filters/productCategoryFilters/ProductCategoryFilters";

const ProductListPage = () => {
    return (
        <div className="flex w-full">
            <div className="w-1/6">
                <ProductsFilters/>
            </div>
            <div className="flex flex-col w-5/6">
                <ProductCategoryFilters/>
                <ProductList/>
            </div>
        </div>
    )
}

export default ProductListPage;