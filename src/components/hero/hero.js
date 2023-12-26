import versoCard from "../../assets/bg-card-back.png";
import rectoCard from "../../assets/bg-card-front.png";

import cardLogo from "../../assets/card-logo.svg";

function Hero() {
    return(
        <section className="hero">
            <div className="hero__verso">
                <p className="hero__verso__security">000</p>
                <img src={versoCard} alt='verso' className="hero__verso__img"/>
            </div>
            <div className="hero__recto">
                <img src={cardLogo} alt="card logo" className="hero__recto__cardLogo"/>
                <p className="hero__recto__number">0000 0000 0000 0000</p>
                <div className="hero__recto__infos">
                    <p className="hero__recto__infos__name">Jane Appleseed</p>
                    <p className="hero__recto__infos__expiration">00/00</p>
                </div>
                <img src={rectoCard} alt='recto' className="hero__recto__img"/>
            </div>
        </section>
    );
};

export default Hero;
