import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import InfoBox from '../common/widget/infoBox'
import Row from '../common/layout/row'

export default class Dashboard extends Component {
    componentWillMount(){
    }

    render() {
        return (
            <div>
                <ContentHeader title='Seja bem vindo :)' small='' />
                <Content>
                    <Row>
                        <InfoBox cols='10 6' color='green' icon='phone-square'
                            title={`CONTATOS`} text='Gerencie seus contatos' />
                        <InfoBox cols='12 6' color='blue' icon='calendar'
                            title={`COMPROMISSOS`} text='Organize seus compromissos' />
                    </Row>
                </Content>
            </div>
        )
    }
}