import React from 'react'
import { useLocation } from 'wouter'
import Button from '@bit/vitorbarbosa19.ziro.button'
import Illustration from '@bit/vitorbarbosa19.ziro.illustration'
import { container,svg, title } from './styles'

const ErrorForm = () => {
	const [, setLocation] = useLocation()
	return (
		<div style={container}>
			<div style={svg}><Illustration type='paymentSuccess' /></div>
			<label style={title}>Preencha Corretamente o Formulário de Consulta</label>
			<Button type='link' template="light" cta='Retornar' navigate={async () => { setLocation('/')}} />
		</div>
	)
}

export default ErrorForm