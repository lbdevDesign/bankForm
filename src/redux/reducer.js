/**
 * Initial state for the form reducer.
 * @type {Object}
 */
const initialState = {};

/**
 * Reducer function for handling form-related actions.
 * @param {Object} state - Current state of the form.
 * @param {Object} action - Action object with a type and payload.
 * @returns {Object} - New state after applying the action.
 */
const formReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * Action type for setting a form field value.
     * @type {string}
     */
    case 'SET_FORM_VALUE':
      return { ...state, [action.payload.field]: action.payload.value };

    /**
     * Action type for submitting the form.
     * Updates the state with confirmation set to true.
     * @type {string}
     */
    case 'SUBMIT_FORM':
      return { ...state, confirmation: true };

    // Default case returns the current state.
    default:
      return state;
  }
};

export default formReducer;