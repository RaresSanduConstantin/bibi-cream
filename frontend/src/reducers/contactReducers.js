import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAIL,
  CONTACT_RESET,
  CONTACT_DETAILS_REQUEST,
  CONTACT_DETAILS_SUCCESS,
  CONTACT_DETAILS_FAIL,
  CONTACT_DETAILS_RESET,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_FAIL,
} from "../constants/contactConstants";

export const contactCreateMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_REQUEST:
      return { loading: true };
    case CONTACT_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_RESET:
      return {};
    default:
      return state;
  }
};

export const contactListReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case CONTACT_DETAILS_REQUEST:
      return { loading: true };
    case CONTACT_DETAILS_SUCCESS:
      return { loading: false, contacts: action.payload };
    case CONTACT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_DETAILS_RESET:
      return { contacts: [] };
    default:
      return state;
  }
};

export const contactDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_DELETE_REQUEST:
      return { loading: true };
    case CONTACT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
