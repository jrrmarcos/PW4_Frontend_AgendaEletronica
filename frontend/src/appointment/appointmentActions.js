import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from "redux-form";
import { showTabs, selectTab } from "../common/tab/tabActions";

const BASE_URL = "http://localhost:8080"; //Variável a ser utilizada para não ficar repitindo a url no código
const INITIAL_VALUES = {}; //Reseta os valores do formulário
var usuario_id; 

//-----------Bloco que consulta as rotas do back-end para tomada de decisões
export function getList(userId) {
  const request = axios.get(`${BASE_URL}/meusCompromissos/${userId}`); //Axios para fazer requisições. Busca na url a rota meusCompromissos quando o Id do usuário for o atual logado
  return {
    type: "APPOINTMENT_LIST_FETCHED",
    payload: request,
  };
}

export function create(values) {
  values.contato_id = usuario_id; //pegando o campo contato id do JSON e setando como o id do usuário logado, para atribuir a ele o compromisso
  return submit("inserirCompromisso", values, "post"); //insere o compromisso
}

export function update(values) {
  return submit("alterarCompromisso", values, "put"); //altera um compromisso
}

export function remove(values) {
  return submit(`excluirCompromisso/${values.id}`, values, "delete"); //deleta um compromisso
}
//------------------------

function submit(url, values, method) {
  return (dispatch) => {
    const id = values.id ? values.id : null;
    axios[method](`${BASE_URL}/${url}`, values)
      .then((resp) => {
        toastr.success("Sucesso", "Operação Realizada com sucesso.");
        dispatch(init(usuario_id));
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
          dispatch(init(usuario_id));
        } else {
          toastr.error("Erro", "Não foi possível atender a requisição!");
          dispatch(init(usuario_id));
        }
      });
  };
}

//---Bloco que toma a ação dependendo do que o usuário escolher fazer
export function showUpdate(appointment) {
  return [
    showTabs("tabUpdate"), //template buscado do appointment.jsx
    selectTab("tabUpdate"), //template buscado do appointment.jsx
    initialize("appointmentForm", appointment), //template buscado do appointmentForm.jsx
  ];
}

export function showDelete(appointment) {
  return [
    showTabs("tabDelete"),//template buscado do appointment.jsx
    selectTab("tabDelete"),//template buscado do appointment.jsx
    initialize("appointmentForm", appointment),//template buscado do appointmentForm.jsx
  ];
}

export function init(userId) {
  usuario_id = JSON.parse(localStorage.getItem("agenda_user")).id; //pegando o id do usuário
  return [
    showTabs("tabList", "tabCreate"), //Exibindo as opções de listar e incluir
    selectTab("tabList"), //Exibindo a lista dos compromissoss
    getList(userId), //para o usuário logado (id)
    initialize("appointmentForm", INITIAL_VALUES), //reseta o formulário de compromissos
  ];
//-----------------------------------
}