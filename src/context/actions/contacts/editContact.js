import {
  EDIT_CONTACTS_LOADING,
  EDIT_CONTACTS_SUCCESS,
  EDIT_CONTACTS_FAIL,
} from '../../../constants/actionTypes/index';
import axiosInstance from '../../../helpers/axiosInterceptor';
export default (form, id) => dispatch => onSuccess => {
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber || '',
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
  };
  dispatch({
    type: EDIT_CONTACTS_LOADING,
  });
  axiosInstance
    .put(`/contacts/${id}`, requestPayload)
    .then(res => {
      dispatch({
        type: EDIT_CONTACTS_SUCCESS,
        payload: res.data,
      });

      onSuccess(res.data);
    })
    .catch(err => {
      dispatch({
        type: EDIT_CONTACTS_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something goes wrong'},
      });
    });
};
