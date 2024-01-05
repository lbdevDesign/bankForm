const initialState = {};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FORM_VALUE':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'SUBMIT_FORM':
      return { ...state, confirmation: true };
    default:
      return state;
  }
};

export default formReducer;