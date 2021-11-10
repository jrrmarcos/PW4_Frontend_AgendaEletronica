import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from "redux-form";
import { showTabs, selectTab } from "../common/tab/tabActions";

const BASE_URL = "http://localhost:8080";
const INITIAL_VALUES = {};
var usuario_id; 

export function getList(userId) {
  console.log("userId em CompromissoForm getList: ", userId);
  const request = axios.get(`${BASE_URL}/meusCompromissos/${userId}`);
  return {
    type: "APPOINTMENT_LIST_FETCHED",
    payload: request,
  };
}

export function create(values) {
  console.log("value em create: ", values);
  //values.contato_id = JSON.parse(localStorage.getItem("agenda_user")).id;
  values.contato_id = usuario_id;
  return submit("inserirCompromisso", values, "post");
}

export function update(values) {
  return submit("alterarCompromisso", values, "put");
}

export function remove(values) {
  console.log("value em delete: ", values);
  return submit(`excluirCompromisso/${values.id}`, values, "delete");
}

function submit(url, values, method) {
  return (dispatch) => {
    //var userId = values.id;
    const id = values.id ? values.id : null;
    console.log("values em submit: ", values);
    axios[method](`${BASE_URL}/${url}`, values)
      .then((resp) => {
        toastr.success("Sucesso", "Operação Realizada com sucesso.");
        dispatch(init(usuario_id));
      })
      .catch((e) => {
        console.log("Printando valor de e: ", e);
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
          dispatch(init(usuario_id));
        } else {
          toastr.error("Erro", "Não foi possível atender a requisição!");
          dispatch(init(usuario_id));
        }
      });
  };
}

export function showUpdate(appointment) {
  return [
    showTabs("tabUpdate"),
    selectTab("tabUpdate"),
    initialize("appointmentForm", appointment),
  ];
}

export function showDelete(appointment) {
  return [
    showTabs("tabDelete"),
    selectTab("tabDelete"),
    initialize("appointmentForm", appointment),
  ];
}

export function init(userId) {
  console.log("Compromissos Action", userId)
  usuario_id = JSON.parse(localStorage.getItem("agenda_user")).id;
  console.log("Usuário id em init form compromisso", usuario_id)
  return [
    showTabs("tabList", "tabCreate"),
    selectTab("tabList"),
    getList(userId),
    initialize("appointmentForm", INITIAL_VALUES),
  ];
}