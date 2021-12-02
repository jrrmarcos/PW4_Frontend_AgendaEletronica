const INITIAL_STATE = { contactsList: [] };

//O bloco abaixo valida se a existe retorno de elementos na lista, caso exista, ela é apresentada
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CONTACTS_LIST_FETCHED":
      return { ...state, contactsList: action.payload.data };
    default:
      return state;
  }
};
