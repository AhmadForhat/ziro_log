import axios from 'axios'
import convert from 'xml-js'

const sendToBackend = state => () => {
	const { setCotacao, servico, logista, peso, valor, setPrazo, setEndereco,setError,setLoad } = state
	setError(false)
	setLoad(true)
    return new Promise( async (resolve, reject) => {
		const pesoNumber = peso.replace(',','.')
		const numberServico = (servico) => {
			if(servico === 'sedex') return '04014'
			if(servico === 'pac') return '04510'
			if(servico === 'sedex12') return '04782'
			if(servico === 'sedex10') return '04790'
			if(servico === 'sedexHOJE') return '04804'
		}
		const dimensoes = (peso) => {
			if(peso <= 1.850){
				return {
					comprimento:'20',
					largura: '20',
					altura: '20'
				}
			}
			if(peso <= 3.750){
				return {
					comprimento:'25',
					largura: '25',
					altura: '35'
				}
			}
			if(peso <= 7.550){
				return{
					comprimento:'30',
					largura: '30',
					altura: '40',
				}
			}
			if(peso <= 13.450){
				return {
					comprimento:'40',
					largura: '40',
					altura: '50',
				}
			}else{
				setError('Peso tem que ter valores positivos e menores que 13.45kg')
				setLoad(false)
				reject('Utilizar o peso correto')
			}
		}
		if(valor/100 <= 20 || valor/100 >=7501){
			setError('Favor utilizar valores entre R$21,00 e R$7.500,00 reais')
			setLoad(false)
			reject('Utilizar valores corretos de moeda')
		}
		if(!['sedex','pac','sedex12','sedex10','sedexHOJE'].includes(servico)){
			setError('Favor utilizar os valores disponíveis nas opções')
			setLoad(false)
			reject('Valor não incluido no array')
		}
		const {comprimento, altura, largura} = dimensoes(pesoNumber)
			const config = {
				method: 'GET',
				url: 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo',
				params: {
					nCdEmpresa: " ",
					sDsSenha: " ",
					nCdServico: numberServico(servico),
					sCepOrigem: '01123010',
					sCepDestino: logista,
					nVlPeso: pesoNumber,
					nCdFormato: "1",
					nVlComprimento: comprimento,
					nVlAltura: altura,
					nVlLargura: largura,
					nVlDiametro: "2",
					sCdMaoPropria: "S",
					nVlValorDeclarado: valor/100,
					sCdAvisoRecebimento: "S"
				}
			}
			const configCEP = {
				method: 'GET',
				url: `https://viacep.com.br/ws/${logista}/json/`
			}
        try {
				const request = await axios(config)
				const convertido = convert.xml2json(request.data, { compact: true, spaces: 4 })
				const obj = JSON.parse(convertido)
				const {Valor, PrazoEntrega} = obj.cResultado.Servicos.cServico
				setCotacao(`R$ ${Valor._text}`)
				setPrazo(`${PrazoEntrega._text} dias`)
			try {
				const requestVia = await axios(configCEP)
				if(!requestVia.data.erro){
					const {logradouro, localidade, uf} = requestVia.data
					setEndereco(`${logradouro}-${localidade}/${uf}`)
					setLoad(false)
					resolve('Consulta feita com sucesso')
				}else{
					setError('CEP não encontrado')
					setLoad(false)
					reject('CEP não encontrado')
				}
			} catch (error) {
				setError('CEP não encontrado')
				setLoad(false)
				reject('CEP não encontrado')
			}
        } catch (error) {
            if (error.customError){
				setLoad(false)
				reject(error)
			}
            else {
                console.log(error)
				if (error.response) console.log(error.response)
				setLoad(false)
				setError('Favor verificar os valores preenchidos')
                reject('Erro ao consutltar!')
            }
        }
    })

}

export default sendToBackend