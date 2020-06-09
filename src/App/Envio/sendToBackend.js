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
            'Content-type': 'application/json',
            'Authorization': process.env.SHEET_TOKEN,
        },
        json: true
	}
	try {
		const result = await axios(config)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

export default sendToBackend