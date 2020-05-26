import React, { useState, useContext } from 'react'
import currencyFormat from '@ziro/currency-format'
import maskInput from '@ziro/mask-input'
import sendToBackend from './sendToBackend'
import InitialLoader from '@bit/vitorbarbosa19.ziro.initial-loader'
import Spinner from '@bit/vitorbarbosa19.ziro.spinner';
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
	const [endereco, setEndereco] = useState(false)
	const [error, setError] = useState(false)
	const [load, setLoad] = useState(false)
	const state = { cotacao, peso, servico, valor, prazo,endereco, setPeso, logista, setLogista, setCotacao, setServico, setPrazo, setEndereco, setError, setLoad}
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
                        content: endereco
                    }
                ]
            }
        ]
	return (
		<>
			<FormInput
					name='cepLogista'
					label='cep'
					input={
						<InputText
						value={logista}
						onChange={({ target: { value } }) => setLogista(maskInput(value, '#####-###', true))}
						placeholder='12345-678'
					/>
					}
				/>
			<FormInput
					name='Valor da Venda'
					label='valor'
					input={
						<InputText
						value={currencyFormat(valor)}
						onChange={({ target: { value } }) => {
							const toInteger = parseInt(value.replace(/[R$\.,]/g, ''), 10)
							return setValor(maskInput(toInteger, '######', true))
						}}
						placeholder='R$2.000,00'
					/>
					}
				/>
			<FormInput
				name='peso'
				label='Peso da mercadoria (Kg)'
				input={
					<InputText
						value={peso}
						onChange={({ target: { value } }) => {
							setPeso(value)
						}}
						placeholder='2,32'
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
			cta="Calcular"
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
			{error &&
				<h2 style={{textAlign:'center', marginTop:'35px', color:'red'}}>{error}</h2>
			}
		</>
    )
}

export default form