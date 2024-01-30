/**
 * Action creator for setting a form field value.
 * @param {string} field - The name of the form field.
 * @param {string} value - The value to set for the form field.
 * @returns {Object} - Action object with type 'SET_FORM_VALUE' and payload containing field and value.
 */
export const setFormValue = (field, value) => ({
    type: 'SET_FORM_VALUE',
    payload: { field, value },
});

/**
 * Action creator for submitting a form.
 * @param {Object} formData - The data to be submitted from the form.
 * @returns {Object} - Action object with type 'SUBMIT_FORM' and payload containing form data.
 */
export const submitForm = (formData) => {
  return { type: 'SUBMIT_FORM', payload: formData };
};
