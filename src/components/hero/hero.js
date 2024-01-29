import versoCard from "../../assets/bg-card-back.png";
import rectoCard from "../../assets/bg-card-front.png";
import cardLogo from "../../assets/card-logo.svg";

import { useSelector } from 'react-redux';

function Hero() {

    const formData = useSelector((state) => state);
    const cardholderName = formData.cardholderName || "Jane Appleseed";
    const cardNumber = formData.cardNumber || "0000 0000 0000 0000";
    const cardExpMM = formData.cardExpMM || "00";
    const cardExpYY = formData.cardExpYY || "00";
    const cardCvc = formData.cardCvc || "000";


    const formattedExpiration = `${cardExpMM}/${cardExpYY}`;

    return(
        <section className="hero">
            <div className="hero__verso">
                <p className="hero__verso__security">{cardCvc}</p>
                <img src={versoCard} alt='verso' className="hero__verso__img"/>
            </div>
            <div className="hero__recto">
                <img src={cardLogo} alt="card logo" className="hero__recto__cardLogo"/>
                <p className="hero__recto__number">{cardNumber}</p>
                <div className="hero__recto__infos">
                    <p className="hero__recto__infos__name">{cardholderName}</p>
                    <p className="hero__recto__infos__expiration">{formattedExpiration}</p>
                </div>
                <img src={rectoCard} alt='recto' className="hero__recto__img"/>
            </div>
        </section>
    );
};

export default Hero;
