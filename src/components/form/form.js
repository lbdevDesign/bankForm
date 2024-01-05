import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormValue, submitForm } from '../../redux/action';

function Form() {
  const dispatch = useDispatch();
  const { handleSubmit, formState: { errors }, setError } = useForm();
  const [val, setVal] = useState("");

  const onSubmit = (data) => {
    let hasErrors = false;
  
    // Vérifier si le champ cardholderName est vide
    if (!data.cardholderName) {
      setError('cardholderName', {
        type: 'manual',
        message: 'Can\'t be blank',
      });
      hasErrors = true;
    }
  
    // Vérifier si le champ cardNumber est vide
    if (!data.cardNumber) {
      setError('cardNumber', {
        type: 'manual',
        message: 'Can\'t be blank',
      });
      hasErrors = true;
    }
  
    // Vérifier si le champ cardExpMM est vide
    if (!data.cardExpMM) {
      setError('cardExpMM', {
        type: 'manual',
        message: 'Can\'t be blank',
      });
      hasErrors = true;
    }
  
    // Vérifier si le champ cardExpYY est vide
    if (!data.cardExpYY) {
      setError('cardExpYY', {
        type: 'manual',
        message: 'Can\'t be blank',
      });
      hasErrors = true;
    }
  
    // Vérifier si le champ cardCvc est vide
    if (!data.cardCvc) {
      setError('cardCvc', {
        type: 'manual',
        message: 'Can\'t be blank',
      });
      hasErrors = true;
    }
  
    // Si des erreurs sont détectées, ne pas soumettre le formulaire
    if (hasErrors) {
      return;
    }
  
    // Soumettre le formulaire si aucune erreur n'est détectée
    dispatch(submitForm(data));
  };

  const onChange = (e, field) => {
    const inputValue = e.target.value;
    let formattedValue = inputValue;

    if (field === 'cardExpMM') {
      const numericValue = parseInt(inputValue, 10);
      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 12) {
        formattedValue = inputValue;
      }
    } else {
      formattedValue = cn_format(inputValue);
    }

    dispatch(setFormValue(field, formattedValue));
  };

  useEffect(() => {
    const formattedValue = cn_format(val);
    dispatch(setFormValue('cardNumber', formattedValue));
  }, [val, dispatch]);

  function cn_format(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  }

  return (
    <section className="form__container">
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <div className='form__input1'>
          <p className='form__input__title'>Cardholder Name</p>
          <input
            className={`form__input__cname largeInput ${errors.cardholderName ? 'error-border' : ''}`}
            type="text"
            placeholder="e.g. Jane Appleseed"
            onChange={(e) => onChange(e, 'cardholderName')}
          />
          {errors.cardholderName && <p className="error-message">Can't be blank</p>}
        </div>
        <div className='form__input2'>
          <p className='form__input__title'>Card Number</p>
          <input
            className={`form__input__cnumber largeInput ${errors.cardNumber || errors.cardNumberLetter ? 'error-border' : ''}`}
            type="tel"
            placeholder="e.g. 1234 5678 9123 0000"
            value={cn_format(val)}
            onChange={(e) => setVal(e.target.value)}
          />
          {errors.cardNumber && <p className="error-message">Can't be blank</p>}
          {errors.cardNumberLetter && <p className="error-message">Wrong format, numbers only</p>}
        </div>
        <div className='form__input3'>
          <p className='form__input__title'>Exp. Date (MM/YY)</p>
          <div className='form__input__cexpiration--container'>
            <input
              className={`form__input__cexpiration smallInput ${errors.cardExpMM ? 'error-border' : ''}`}
              type="tel"
              placeholder="MM"
              maxLength={2} 
              onChange={(e) => onChange(e, 'cardExpMM')}
            />
            <input
              className={`form__input__cexpiration smallInput ${errors.cardExpYY ? 'error-border' : ''}`}
              type="tel"
              placeholder="YY"
              maxLength={2} 
              onChange={(e) => onChange(e, 'cardExpYY')}
            />
          </div>
          {errors.cardExpMM && <p className="error-message">Can't be blank</p>}
        </div>
        <div className='form__input4'>
          <p className='form__input__title'>CVC</p>
          <input
            className={`form__input__cvc smallInput ${errors.cardCvc ? 'error-border' : ''}`}
            type="tel"
            placeholder="e.g. 123"
            maxLength={3} 
            onChange={(e) => onChange(e, 'cardCvc')}
          />
          {errors.cardCvc && <p className="error-message">Can't be blank</p>}
        </div>

        <input type="submit" className='form__submit' value='Confirm' />
      </form>
    </section>
  );
}

export default Form;