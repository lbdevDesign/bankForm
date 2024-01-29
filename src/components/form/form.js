import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFormValue, submitForm } from '../../redux/action';

/**
 * Composant Formulaire pour la saisie des détails de carte de crédit.
 * Utilise react-hook-form pour la gestion du formulaire et interagit avec Redux.
 */
function Form() {
  const dispatch = useDispatch();
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpMM, setCardExpMM] = useState('');
  const [cardExpYY, setCardExpYY] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const isValid = () => {
      return (
        cardholderName.length &&
        cardNumber.match(/^[0-9]{16}$/) &&
        cardExpMM.length &&
        cardExpYY.length &&
        cardCvc.length === 3
      );
    };

    if (!isValid) {
      if (!cardholderName) {
        setErrors({cardholderName: 'Cardholder name is required'});
      } if (!cardNumber.match(/^[0-9]{16}$/)) {
        setErrors({cardNumber: 'Card number is invalid'});
      } if (!cardExpMM.length || cardExpMM.length < 2) {
        setErrors({ cardExpMM: 'Expiration is required'});
      } if (!cardExpYY.length || cardExpYY.length < 2) {
        setErrors({ cardExpYY: 'Expiration is required'});
      } if (!cardCvc.length || cardCvc.length < 3) {
        setErrors({cardCvc: 'CVC is required (3 digits)'});
      }
    } else {
      setErrors({});
    };

    // Form is valid, submit to Redux action
    if (isValid) {
      const data = {
        cardholderName,
        cardNumber,
        cardExpMM,
        cardExpYY,
        cardCvc,
      };
      dispatch(submitForm(data));
    }

    console.log(errors);

  };

  function formatCardholderName(name) {
    const words = name.split(' ');
    const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedWords.join(' ');
  }

  function formatCardNumber(value) {
    const v = value.replace(/[^0-9]/gi, "").substr(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
    return parts.join(" ");
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

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
    }

    console.log(cardNumber);
  };

  useEffect(() => {
    const formattedCardNumber = formatCardNumber(cardNumber);
    setCardNumber(formattedCardNumber);
  }, [cardNumber]);


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
              value={cardExpMM}
              onChange={handleChange}
            />
            <input
              name='cardExpYY'
              className={`form__input__cexpiration smallInput ${errors.cardExpYY ? 'error-border' : ''}`}
              type="tel"
              placeholder="YY"
              maxLength={2} 
              value={cardExpYY}
              onChange={handleChange}
            />
          </div>
          {(errors.cardExpMM || errors.cardExpYY) && <p className="error-message">{errors.cardExpMM}</p>}
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