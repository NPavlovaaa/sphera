import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchClient} from "../../api/userSlice";


const MainPage = ({activeClient}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuth())
        dispatch(fetchClient())
    }, [])
    return (
        <div>
            <div>Производим кофе для бизнеса</div>
        </div>

    )
}
export default MainPage;

// useEffect( () => {
//     async function fetchData() {
//         try {
//             // const res = await dispatch(fetchAuth)
//             setAuthUser(res)
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }, []);