import axios from 'axios'

const sendToBackend = state => async () => {
	const { setCotacaoSedex, servico, logista, peso, valor, setPrazoSedex, setEndereco,setError,setLoad, setCotacaoPac, setPrazoPac, setSeguro } = state
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
		const {comprimento, altura, largura} = dimensoes(pesoNumber)
			const config = (servico) => {
				return {
					method:'POST',
					url: 'https://zirocorreios.netlify.app/.netlify/functions/consult',
					data:{
						'servico':servico,
						'cep':logista,
						'peso':pesoNumber,
						'comprimento':comprimento,
						'altura':altura,
						'largura':largura,
						'valor':String(valor/100)
					},
					headers: {
						'Authorization': 'Basic YWhtYWQ6emlybzEyMzQ=',
						'Content-Type': 'application/json',
					}
				}
			}
			const configCEP = {
				method: 'GET',
				url: `https://viacep.com.br/ws/${logista}/json/`,
				headers:{
                    'Content-Type': 'application/json'
				}
			}
        try {
				const requestSedex = await axios(config('sedex'))
				const requestPac = await axios(config('pac'))
				console.log(requestSedex.data.Servicos)
				console.log(requestPac.data.Servicos)
				const {Valor:valorSedex, PrazoEntrega:prazoSedex, ValorValorDeclarado:declaroSedex} = requestSedex.data.Servicos.cServico
				const {Valor:valorPac, PrazoEntrega:prazoPac, ValorValorDeclarado:declaroPac} = requestPac.data.Servicos.cServico
				setCotacaoSedex({valorTotal:valorSedex._text, prazo:prazoSedex._text, valorSeguro: declaroSedex._text})
				setCotacaoPac({valorTotal:valorPac._text, prazo:prazoPac._text, valorSeguro: declaroPac._text})
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