import axios from 'axios'
import convert from 'xml-js'

const sendToBackend = state => () => {
    const { setCotacao, servico, logista, peso, valor } = state
    return new Promise(async (resolve, reject) => {
		const numberServico = (servico) => {
			if(servico === 'sedex') return '04014'
			if(servico === 'pac') return '04510'
			if(servico === 'sedex12') return '04782'
			if(servico === 'sedex10') return '04790'
			if(servico === 'sedexHOJE') return '04804'
		}
		const dimensoes = (peso) => {
			if(peso <= 1850){
				return {
					comprimento:'20',
					largura: '20',
					altura: '20'
				}
			}
			if(peso <= 3750){
				return {
					comprimento:'25',
					largura: '25',
					altura: '35'
				}
			}
			if(peso <= 7550){
				return{
					comprimento:'30',
					largura: '30',
					altura: '40',
				}
			}
			if(peso <= 13450){
				return {
					comprimento:'40',
					largura: '40',
					altura: '50',
				}
			}
		}
		const {comprimento, altura, largura} = dimensoes(peso)
			const config = {
				method: 'POST',
				url: 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo',
				params: {
					nCdEmpresa: " ",
					sDsSenha: " ",
					nCdServico: numberServico(servico),
					sCepOrigem: '01123010',
					sCepDestino: logista,
					nVlPeso: peso,
					nCdFormato: "1",
					nVlComprimento: comprimento,
					nVlAltura: altura,
					nVlLargura: largura,
					nVlDiametro: "2",
					sCdMaoPropria: "S",
					nVlValorDeclarado: valor,
					sCdAvisoRecebimento: "S"
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
			}
        try {
			const request = await axios(config)
			const convertido = convert(request)
			const {Valor, PrazoEntrega} = convertido.cResultado.Servicos.cServico
			setCotacao(Valor)
			setPrazo(PrazoEntrega)
			resolve('Consulta realizada com sucesso')
        } catch (error) {
            if (error.customError) reject(error)
            else {
                console.log(error)
                if (error.response) console.log(error.response)
                reject('Erro ao consutltar!')
            }
        }
    })

}

export default sendToBackend