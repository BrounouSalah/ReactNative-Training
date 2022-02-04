import {
  CREATE_CONTACTS_LOADING,
  CREATE_CONTACTS_SUCCESS,
  CREATE_CONTACTS_FAIL,
} from '../../../constants/actionTypes/index';
import axiosInstance from '../../../helpers/axiosInterceptor';
export default form => dispatch => onSuccess => {
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber || '',
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
  };
  dispatch({
    type: CREATE_CONTACTS_LOADING,
  });
  axiosInstance
    .post('/contacts/', requestPayload)
    .then(res => {
      dispatch({
        type: CREATE_CONTACTS_SUCCESS,
        payload: res.data,
      });
      onSuccess();
    })
    .catch(err => {
      dispatch({
        type: CREATE_CONTACTS_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something goes wrong'},
      });
    });
};
