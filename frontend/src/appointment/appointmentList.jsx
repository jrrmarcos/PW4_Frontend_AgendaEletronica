import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getList, showUpdate, showDelete} from './appointmentActions'

class AppointmentList extends Component {
    componentWillMount() { //chamado toda vez que montarmos esse componente
        this.props.getList() //pega a lista do appointmentActions.js
    }

    renderRows() {
        const list = this.props.appointmentList || []
        return list.map(bc => (
            //Objeto mostrado ao montar o componente Lista de Compromissos
            //No caso, abaixo é exibido a Data (transformada em string), observação e status
            //Os botões nas ações, chamam as funções do appointmentActions.js e fazem o que foi definido lá
            <tr key={bc.id}> 
                <td>{new Date(bc.data).toLocaleString()}</td> 
                <td>{bc.observacao}</td>
                <td>{bc.status}</td>
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
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Status</th>
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
    appointmentList: state.appointment.appointmentList 
})
const mapDispatchToProps = dispatch => bindActionCreators({ 
    getList, showUpdate, showDelete 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList)