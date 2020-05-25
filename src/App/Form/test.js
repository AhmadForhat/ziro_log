import React, { useState, useContext } from 'react'
import currencyFormat from '@ziro/currency-format'
import maskInput from '@ziro/mask-input'
import sendToBackend from './sendToBackend'
import Form from '@bit/vitorbarbosa19.ziro.form';
import FormInput from '@bit/vitorbarbosa19.ziro.form-input'
import Dropdown from '@bit/vitorbarbosa19.ziro.dropdown'
import InputText from '@bit/vitorbarbosa19.ziro.input-text'

const form = () => {
    const [peso, setPeso] = useState('')
    const [logista, setLogista] = useState('')
    const [servico, setServico] = useState('')
    const [picking, setPicking] = useState([])
    const state = { peso, setPeso, load, logista, setLogista,setLoad }
    const validations = [
        {
            name: 'peso',
            validation: value => typeof value === 'number' && value !== '',
            value: peso,
            message: 'Deve ser um número válido, não utilize .'
        },
    ]
	return (
			<Form
				validations={validations}
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
				inputs={[
                    <FormInput
                    name='cepLogista'
                    label='CEP Logista'
                    input={
						<InputText
						value={logista}
						onChange={({ target: { value } }) => {
							return setLogista(value)
						}}
						placeholder='12345678'
					/>
                    }
                    />,
					<FormInput
						name='peso'
						label='Peso da mercadoria (g)'
						input={
							<InputText
								value={peso}
								onChange={({ target: { value } }) => {
									return setPeso(value)
								}}
								placeholder='2000'
							/>
						}
					/>,
					<FormInput
                    name='Serviço'
                    label='servico'
                    input={
                    <Dropdown
                        value={servico}
                        onChange={({ target: { value } }) =>
                        setServico(value)
                        }
                        onChangeKeyboard={element =>
                        element ? setServico(element.value) : null
                        }
                        list={['sedex','sedex10','sedex12','pac']}
                        placeholder="Escolha o Serviço"
                    />
                    }
                    />,
			]}
			/>
    )
}

export default form