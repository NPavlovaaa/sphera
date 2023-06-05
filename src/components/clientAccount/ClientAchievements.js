import Question from "../icons/Question";
import score from "../../assets/score.png";
import pack from "../../assets/pack.png";
import message from "../../assets/Message.png";
import List from "../icons/List";
import Star from "../icons/Star";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {fetchAchievements} from "../../api/userSlice";


const ClientAchievements = () => {
    const dispatch = useDispatch();
    const [achievements, setAchievements] = useState([])

    useEffect(() => {
        dispatch(fetchAchievements()).then(data => setAchievements(data.payload[0]))
    }, [])
    console.log(achievements)

    return(
        <div className="grid grid-cols-3 gap-10 w-full rounded-xl px-10">
            <div className="col-span-2 flex flex-col bg-mainWhite shadow-md border-t border-lightGray pt-8 rounded-lg">
                <div className="flex justify-between mb-5 px-10">
                    <div className="flex text-lg items-center">
                        <p className="text-mainGray mr-5">Уровень</p>
                        <p className="mr-2">{achievements ? achievements.level : null}</p>
                        <div className="flex items-center justify-center">
                            <div className="has-tooltip">
                            <span className="bg-mainWhite tooltip rounded-lg border-t border-lightGray shadow-lg text-xs ml-6 px-6 py-3 w-1/3">
                                <p className="pb-2">Уровни программы лольности позволяют Вам совершать выгодные покупки, а также различать в отзывах людей, имеющих разный опыт:</p>
                                <p className="pb-1"><span className="font-bold">Новичок: </span>с первого дня регистрации на сайте. Оплта бонусами до <span className="font-bold">20%</span> от стоимость заказа. Кэшбэк <span className="font-bold">1%</span> от стоимости заказа бонусами!</p>
                                <p className="pb-1"><span className="font-bold">Любитель: </span>+5 отзывов и +5 успешно завершенных заказов. Оплта бонусами до <span className="font-bold">30%</span> от стоимость заказа. Кэшбэк <span className="font-bold">3%</span> от стоимости заказа бонусами!</p>
                                <p className="pb-1"><span className="font-bold">Эксперт: </span>+12 отзывов и +10 успешно завершенных заказов. Оплта бонусами до <span className="font-bold">50%</span> от стоимость заказа. Кэшбэк <span className="font-bold">5%</span> от стоимости заказа бонусами!</p>
                            </span>
                            <Question width="18"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex text-lg items-center">
                        <p className="text-mainGray mr-3">Ваша скидка:</p>
                        <p>0%</p>
                    </div>
                </div>
                <div className="mb-5 px-10 text-sm">
                    <p className="pb-2.5">Для перехода на уровень Любитель осталось:</p>
                    <p className="pb-1"><span className="font-bold">5</span> заказов</p>
                    <p className="pb-1"><span className="font-bold">5</span> отзывов</p>
                </div>
                <div className="border-t border-lightGray rounded-lg py-5 px-10">
                    <div className="flex text-lg items-center">
                        <p className="text-mainGray mr-2">Счет</p>
                        <div className="flex items-center ml-10">
                            <p className="mr-1">{achievements ? achievements.scores : null}</p>
                            <img src={score} className="w-5 h-fit"/>
                        </div>
                    </div>
                    <div className="flex text-lg items-center">
                        <p className="text-mainGray mr-5 mt-2">Общая сумма покупок</p>
                        <p className="mt-2">{achievements ? achievements.orders_sum : null} р</p>
                    </div>
                </div>
            </div>
            <div className="col-span-1 flex flex-col bg-mainWhite shadow-md py-8 border-t border-lightGray rounded-lg px-10">
                <div className="flex text-lg items-center mb-5 w-full">
                    <List/>
                    <div className="flex justify-between w-full">
                        <p className="ml-2 text-mainGray mr-5">Оформлено заказов</p>
                        <p className="">{achievements ? achievements.orders_count : null}</p>
                    </div>
                </div>
                <div className="flex text-lg items-center mb-6 w-full">
                    <img src={pack} className="w-4 h-fit"/>
                    <div className="flex justify-between w-full">
                        <p className="ml-2 text-mainGray mr-5">Куплено разных сортов</p>
                        <p className="">{achievements ? achievements.varieties : null}</p>
                    </div>
                </div>
                <div className="flex text-lg items-center mb-6 w-full">
                    <img src={message} className="w-5 h-fit"/>
                    <div className="flex justify-between w-full">
                        <p className="ml-1 text-mainGray mr-5">Оставлено отзывов</p>
                        <p className="">{achievements ? achievements.reviews_count : null}</p>
                    </div>
                </div>
                <div className="flex text-lg items-center mb-5 w-full">
                    <Star width="18"/>
                    <div className="flex justify-between w-full">
                        <p className="ml-2 text-mainGray mr-5">Средняя оценка кофе</p>
                        <p className="">{achievements ? achievements.assessment : null}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ClientAchievements;