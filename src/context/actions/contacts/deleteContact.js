import {
  DELETE_CONTACTS_LOADING,
  DELETE_CONTACTS_SUCCESS,
  DELETE_CONTACTS_FAIL,
} from '../../../constants/actionTypes/index';
import axiosInstance from '../../../helpers/axiosInterceptor';
export default id => dispatch => onSuccess => {
  dispatch({
    type: DELETE_CONTACTS_LOADING,
  });
  axiosInstance
    .delete(`/contacts/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_CONTACTS_SUCCESS,
        payload: id,
      });
      onSuccess();
    })
    .catch(err => {
      dispatch({
        type: DELETE_CONTACTS_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something goes wrong'},
      });
    });
};
