const INITIAL_STATE = {usersList: []} //inicia com uma lista de usuários vazia

//O bloco abaixo valida se a existe retorno de elementos na lista, caso exista, ela é apresentada
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERS_LIST_FETCHED':
            return { ...state, usersList: action.payload.data }
        default:
            return state
    }
}