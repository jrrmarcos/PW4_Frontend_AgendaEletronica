import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import {init} from './appointmentActions'
import LabelAndInput from '../common/form/labelAndInput'
import Row from '../common/layout/row'

class AppointmentForm extends Component {
    render() {
        const {handleSubmit, readOnly, id, data, observacao, participantes, endereco, status, contato_id, userId} = this.props
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Row>
                        <Field name='data' component={LabelAndInput} readOnly={readOnly}
                            label='Data e Hora' cols='12 4' type="datetime-local" placeholder='' />
                    </Row>
                    <Row>
                        <Field name='observacao' component={LabelAndInput} readOnly={readOnly}
                            label='Descrição:' cols='12 4' placeholder='Informe a descrição' />
                    </Row>
                    <Row>
                        <Field name='participantes' component={LabelAndInput} readOnly={readOnly}
                            label='Participantes' cols='12 4' placeholder='Informe os participantes' />
                    </Row>
                    <Row>
                        <Field name='endereco' component={LabelAndInput} readOnly={readOnly}
                            label='Endereço' cols='12 4' placeholder='Informe um endereço' />
                    </Row>
                    <Row>
                        <Field name='status' component={LabelAndInput} readOnly={readOnly}
                            label='Status' cols='12 4' placeholder='Informe o status' />
                    </Row>
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

AppointmentForm = reduxForm({ form: 'appointmentForm', destroyOnUnmount: false })(AppointmentForm)
const selector = formValueSelector('appointmentForm')
const mapStateToProps = state => ({
    id: selector(state, 'id'),
    data: selector(state, 'data'),
    observacao: selector(state, 'observacao'),
    participantes: selector(state, 'participantes'),
    endereco: selector(state, 'endereco'),
    status: selector(state, 'status'),
    contato_id: selector(state, 'contato_id'),
    userId: state.auth.user.id,
})

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm)