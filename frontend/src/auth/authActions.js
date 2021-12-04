import { toastr } from "react-redux-toastr";
import axios from "axios";
import consts from "../consts";
import Auth from '../auth/auth'

export function login(values) { //values é o valor que está no formulário
  return submit(0, values, `${consts.API_URL}/login`);
}

export function signup(values) {
  values.admin = 0;
  return submit(1, values, `${consts.API_URL}/adicionarUsuario`);
}

export function logout() {
  return { type: "TOKEN_VALIDATED", payload: false };
}

function submit(tipoLogin, values, url) { //valor do formulário e url que precisa mandar
  return (dispatch) => {
    axios
      .post(url, values) //post (pq eu mando um objeto) e tanto login quando signup são posts
      .then((resp) => { //se isso for feito com sucesso e não teve nenhum problema na requisição   
        if(tipoLogin==0) {
          toastr.success("Bem vindo, " + resp.data.nome + "!");
          dispatch([{ type: "USER_FETCHED", payload: resp.data }]); 
        } else {
          toastr.success(resp.data);
        }
      })
      .catch((e) => {
        console.log(e)
        if (e.response.status == 400) {
          if (
            typeof e.response.data != "string" &&
            e.response.data.length > 0
          ) {
            e.response.data.forEach((error) => toastr.error("Erro", error.msg));
          }
          if (typeof e.response.data == "string") {
            toastr.error(e.response.data);
          }
        } else {
          toastr.error("Não foi possível atender a requisição!");
        }
      });
  };
}

export function validateToken(token) {
  return (dispatch) => {
    if (token) {
      axios
        .post(`${consts.API_URL}/validateToken`, { token })
        .then((resp) => {
          dispatch({ type: "TOKEN_VALIDATED", payload: resp.data });
        })
        .catch((e) => dispatch({ type: "TOKEN_VALIDATED", payload: false }));
    } else {
      dispatch({ type: "TOKEN_VALIDATED", payload: false });
    }
  };
}
