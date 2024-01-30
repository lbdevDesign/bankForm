import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFormValue, submitForm } from '../../redux/action';

/**
 * Composant Form pour la saisie des informations de la carte de crédit.
 * @component
 */
function Form() {
  // Utilisation du hook useDispatch pour accéder à la fonction dispatch de Redux
  // A utiliser pour récolter les données
  const dispatch = useDispatch();
  // State hooks pour les champs du formulaire et les erreurs
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpMM, setCardExpMM] = useState('');
  const [cardExpYY, setCardExpYY] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [errors, setErrors] = useState({
    cardholderName: '',
    cardNumber: '',
    cardExpMM: '',
    cardExpYY: '',
    cardCvc: '',
  });
  // Obtention de l'année en cours
  const currentYear = new Date().getFullYear();


  /**
   * Fonction de validation du formulaire.
   * @returns {boolean} - Indique si le formulaire est valide.
   */
  const isValid = () => {
    let validForm = false;
  
    // Vérification des conditions de validité des champs du formulaire
    if (
      cardholderName.length > 0 &&
      /[0-9 ]{19}$/.test(cardNumber) &&
      cardExpMM.length === 2 &&
      cardExpYY.length === 2 &&
      cardCvc.length === 3 &&
      parseInt(cardExpMM, 10) <= 12 && 
      parseInt(cardExpYY, 10) >= currentYear % 100 
    ) {
      validForm = true;
    }
    return validForm;
  };

  /**
   * Fonction appelée lors de la soumission du formulaire.
   * @param {Object} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = (e) => {
    // Empêcher le comportement par défaut du formulaire
    e.preventDefault();

    // Validation du formulaire
    const validForm = isValid();

    // Vérification des erreurs et mise à jour des messages d'erreur
    if (!validForm) {
      if (!cardCvc.length || cardCvc.length < 3) {
        setErrors({cardCvc: 'CVC is required (3 digits)'});
      } if (!cardExpYY.length || cardExpYY.length < 2) {
        setErrors({ cardExpYY: 'Expiration is required'});
      } if (!cardExpMM.length || cardExpMM.length < 2) {
        setErrors({ cardExpMM: 'Expiration is required'});
      } if (!cardNumber.match(/^[0-9 ]{19}$/)) {
        setErrors({cardNumber: 'Card number is invalid (16 digits)'});
      } if (cardholderName.length === 0) {
        setErrors({cardholderName: 'Cardholder name is required'});
      } if (!(parseInt(cardExpMM, 10) <= 12)) {
        setErrors({ cardExpMM: 'Month not valid'});
      } if (!(parseInt(cardExpYY, 10) >= currentYear % 100)) {
        setErrors({ cardExpYY: 'Card expired'});
      }
    } else { 
       // Réinitialisation des erreurs si le formulaire est valide
      setErrors({});
    };

    // Soumission du formulaire si il est valide
    if (isValid) {
      const data = {
        cardholderName,
        cardNumber,
        cardExpMM,
        cardExpYY,
        cardCvc,
      };
      // Dispatch de l'action Redux pour soumettre le formulaire
      dispatch(submitForm(data));
      // Mise à jour du local storage pour indiquer que le formulaire a été soumis
      localStorage.setItem("formSubmitted", JSON.stringify(true));
      // Rechargement de la page
      window.location.reload();
    }

  };

  /**
   * Fonction pour formater le nom du titulaire de la carte.
   * @param {string} name - Le nom du titulaire de la carte.
   * @returns {string} - Le nom formaté.
   */
  function formatCardholderName(name) {
    const words = name.split(' ');
    const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedWords.join(' ');
  }

   /**
   * Fonction pour formater le numéro de carte.
   * @param {string} value - Le numéro de carte.
   * @returns {string} - Le numéro de carte formaté.
   */
  function formatCardNumber(value) {
    const v = value.replace(/[^0-9]/gi, "").substr(0, 16);
    const parts = [];
    // Séparation du numéro de carte en groupes de 4 chiffres
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
    return parts.join(" ");
  }

  /**
   * Fonction pour formater les chiffres de la carte (exp. MM, exp. YY, CVC).
   * @param {string} value - Les chiffres de la carte.
   * @returns {string} - Les chiffres de la carte formatés.
   */
  function formatCardDigits(value) {
    // Suppression des caractères non numériques
    const vExp = value.replace(/[^0-9]/gi, "");
    return vExp;
  }

  /**
   * Fonction appelée lorsqu'un champ du formulaire est modifié.
   * @param {Object} event - L'événement de modification.
   */
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Mise à jour des champs du formulaire et dispatch de l'action Redux
    switch (name) {
      case 'cardholderName':
        setCardholderName(formatCardholderName(value));
        dispatch(setFormValue('cardholderName', value));
        break;
      case 'cardNumber':
        setCardNumber(value);
        dispatch(setFormValue('cardNumber', value));
        break;
      case 'cardExpMM':
        setCardExpMM(value);
        dispatch(setFormValue('cardExpMM', value));
        break;
      case 'cardExpYY':
        setCardExpYY(value);
        dispatch(setFormValue('cardExpYY', value));
        break;
      case 'cardCvc':
        setCardCvc(value);
        dispatch(setFormValue('cardCvc', value));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Formater les champs de la carte lorsqu'ils sont modifiés
    const formattedCardNumber = formatCardNumber(cardNumber);
    setCardNumber(formattedCardNumber);
    const formattedExpirationMM = formatCardDigits(cardExpMM);
    setCardExpMM(formattedExpirationMM);
    const formattedExpirationYY = formatCardDigits(cardExpYY);
    setCardExpYY(formattedExpirationYY);
    const formattedCvc = formatCardDigits(cardCvc);
    setCardCvc(formattedCvc);
  }, [cardNumber, cardExpMM, cardExpYY, cardCvc]);


  return (
    <section className="form__container">
      <form onSubmit={handleSubmit} className='form'>

        {/* Champ pour le nom de la carte */}
        <div className='form__input1'>
          <p className='form__input__title'>Cardholder Name</p>
          <input
            name='cardholderName'
            className={`form__input__cname largeInput ${errors.cardholderName ? 'error-border' : ''}`}
            type="text"
            placeholder="e.g. Jane Appleseed"
            maxLength={32} 
            value={cardholderName}
            onChange={handleChange}
          />
          {errors.cardholderName && <p className="error-message">{errors.cardholderName}</p>}
        </div>

        {/* Champ pour le numéro de carte */}
        <div className='form__input2'>
          <p className='form__input__title'>Card Number</p>
          <input
            name='cardNumber'
            className={`form__input__cnumber largeInput ${errors.cardNumber ? 'error-border' : ''}`}
            type="tel"
            placeholder="e.g. 1234 5678 9123 0000"
            maxLength={19} 
            value={cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
        </div>

        {/* Champ pour la date d'expiration */}
        <div className='form__input3'>
          <p className='form__input__title'>Exp. Date (MM/YY)</p>
          <div className='form__input__cexpiration--container'>
            <input
              name='cardExpMM'
              className={`form__input__cexpiration smallInput ${errors.cardExpMM ? 'error-border' : ''}`}
              type="tel"
              placeholder="MM"
              maxLength={2} 
              pattern="[0-9]{2}"
              value={cardExpMM}
              onChange={handleChange}
            />
            <input
              name='cardExpYY'
              className={`form__input__cexpiration smallInput ${errors.cardExpYY ? 'error-border' : ''}`}
              type="tel"
              placeholder="YY"
              maxLength={2} 
              pattern="[0-9]*$"
              value={cardExpYY}
              onChange={handleChange}
            />
          </div>
          {errors.cardExpMM && <p className="error-message">{errors.cardExpMM}</p>}
          { errors.cardExpYY && <p className="error-message">{errors.cardExpYY}</p>}
        </div>

        {/* Champ pour le CVC */}
        <div className='form__input4'>
          <p className='form__input__title'>CVC</p>
          <input
            name='cardCvc'
            className={`form__input__cvc smallInput ${errors.cardCvc ? 'error-border' : ''}`}
            type="tel"
            placeholder="e.g. 123"
            maxLength={3} 
            pattern="[0-9]*$"
            value={cardCvc}
            onChange={handleChange}
          />
          {errors.cardCvc && <p className="error-message">{errors.cardCvc}</p>}
        </div>

        {/* Bouton de soumission du formulaire */}
        <input type="submit" className='form__submit' value='Confirm' />
      </form>
    </section>
  );
}

export default Form;