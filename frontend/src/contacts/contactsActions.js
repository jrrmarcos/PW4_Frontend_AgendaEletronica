import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from "redux-form";
import { showTabs, selectTab } from "../common/tab/tabActions";

const BASE_URL = "http://localhost:8080"; //Variável a ser utilizada para não ficar repitindo a url no código
const INITIAL_VALUES = {}; //Reseta os valores do formulário

//------------Bloco que consulta as rotas do back-end para tomada de decisões
export function getList(userId) {
  const request = axios.get(`${BASE_URL}/meusContatos/${userId}`); //Axios para fazer requisições. Busca na url a rota meusContatos quand o Id do usuário for o atual (logado)
  return {
    type: "CONTACTS_LIST_FETCHED",
    payload: request,
  };
}

export function create(values) {
  values.contato_id = JSON.parse(localStorage.getItem("agenda_user")).id; //atribuindo o id igual ao do enviado no JSON
  return submit("adicionarContato", values, "post"); //insere o contato
}

export function update(values) {
  return submit("alterarContato", values, "put"); //altera um contato
}

export function remove(values) {
  return submit(`excluirContato/${values.id}`, values, "delete"); //remove o contato passando o id do compromisso como parametro na requisição
}
//----------------------------------

function submit(url, values, method) {
  return (dispatch) => {
    var userId = values.contato_id;
    const id = values.id ? values.id : null;
    axios[method](`${BASE_URL}/${url}`, values)
      .then((resp) => {
        toastr.success("Sucesso", "Operação Realizada com sucesso.");
        dispatch(init(userId));
      })
      .catch((e) => {
        console.log("e: ", e.response);
        if (e.response.status == 409) {
          if (
            typeof e.response.data != "string" &&
            e.response.data.length > 0
          ) {
            e.response.data.forEach((error) => toastr.error("Erro", error.msg));
          }
          if (typeof e.response.data == "string") {
            console.log("entrou tipo", e.response.data);
            toastr.error("Erro", e.response.data);
          }
          dispatch(init(userId));
        } else {
          toastr.error("Erro", "Não foi possível atender a requisição!");
          dispatch(init(userId));
        }
      });
  };
}

//Bloco que toma a ação dependendo do que o usuário escolher fazer
export function showUpdate(contact) {
  return [
    showTabs("tabUpdate"), //template buscado do contacts.jsx
    selectTab("tabUpdate"), //template buscado do contacts.jsx
    initialize("contactsForm", contact), //template buscado do contactsForm.jsx
  ];
}

export function showDelete(contact) {
  return [
    showTabs("tabDelete"), //template buscado do contacts.jsx
    selectTab("tabDelete"), //template buscado do contacts.jsx
    initialize("contactsForm", contact), //template buscado do contactsForm.jsx
  ];
}

export function init(userId) {
  return [
    showTabs("tabList", "tabCreate"), //Exibindo as opções de listar e incluir
    selectTab("tabList"), //Exibindo a lista dos contatos
    getList(userId), //para o usuário logado (id)
    initialize("contactsForm", INITIAL_VALUES), //reseta o formulário de contatos
  ];
  //------------------------------------
}
