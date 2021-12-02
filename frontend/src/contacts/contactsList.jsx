import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './contactsActions'

class ContactsList extends Component {

    componentWillMount() {
        this.props.getList()
    }

    renderRows() {
        const list = this.props.contactsList || []
        return list.map(bc => (
            //Objeto mostrado ao montar o componente Lista de Contatos
            //No caso, abaixo é exibido o nome, e-mail e telefone
            //Os botões nas ações, chamam as funções do appointmentActions.js e fazem o que foi definido lá
            <tr key={bc.id}>
                <td>{bc.nome}</td>
                <td>{bc.email}</td>
                <td>{bc.telefone}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    //Página montada com headers e funcionalidades html
    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
     contactsList: state.contacts.contactsList 
    })
const mapDispatchToProps = dispatch => bindActionCreators({ 
    getList, showUpdate, showDelete 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList)