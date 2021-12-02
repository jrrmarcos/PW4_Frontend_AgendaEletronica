const INITIAL_STATE = { appointmentList: [] }; //inicia com uma lista de compromissos vazia

export default (state = INITIAL_STATE, action) => {
  //O bloco abaixo valida se a existe retorno de elementos na lista, caso exista, ela é apresentada
  switch (action.type) {
    case "APPOINTMENT_LIST_FETCHED":
      let list = action.payload.data;
      if (list.length > 0) {
        list.map((item) => {
          item.data = item.data.split(".")[0];
        });
      }
      return { ...state, appointmentList: list };
    default:
      return state;
  }
};
