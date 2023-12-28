import React from 'react';
import { useForm } from 'react-hook-form';

function Form() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return(
        <section className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form__input'>
                    <p className='form__input__title'>Cardholder Name</p>
                    <input className='form__input__cname input' type="text" placeholder="e.g. Jane Appleseed" {...register} />
                </div>
                <div className='form__input'>
                    <p className='form__input__title'>Card Number</p>
                    <input className='form__input__cnumber input' type="number" placeholder="e.g. 1234 5678 9123 0000" {...register("Card Number", {})} />
                </div>
                <div className='form__input'>
                    <p className='form__input__title'>Exp. Date (MM/YY)</p>
                    <div className='form__input__cexpiration--container'>
                        <input className='form__input__cexpiration input' type="number" placeholder="MM" {...register("Expiration date", {})} />
                        <input className='form__input__cexpiration input' type="number" placeholder="YY" {...register("Expiration date", {})} />
                    </div>
                </div>
                <div className='form__input'>
                    <p className='form__input__title'>CVC</p>
                    <input className='form__input__cvc input' type="number" placeholder="e.g. 123" {...register("CVC", {})} />
                </div>
        
                <input type="submit" className='form__submit'/>
            </form>
        </section>
    )
}

export default Form;