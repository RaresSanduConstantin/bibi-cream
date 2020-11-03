import axios from "axios";
import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAIL,
  CONTACT_DETAILS_REQUEST,
  CONTACT_DETAILS_SUCCESS,
  CONTACT_DETAILS_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_FAIL,
} from "../constants/contactConstants";

export const contactMessage = (sentMessage) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/contact", sentMessage, config);

    dispatch({ type: CONTACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const contactDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTACT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/contact", config);

    dispatch({ type: CONTACT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const contactById = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: CONTACT_DETAILT_BY_ID_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(`/api/contact/${id}`, config);

//     dispatch({ type: CONTACT_DETAILT_BY_ID_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: CONTACT_DETAILT_BY_ID_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const contactDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTACT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/contact/${id}`, config);

    dispatch({ type: CONTACT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CONTACT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
