import {ErrorMessage, Field} from "formik";

const RatingRender = (name, reset) =>{
    const ratings = document.querySelectorAll('.rating');
    if(ratings.length > 0){
        initRatings();
    }
    const assessmentName = name.name;

    function initRatings(){
        let ratingActive, ratingValue;
        for(let index = 0; index < ratings.length; index++){
            const rating = ratings[index];
            initRating(rating)
        }
        function initRating(rating){
            initRatingVars(rating);
            setRatingActiveWidth();
            if(rating.classList.contains('rating_set')){
                setRating(rating);
            }
        }

        function initRatingVars(rating){
            ratingActive = rating.querySelector('.rating__active');
            ratingValue = rating.querySelector('.rating__value');
            reset ? ratingValue.innerHTML = "0" : ratingValue.innerHTML = ratingValue.innerHTML
            ratingValue.style.opacity = "0";
        }

        function setRatingActiveWidth(index = ratingValue.innerHTML){
            const ratingActiveWidth = index / 0.05;
            ratingActive.style.width = `${ratingActiveWidth}%`
        }

        function setRating(rating){
            const ratingItems = rating.querySelectorAll('.rating__item');
            for(let index = 0; index < ratingItems.length; index++) {
                const ratingItem = ratingItems[index];
                ratingItem.addEventListener("mouseenter", function (e){
                    initRatingVars(rating);
                    setRatingActiveWidth(ratingItem.value);
                })
                ratingItem.addEventListener("mouseleave", function (e){
                    setRatingActiveWidth();
                })
                ratingItem.addEventListener("click", function (e){
                    initRatingVars(rating);
                    // setRatingActiveWidth();
                    // assessment = ratingItem.value;
                    ratingValue.innerHTML = index + 1;
                    setRatingActiveWidth();

                })
            }
        }
    }
    return(
        <div className="rating rating_set">
            <div className="rating__body">
                <div className="rating__active"></div>
                <div className="rating__items">
                    <Field  type="radio"
                            className="rating__item"
                            name={assessmentName}
                            value="1"
                            id={assessmentName}
                            autoComplete="off"/>
                    <Field  type="radio"
                            className="rating__item"
                            name={assessmentName}
                            value="2"
                            id={assessmentName}
                            autoComplete="off"/>
                    <Field  type="radio"
                            className="rating__item"
                            name={assessmentName}
                            value="3"
                            id={assessmentName}
                            autoComplete="off"/>
                    <Field  type="radio"
                            className="rating__item"
                            name={assessmentName}
                            value="4"
                            id={assessmentName}
                            autoComplete="off"/>
                    <Field  type="radio"
                            className="rating__item"
                            name={assessmentName}
                            value="5"
                            id={assessmentName}
                            autoComplete="off"/>
                </div>
            </div>
            <div className="rating__value">0</div>
        </div>
    )
}
export default RatingRender;

