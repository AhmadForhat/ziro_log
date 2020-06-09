import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'
import {containerWithPadding } from '@ziro/theme';
import Header from '@bit/vitorbarbosa19.ziro.header'
import Form from '@bit/vitorbarbosa19.ziro.form'
import FormInput from '@bit/vitorbarbosa19.ziro.form-input'
import sendToBackend from './sendToBackend'
import InputText from '@bit/vitorbarbosa19.ziro.input-text'
import Error from '@bit/vitorbarbosa19.ziro.error'
import Details from '@bit/vitorbarbosa19.ziro.details';
import maskInput from '@ziro/mask-input'
import ErrorForm from './ErroForm/index'

const Envio = ({formInfo}) => {
    const [romaneio, setRomaneio] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [destinatario, setDestinatario] = useState('')
    const [isError, setIsError] = useState('')
    const [nf, setNf] = useState('')
    const [obs, setObs] = useState('')
    const [numero, setNumero] = useState('')
    const textAreaRef = useRef(null);
    const {peso, agencia, valor, endereco, precoFinal, valorComSeguro, lojista} = formInfo
    const state = {romaneio, setRomaneio, isError, setIsError, cnpj, setCnpj, precoFinal, servico, prazo, endereco, lojista, obs, setObs, destinatario, nf}
    const {servico, prazo} = agencia
    const block = [
        {
            header: 'Serviço',
            body: [
                {
                    title: 'Valor à Pagar',
                    content: precoFinal
                },
                {
                    title: 'Agência',
                    content: servico
                },
                {
                    title: 'Prazo',
                    content: `${prazo} dias`
                },
                {
                    title: 'Endereço',
                    content: endereco
                }
            ]
        }
    ]
    const validations = [
		{
			name: 'romaneio',
			validation: value => Number.isInteger(Number(value)),
			value: romaneio,
			message: 'Deve ser um número inteiro'
        },
        {
			name: 'cnpj',
			validation: value => Number.isInteger(Number(value.replace('.','').replace('-','').replace('.',''))),
			value: cnpj,
			message: 'Digite o CNPJ corretamente'
		},{
			name: 'destinatario',
			validation: value => true,
			value: destinatario,
			message: 'Digite o nome do Destinatário'
		},{
			name: 'nf',
			validation: value => true,
			value: nf,
			message: 'Digite apenas Números'
		},{
			name: 'obs',
			validation: value => true,
			value: obs,
			message: 'Máximo de 100 caracteres'
        },{
			name: 'numero',
			validation: value => Number.isInteger(Number(value)),
			value: numero,
			message: 'Deve ser um número inteiro'
		}
    ]
    if(!peso || !agencia || !valor || !endereco) return <ErrorForm />
    if (isError) return <Error />
	return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={containerWithPadding}>
            <Header type='icon-link' title='Solitação de Envio' navigateTo={'/'} icon='back' />
            <input type="text" style={{ position: 'absolute', left: '-9999px' }} ref={textAreaRef} readOnly />
            <Details blocks={block} />
                <div style={{ display: 'grid', gridRowGap: '12px', marginTop:'20px'}}>
                <Form
                    validations={validations}
                    sendToBackend={sendToBackend(state)}
                    inputs={[
                        <FormInput name='romaneio' label='Romaneio' input={
                            <InputText
                                value={romaneio}
                                onChange={({ target: { value } }) => setRomaneio(value)}
                                placeholder='Digite o Romaneio'
                            />
                        } />,
                        <FormInput name='cnpj' label='CNPJ' input={
                            <InputText
                                value={cnpj}
                                onChange={({ target: { value } }) => {
                                    return setCnpj(maskInput(value, '##.###.###-##', true))
                                }}
                                placeholder='Digite seu CNPJ'
                            />
                        } />,
                        <FormInput name='N°' label='numero' input={
                            <InputText
                                value={numero}
                                onChange={({ target: { value } }) => {
                                    return setNumero(value)
                                }}
                                placeholder='Digite o número do local de entrega'
                            />
                        } />,
                        <FormInput name='destinatario' label='Destinatário' input={
                            <InputText
                                value={destinatario}
                                onChange={({ target: { value } }) => {
                                    return setDestinatario(value)
                                }}
                                placeholder='Digite nome do Destinatário'
                            />
                        } />,
                        <FormInput name='nf' label='Nota Fiscal' input={
                            <InputText
                                value={nf}
                                onChange={({ target: { value } }) => {
                                    return setNf(value)
                                }}
                                placeholder='Digite a Nota Fiscal'
                            />
                        } />,
                        <FormInput name='obs' label='Observações' input={
                            <InputText
                                value={obs}
                                onChange={({ target: { value } }) => {
                                    return setObs(value)
                                }}
                                placeholder='Complementos sobre endereço ou entrega'
                            />
                        } />,
                    ]}
                />
                </div>
        </motion.div>
	)
}

export default Envio