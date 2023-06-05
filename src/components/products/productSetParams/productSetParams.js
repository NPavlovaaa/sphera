import Case1 from "../../icons/Case1";
import Case2 from "../../icons/Case2";
import Case3 from "../../icons/Case3";
import Case4 from "../../icons/Case4";
import Case5 from "../../icons/Case5";


const productSetParams = (product) => {
    const allParams = [product.acidity, product.density, product.sweetness, product.bitterness]

    let params;
    const renderParams = allParams.map(item => {

        switch (item) {
            case 1:
                params = <Case1/>
                break;
            case 2:
                params = <Case2/>
                break;
            case 3:
                params = <Case3/>
                break;
            case 4:
                params = <Case4/>
                break;
            case 5:
                params = <Case5/>
                break;
            default:
                throw new Error('Unexpected process state');
        }
        return params
    })

    return {renderParams}
}
export default productSetParams;