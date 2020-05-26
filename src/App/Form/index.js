import React, { useState, useContext } from 'react'
import currencyFormat from '@ziro/currency-format'
import maskInput from '@ziro/mask-input'
import sendToBackend from './sendToBackend'
import InitialLoader from '@bit/vitorbarbosa19.ziro.initial-loader'
import FormInput from '@bit/vitorbarbosa19.ziro.form-input'
import Details from '@bit/vitorbarbosa19.ziro.details';
import Dropdown from '@bit/vitorbarbosa19.ziro.dropdown'
import InputText from '@bit/vitorbarbosa19.ziro.input-text'
import Button from '@bit/vitorbarbosa19.ziro.button'

const form = () => {
    const [peso, setPeso] = useState('')
    const [logista, setLogista] = useState('')
	const [servico, setServico] = useState('')
	const [valor, setValor] = useState('')
	const [cotacao, setCotacao] = useState(false)
	const [prazo, setPrazo] = useState(false)
	const [load, setLoad] = useState(false)
    const block = [
            {
                header: 'Cotação Gerada',
                body: [
                    {
                        title: 'Prazo',
                        content: prazo
                    },
                    {
                        title: 'Valor',
                        content: cotacao
                    },
                    {
                        title: 'Local',
                        content: 'Rua blá blá blá'
                    }
                ]
            }
        ]
	return (
		<>
			<FormInput
					name='cepLogista'
					label='cepLogista'
					input={
						<InputText
						value={logista}
						onChange={({ target: { value } }) => {
							return setLogista(value)
						}}
						placeholder='12345678'
					/>
					}
				/>
			<FormInput
					name='Valor da Venda'
					label='valor'
					input={
						<InputText
						value={valor}
						onChange={({ target: { value } }) => {
							return setValor(value)
						}}
						placeholder='100,00'
					/>
					}
				/>
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
			/>
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
			/>
			<div style={{marginTop:'10px'}}>
			<Button 
			type="button"
			cta="Cálcular"
			template="regular"
			click={sendToBackend(state)}
			/>
			</div>
			{load &&
				<div style={{marginTop:'35px', display:'flex', justifyContent:'center'}}>
				<Spinner size="5.5rem"/>
				</div>
			}
			{cotacao && !error && !load &&
				<div style={{marginTop:'35px'}}>
				<Details blocks={block} />
				</div>
			}
		</>
    )
}

export default form