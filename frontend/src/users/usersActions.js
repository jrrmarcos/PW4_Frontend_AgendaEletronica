import axios from "axios";
import {toastr} from "react-redux-toastr";
import {reset as resetForm, initialize} from "redux-form";
import {showTabs, selectTab} from "../common/tab/tabActions";

const BASE_URL = "http://localhost:8080"; //Variável a ser utilizada para não ficar repitindo a url no código
const INITIAL_VALUES = {}; //Reseta os valores do formulário

//-----------Bloco que consulta as rotas do back-end para tomada de decisões
export function getList() {
  const request = axios.get(`${BASE_URL}/listarUsuarios`); //Axios para fazer requisições. Busca na url a rota meusCompromissos quando o Id do usuário for o atual logado
  return {
    type: "USERS_LIST_FETCHED",
    payload: request,
  };
}

export function create(values) {
  return submit("adicionarUsuario", values, "post"); //insere o usuário
}

export function update(values) {
  return submit("alterarUsuario", values, "put"); //altera um usuário
}

export function remove(values) {
  return submit(`excluirUsuario/${values.id}`, values, "delete"); //deleta um usuário
}
//------------------------

function submit(url, values, method) {
  return (dispatch) => {
    const id = values.id ? values.id : null;
    values.admin = values.admin == 1 ? 1 : 0;
    axios[method](`${BASE_URL}/${url}`, values)
      .then((resp) => {
        toastr.success("Sucesso", "Operação Realizada com sucesso.");
        dispatch(init());
      })
      .catch((e) => {
        if (e.response.status == 409) {
          if (
            typeof e.response.data != "string" &&
            e.response.data.length > 0
          ) {
            e.response.data.forEach((error) => toastr.error("Erro", error.msg));
          }
          if (typeof e.response.data == "string") {
            toastr.error("Erro", e.response.data);
          }
        } else {
          toastr.error("Erro", "Não foi possível atender a requisição!");
        }
      });
  };
}

//---Bloco que toma a ação dependendo do que o usuário escolher fazer
export function showUpdate(user) {
  return [
    showTabs("tabUpdate"),
    selectTab("tabUpdate"),
    initialize("usersForm", user),
  ];
}

export function showDelete(user) {
  return [
    showTabs("tabDelete"),
    selectTab("tabDelete"),
    initialize("usersForm", user),
  ];
}

export function init() {
  return [
    showTabs("tabList", "tabCreate"), //Exibindo as opções de listar e incluir
    selectTab("tabList"), //Exibindo a lista dos compromissoss
    getList(), 
    initialize("usersForm", INITIAL_VALUES), //reseta o formulário de usuários
  ];
  //-----------------------------------
}
