import RegistrationForm from "../registrationForm/RegistrationForm";
import AuthorizationForm from "../authorizationForm/AuthorizationForm";
import {useState} from "react";

const RegistrationFormPage = () => {
    const [active, setActive] = useState(false);
    const onToggle = (active) => {
        setActive(!active)
    }

    return (
        <>
            {active ? <AuthorizationForm onToggle={() => onToggle(active)}/>
                : <RegistrationForm onToggle={() => onToggle(active)}/>}
        </>
    )
}
export default RegistrationFormPage;