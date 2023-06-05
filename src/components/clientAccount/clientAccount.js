import {useState} from "react";
import ClientInfo from "./ClientInfo";
import ClientAchievements from "./ClientAchievements";


const ClientAccount = () => {
    const [openTab, setOpenTab] = useState(1);

    return(
        <div className="flex flex-col px-32 pt-10 pb-5">
            <h1 className="text-3xl font-bold">Личный кабинет</h1>
            <div className="flex mt-12">
                <div className="flex flex-col w-full">
                    <ul className="flex space-x-10">
                        <li>
                            <a className={` ${openTab === 1 ? "border-2 border-mainOrange-600" : ""} text-lg flex justify-center cursor-pointer rounded-lg py-1 px-8`}
                               href="src/components/products/productItem/ProductItem#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   setOpenTab(1)
                               }}>
                                Личная информация
                            </a>
                        </li>
                        <li>
                            <a className={` ${openTab === 2 ? "border-2 border-mainOrange-600" : ""} text-lg flex justify-center cursor-pointer rounded-lg py-1 px-8`}
                               href="src/components/products/productItem/ProductItem#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   setOpenTab(2)
                               }}>
                                Достижения
                            </a>
                        </li>
                    </ul>
                    <div className="flex flex-row rounded-xl pt-4 pb-5 w-full h-fit mt-5">
                        <div className={`${openTab === 1 ? "flex" : "hidden"} flex w-full`}>
                            <ClientInfo/>
                        </div>
                        <div className={`${openTab === 2 ? "flex" : "hidden"} flex w-full`}>
                            <ClientAchievements/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientAccount