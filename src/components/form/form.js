import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormValue } from '../../redux/action';

function Form() {

    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    const [val, setVal] = useState("");

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
    
    const validateMonth = (value) => {
        const numericValue = parseInt(value, 10);
        return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 12;
    };

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


    return(
        <section className="form__container">
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className='form__input1'>
                    <p className='form__input__title'>Cardholder Name</p>
                    <input 
                    {...register('cardholderName', { required: true, pattern: /[a-zA-Z-]+/ })}
                    className='form__input__cname largeInput' 
                    type="text" 
                    placeholder="e.g. Jane Appleseed" 
                    required
                    pattern='[a-z A-Z-]+'
                    onChange={(e) => onChange(e, 'cardholderName')}/>
                </div>
                <div className='form__input2'>
                    <p className='form__input__title'>Card Number</p>
                    <input 
                    {...register('cardNumber', { required: true })}
                    className='form__input__cnumber largeInput' 
                    type="tel" 
                    placeholder="e.g. 1234 5678 9123 0000" 
                    value={cn_format(val)}
                    onChange={(e) => setVal(e.target.value)}
                    required />
                </div>
                <div className='form__input3'>
                    <p className='form__input__title'>Exp. Date (MM/YY)</p>
                    <div className='form__input__cexpiration--container'>
                    {errors.cardExpMM && <p className="error-message">Invalid month</p>}
                        <input 
                        className='form__input__cexpiration smallInput' 
                        type="tel" 
                        placeholder="MM"
                        pattern='\d\d'
                        {...register('cardExpMM', { validate: (value) => validateMonth(value) })}
                        onChange={(e) => onChange(e, 'cardExpMM')}
                        required />
                        <input 
                        {...register('cardExpYY', { required: true })}
                        className='form__input__cexpiration smallInput' 
                        type="tel" 
                        placeholder="YY"
                        pattern='\d\d'
                        onChange={(e) => onChange(e, 'cardExpYY')}
                        required />   
                    </div>
                </div>
                <div className='form__input4'>
                    <p className='form__input__title'>CVC</p>
                    <input 
                    {...register('cardCvc', { required: true, pattern: /\d{3}/ })}
                    className='form__input__cvc smallInput' 
                    type="tel" 
                    placeholder="e.g. 123" 
                    pattern="\d{3}"
                    onChange={(e) => onChange(e, 'cardCvc')}
                    required />
                </div>
        
                <input type="submit" className='form__submit' value='Confirm'/>
            </form>
        </section>
    )
}

export default Form;