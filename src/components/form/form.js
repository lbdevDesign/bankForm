import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Form() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    const [val, setVal] = useState("");

    const onChange = (e) => {
        setVal(e.target.value);
      };

    function cc_format(value) {
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
                    <input className='form__input__cname largeInput' type="text" placeholder="e.g. Jane Appleseed" />
                </div>
                <div className='form__input2'>
                    <p className='form__input__title'>Card Number</p>
                    <input 
                    className='form__input__cnumber largeInput' 
                    type="tel" 
                    placeholder="e.g. 1234 5678 9123 0000" 
                    value={cc_format(val)}
                    onChange={onChange}
                    />
                </div>
                <div className='form__input3'>
                    <p className='form__input__title'>Exp. Date (MM/YY)</p>
                    <div className='form__input__cexpiration--container'>
                        <input className='form__input__cexpiration smallInput' type="number" placeholder="MM" />
                        <input className='form__input__cexpiration smallInput' type="number" placeholder="YY" />
                    </div>
                </div>
                <div className='form__input4'>
                    <p className='form__input__title'>CVC</p>
                    <input className='form__input__cvc smallInput' type="number" placeholder="e.g. 123" />
                </div>
        
                <input type="submit" className='form__submit' value='Confirm'/>
            </form>
        </section>
    )
}

export default Form;