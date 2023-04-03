import cup from "../../assets/cup.png"
import bobs from "../../assets/bob-coffee.png"
import gradient from "../../assets/gradient.png"

const MainPage = () => {

    return (
        <div className="flex flex-row p-28">
            <div className="w-1/2 4xl:text-10xl 3xl:text-9xl 3xl:p-4 2xl:text-8xl xl:text-7xl lg:text-6xl px-12 font-semibold">
                <h1>Производим <br/>кофе<br/> для бизнеса</h1>
            </div>
            <div className="ml-2 w-1/2">
                <img className="-top-8 right-0 absolute z-10" src={gradient} alt="градиент"/>
                <img className="mt-10 absolute z-20 w-5/12" src={bobs} alt="кофейные бобы"/>
                <img className="-top-6 ml-5 relative z-30 w-3/4" src={cup} alt="стакан кофе"/>
            </div>
        </div>

    )
}
export default MainPage;