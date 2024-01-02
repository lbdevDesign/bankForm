import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Form() {

    const { handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    const [val, setVal] = useState("");

    const onChange = (e) => {
        setVal(e.target.value);
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
                    className='form__input__cname largeInput' 
                    type="text" 
                    placeholder="e.g. Jane Appleseed" 
                    required
                    pattern='[a-z A-Z-]+'/>
                </div>
                <div className='form__input2'>
                    <p className='form__input__title'>Card Number</p>
                    <input 
                    className='form__input__cnumber largeInput' 
                    type="tel" 
                    placeholder="e.g. 1234 5678 9123 0000" 
                    value={cn_format(val)}
                    onChange={onChange}
                    required />
                </div>
                <div className='form__input3'>
                    <p className='form__input__title'>Exp. Date (MM/YY)</p>
                    <div className='form__input__cexpiration--container'>
                        <input 
                        className='form__input__cexpiration smallInput' 
                        type="tel" 
                        placeholder="MM"
                        pattern='\d\d'
                        required />
                        <input 
                        className='form__input__cexpiration smallInput' 
                        type="tel" 
                        placeholder="YY"
                        pattern='\d\d'
                        required />   
                    </div>
                </div>
                <div className='form__input4'>
                    <p className='form__input__title'>CVC</p>
                    <input 
                    className='form__input__cvc smallInput' 
                    type="tel" 
                    placeholder="e.g. 123" 
                    pattern="\d{3}"
                    required />
                </div>
        
                <input type="submit" className='form__submit' value='Confirm'/>
            </form>
        </section>
    )
}

export default Form;