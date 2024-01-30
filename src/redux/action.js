export const setFormValue = (field, value) => ({
    type: 'SET_FORM_VALUE',
    payload: { field, value },
});

export const submitForm = (formData) => {
  return { type: 'SUBMIT_FORM', payload: formData };
};
