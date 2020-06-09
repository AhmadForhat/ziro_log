import axios from 'axios'

const sendToBackend = state => async () => {
	const {romaneio, isError, setIsError, cnpj, precoFinal, servico, prazo, endereco, lojista, obs, destinatario, nf} = state
	const body = [romaneio, cnpj,'', endereco, lojista, obs, destinatario, nf]
	const config = {
        method: 'POST',
        url:process.env.SHEET_URL,
        data : {
            'apiResource': 'values',
            'apiMethod': 'append',
            'spreadsheetId': process.env.SHEET_ID,
            'range': 'ZiroApp!A2',
            'resource': {
                'values': [body]
            },
            'valueInputOption': 'user_entered'
        },
        headers: {
            'Origin': 'https://ziro.app',
            'Content-type': 'application/json',
            'Authorization': process.env.SHEET_TOKEN,
        },
        json: true
	}
	try {
		const requisicao = await axios(config)
		console.log(requisicao)
	} catch (error) {
		console.log(error)
	}
	console.log(romaneio, cnpj, 'batata', lojista, endereco, obs, destinatario, nf )
	console.log('Batata')
}

export default sendToBackend