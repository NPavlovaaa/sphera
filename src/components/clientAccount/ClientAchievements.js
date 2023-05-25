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
        <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col">
                <div className="flex text-lg items-center mb-5">
                    <p className="text-mainGray mr-5">Уровень</p>
                    <p className="mr-2">{achievements ? achievements.level : null}</p>
                    <Question/>
                </div>
                <div className="flex text-lg items-center">
                    <p className="text-mainGray mr-2">Счет</p>
                    <div className="flex items-center ml-10">
                        <p className="mr-1">{achievements ? achievements.scores : null}</p>
                        <img src={score} className="w-5 h-fit"/>
                    </div>
                </div>
                <div className="flex text-lg items-center mt-16">
                    <p className="text-mainGray mr-5 mt-2">Общая сумма покупок</p>
                    <p className="mt-2">{achievements ? achievements.orders_sum : null} р</p>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex text-lg items-center mb-5">
                    <List/>
                    <div className="flex justify-between w-60">
                        <p className="ml-2 text-mainGray mr-5">Оформлено заказов</p>
                        <p className="">{achievements ? achievements.orders_count : null}</p>
                    </div>
                </div>
                <div className="flex text-lg items-center mb-5">
                    <img src={pack} className="w-4 h-fit"/>
                    <div className="flex justify-between w-60">
                        <p className="ml-2 text-mainGray mr-5">Куплено разных сортов</p>
                        <p className="">{achievements ? achievements.varieties : null}</p>
                    </div>
                </div>
                <div className="flex text-lg items-center mb-5">
                    <img src={message} className="w-5 h-fit"/>
                    <div className="flex justify-between w-60">
                        <p className="ml-1 text-mainGray mr-5">Оставлено отзывов</p>
                        <p className="mr-1">{achievements ? achievements.reviews_count : null}</p>
                    </div>
                </div>
                <div className="flex text-lg items-center mb-5">
                    <Star width="18"/>
                    <div className="flex justify-between w-60">
                        <p className="ml-2 text-mainGray mr-5">Средняя оценка кофе</p>
                        <p className="">2</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ClientAchievements;