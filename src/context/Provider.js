import React, {createContext, useReducer} from 'react';
import auth from './reducers/auth';
import authInitState from './initialStates/authInitState';
import contacts from './reducers/contacts';
import contactsInitState from './initialStates/contactsInitState';
export const GlobalContext = createContext({});
const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitState);
  const [contactsState, contactsDispatch] = useReducer(
    contacts,
    contactsInitState,
  );
  return (
    <GlobalContext.Provider
      value={{
        authState,
        contactsState,
        authDispatch,
        contactsDispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
