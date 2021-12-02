import React, {Component} from 'react'
import ContentHeader from '../template/contentHeader'
import Content from '../template/content'
import InfoBox from '../widget/infoBox'
import Row from '../layout/row'

//Componente Dashboard montado na exibição da página inicial
export default class Dashboard extends Component {
    componentWillMount(){
    }

    //Apresentado a mensagem de Bem vindo no header, ícone de contatos e compromissos
    render() {
        return (
            <div>
                <ContentHeader title='Seja bem vindo :)' small='' />
                <Content>
                    <Row>
                        <InfoBox cols='10 6' color='blue' icon='phone-square'
                            title={`CONTATOS`} text='Gerencie seus contatos' />
                        <InfoBox cols='12 6' color='blue' icon='calendar'
                            title={`COMPROMISSOS`} text='Organize seus compromissos' />
                    </Row>
                </Content>
            </div>
        )
    }
}