import Logo from "../icons/Logo";
import Telegram from "../icons/Telegram";
import Instagram from "../icons/Instagram";
import {Link} from "react-router-dom";

const AppFooter = () => {
    return (
        <div className="px-14 mt-20 flex flex-col pb-6 text-sm">
            <div className="flex justify-between px-5 font-semibold items-center">
                <Logo width="100"/>
                <p>Адрес: г. Москва, ул. Болотниковская д.9</p>
                <p>adsintsov@gmail.com</p>
                <div className="flex justify-between items-center">
                    <p className="mr-3">+7 (995) 60 495 77</p>
                    <div className="flex flex-row cursor-pointer ">
                        <div className="mr-2">
                            <Telegram/>
                        </div>
                        <div>
                            <Instagram/>
                        </div>
                    </div>
                </div>
            </div>
            <span className="border border-lightGray my-4 mx-5"></span>
            <div className="flex justify-between px-5 items-center text-xs">
                <p>© 2023 Сфера кофе</p>
                <Link to="/">Политика конфиденциальности</Link>
            </div>
        </div>
    )

}
export default AppFooter;