import axios from 'axios'
import convert from 'xml-js'

const sendToBackend = state => async () => {
	const { setCotacao, servico, logista, peso, valor, setPrazo, setEndereco,setError,setLoad } = state
	setError(false)
	setLoad(true)
		const pesoNumber = peso.replace(',','.')
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
				return 'Utilizar o peso correto'
			}
		}
		if(valor/100 <= 20 || valor/100 >=7501){
			setError('Favor utilizar valores entre R$21,00 e R$7.500,00 reais')
			setLoad(false)
			return 'Utilizar valores corretos de moeda'
		}
		if(!['sedex','pac','sedex12','sedex10','sedexHOJE'].includes(servico)){
			setError('Favor utilizar os valores disponíveis nas opções')
			setLoad(false)
			return 'Valor não incluido no array'
		}
		const {comprimento, altura, largura} = dimensoes(pesoNumber)
			const config = {
				method:'GET',
				url: 'https://zirocorreios.netlify.app/.netlify/functions/consult',
				data:{
					"servico":servico,
					"cep":logista,
					"peso":pesoNumber,
					"comprimento":comprimento,
					"altura":altura,
					"largura":largura,
					"valor":String(valor/100)
				},
				headers: {
					'Authorization': 'Basic YWhtYWQ6emlybzEyMzQ=',
					'Origin': 'https://ziro.app'
				},
			}
			const configCEP = {
				method: 'GET',
				url: `https://viacep.com.br/ws/${logista}/json/`,
				headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				}
			}
        try {
				const request = await axios(config)
				const {Valor, PrazoEntrega} = request.data.cServico
				setCotacao(`R$ ${Valor._text}`)
				setPrazo(`${PrazoEntrega._text} dias`)
			try {
				const requestVia = await axios(configCEP)
				if(!requestVia.data.erro){
					const {logradouro, localidade, uf} = requestVia.data
					setEndereco(`${logradouro}-${localidade}/${uf}`)
					setLoad(false)
					return 'consulta feita com sucesso'
				}else{
					setError('CEP não encontrado')
					setLoad(false)
					return 'CEP não encontrado'
				}
			} catch (error) {
				setError('CEP não encontrado')
				setLoad(false)
				return 'CEP não encontrado'
			}
        } catch (error) {
            if (error.customError){
				setLoad(false)
				return error
			}
            else {
                console.log(error)
				if (error.response) console.log(error.response)
				setLoad(false)
				setError('Sistema está fora do ar')
                return 'Erro ao consutltar!'
            }
        }
}

export default sendToBackend