import React from 'react';
import validationImg from "../../assets/icon-complete.svg"

/**
 * Validation component displayed after successful form submission.
 * @component
 */
const Validation = () => {

  /**
   * Click event handler for the "Continue" button.
   * Resets the formSubmitted flag in local storage and reloads the page.
   */
  function onClick() {
    localStorage.setItem("formSubmitted", JSON.stringify(false));
    window.location.reload();
  }

  return (
    <div className='validation'>
      <img src={validationImg} alt="Thank you" className='validation__img'/>
      <h2 className='validation__title'>Thank you!</h2>
      <p className='validation__text'>We've added your card details.</p>
      <button className='validation__button' onClick={() => onClick()}>Continue</button>
    </div>
  );
};

export default Validation;