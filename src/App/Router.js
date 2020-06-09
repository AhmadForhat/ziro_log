import React,{useState} from 'react'
import { Router2 as routeMatcher } from '@ziro/router'
import { Menu } from './Menu/index'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'
import { useRoute, useLocation } from 'wouter'
import Form from '../App/Form/index'
import Envio from '../App/Envio/index'

const Router = ({ isLogged }) => {
    const [match, params] = useRoute('/:envio?')
    const [location] = useLocation()
    const publicRoutes = {
        [match ? location : null]: <Form {...params} />,
    }
    return routeMatcher(isLogged, publicRoutes, <Form />, <NotFound fallback='/' />)
}

export default Router