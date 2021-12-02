import './auth.css'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, signup } from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'
import Messages from '../common/msg/messages'
import Input from '../common/form/inputAuth'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { loginMode: true } //quando abrir a página, entra direto no login, estado 0
    }
    changeMode() {
        this.setState({ loginMode: !this.state.loginMode }) //se o usuário quiser se cadastrar, muda o estado para 1
    }
    onSubmit(values) {
        const { login, signup } = this.props
        this.state.loginMode ? login(values) : signup(values) //pega os valores JSON da opção LOGIN: Usuario e senha / CADASTRO Nome, Usuario e Senha
    }
    render() {
        const { loginMode } = this.state // aqui ja é passado o valor do que deseja ser feito
        const { handleSubmit } = this.props
        //A função handleSubmit() faz duas coisas: 
        //Registra o valor atual do elemento de entrada(input) sempre que o formulário for enviado; 
        //Impede o comportamento padrão do formulário HTML de navegar para uma nova página. 
        return (
            <div className="login-box">
                <div className="login-logo"><b>Agenda Eletrônica</b></div>
                <div className="login-box-body">
                    <p className="login-box-msg">Seja bem vindo</p>
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                        <Field component={Input} type="input" name="nome"
                            placeholder="Nome" icon='user' hide={loginMode} />
                        <Field component={Input} type="input" name="login"
                            placeholder="Login" icon='envelope' />
                        <Field component={Input} type="password" name="senha"
                            placeholder="Senha" icon='lock' />
                        <Row>
                            <Grid cols="4">
                                <button type="submit"
                                    className="btn btn-primary btn-block btn-flat">
                                    {loginMode ? 'Entrar' : 'Registrar'} 
                                </button>
                            </Grid>
                        </Row>
                    </form>
                    <br />
                    
                    <a onClick={() => this.changeMode()}>
                    <center>    
                        {loginMode ? 'É novo? Se cadastre!' :'Já é cadastrado? Entre aqui'}
                    </center>
                    </a>
                </div>
                <Messages />
            </div>
        )
    }
}

Auth = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup },
    dispatch)
export default connect(null, mapDispatchToProps)(Auth)