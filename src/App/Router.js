import React from 'react'
import { Router2 as routeMatcher } from '@ziro/router'
import Form from './Form/index'
import { Menu } from './Menu/index'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'

const Router = ({ isLogged }) => {
    const publicRoutes = {
        '/': <Menu title='Frete'><Form /></Menu>,
    }
    return routeMatcher(isLogged, publicRoutes, <Form />, <NotFound fallback='/' />)
}

export default Router