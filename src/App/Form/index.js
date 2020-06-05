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
	const [agencia, setAgencia] = useState('')
	const [cotacaoSedex, setCotacaoSedex] = useState(false)
	const [valorComSeguro, setValorComSeguro] = useState(true)
	const [prazoSedex, setPrazoSedex] = useState(false)
	const [cotacaoPac, setCotacaoPac] = useState(false)
	const [prazoPac, setPrazoPac] = useState(false)
	const [endereco, setEndereco] = useState(false)
	const [error, setError] = useState(false)
	const [load, setLoad] = useState(false)
	const state = {peso, servico, valor,endereco, setPeso, logista, setLogista, setCotacaoSedex, setServico, setPrazoSedex, setEndereco, setError, setLoad, setPrazoPac, setCotacaoPac}
    const block = [
            {
                header: 'Serviços Disponíveis',
                body: [
                    {
                        title: '',
                        content: []
                    }
                ]
            }
		]
		const limpar = () => {
			setLogista('')
			setValor('')
			setPeso('')
			setServico('')
			setCotacaoPac('')
			setCotacaoSedex('')
		}
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
			{load ? (
					<div style={{marginTop:'35px', display:'flex', justifyContent:'center'}}>
					<Spinner size="5.5rem"/>
					</div>
				):(
					<div style={{textAlign: 'center'}}>
						{(logista || valor || peso ||servico || cotacaoPac || cotacaoSedex) && (
							<div style={{marginBottom:'5%'}}><a onClick={() => limpar()}>Limpar</a></div>
							)
						}
						<Button 
						type="button"
						cta="Calcular"
						template="regular"
						click={sendToBackend(state)}
						/>
					</div>
				)
			}
			{cotacaoPac && cotacaoSedex && !error && !load &&
				<div style={{marginTop:'35px'}}>
				<Details blocks={block} />
				<form style={{display:'flex', flexDirection:'column'}}>
						<label>Sedex</label>
						<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
						<input type="radio" id="sedex" name="sedex" value='sedex' checked={agencia.servico === 'sedex'} onChange={() => {
							setAgencia('')
							setAgencia({
								servico:'sedex',
								valor:cotacaoSedex,
								prazo:prazoSedex
							})
							}}/>
						<div style={{display:'flex', justifyContent:'space-between', flexDirection:'column', width:'85%'}}>
						<div style ={{display:'flex', justifyContent:'space-between'}}><p >Prazo</p> <p>{`${cotacaoSedex.prazo} dias`}</p></div>
						<div style ={{display:'flex', justifyContent:'space-between'}}><p>Seguro</p> <p>{`R$ ${cotacaoSedex.valorSeguro}`}</p></div>
						<div style ={{display:'flex', justifyContent:'space-between'}}><p>Valor Total</p> <p>{`R$ ${cotacaoSedex.valorTotal}`}</p></div>
						</div>
					</div>
					<label>Pac</label>
						<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
						<input type="radio" id="pac" name="pac" value='pac' checked={agencia.servico === 'pac'} onChange={() => {
							setAgencia('')
							setAgencia({
								servico:'pac',
								valor:cotacaoPac,
								prazo:prazoPac
							})
							}}/>
						<div style={{display:'flex', justifyContent:'space-between', flexDirection:'column', width:'85%'}}>
						<div style ={{display:'flex', justifyContent:'space-between'}}><p >Prazo</p> <p>{`${cotacaoPac.prazo} dias`}</p></div>
						<div style ={{display:'flex', justifyContent:'space-between'}}><p>Seguro</p> <p>{`R$ ${cotacaoPac.valorSeguro}`}</p></div>
						<div style ={{display:'flex', justifyContent:'space-between'}}><p>Valor Total</p> <p>{`R$ ${cotacaoPac.valorTotal}`}</p></div>
						</div>
					</div>
					<div style={{display:'flex', justifyContent: 'space-between', marginTop:'6%'}}>
					<div>
					<p>Não declarar valor</p>
					<label style={{fontSize:'10px'}}>*Enviar a mercadoria sem seguro significa não ter garantia sobre a entrega</label>
					</div>
					<input style={{marginTop:'2.0%'}} type="checkbox" id="_checkbox" name="seguro" value='seguro' onChange={() => {
							if(valorComSeguro === false){
								setValorComSeguro(true)
							}else{
								setValorComSeguro(false)
							}
							}}/>
					</div>
				</form>

				<div style={{marginTop:'10%'}}>
					<Button type="link" cta="Solicitar Envio" navigate={() => null} />
				</div>
				</div>
			}
			{error &&
				<h2 style={{textAlign:'center', marginTop:'35px', color:'red'}}>{error}</h2>
			}
		</>
	)
}

export default form