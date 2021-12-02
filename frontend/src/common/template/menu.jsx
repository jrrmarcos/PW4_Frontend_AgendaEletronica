import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Home' icon='home' />
        <MenuItem path='contatos' label='Contatos' icon='phone-square' />
        <MenuItem path='compromissos' label='Compromissos' icon='calendar' />
    </ul>
)