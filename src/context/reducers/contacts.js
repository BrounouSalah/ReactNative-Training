const contacts = (state, {type, payload}) => {
  switch (type) {
    case 'GET_CONTACTS':
      return;

    default:
      return state;
  }
};
export default contacts;
