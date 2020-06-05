import React from 'react'

const InputRadios = () => {
    const styles = {
        radioWhite: {
          border: "10px solid #90DDD0",
        },
        radioPink: {
          border: "10px solid #EF959D",
        },
        radioRed: {
          border: "10px solid #90DDD0",
        }
    }
    styles.radioPink['backgroundColor'] = '#EF959D';
	return (
        <form>
            <input type="radio" className="circle" name="icing" defaultValue={1} id="white" style={styles.radioWhite} />
            <label class="radio" htmlFor="white"></label>
            <input type="radio" className="circle" name="icing" defaultValue={2} id="pink" style={styles.radioPink} />
            <label class="radio" htmlFor="pink"></label>
            <input type="radio" className="circle" name="icing" defaultValue={3} id="red" style={styles.radioRed} />
            <label class="radio" htmlFor="red"></label>
        </form>
    )
}

export default InputRadios

{/* <form style={{display:'flex', flexDirection:'column'}}>
<div>
    <input className="circle" type="radio" id="sedex" name="sedex" value='sedex' style={styles.radioWhite} checked={agencia === 'sedex'} onChange={() => {
        setAgencia('')
        setAgencia('sedex')
        }}/>
    <label for="sedex">Sedex</label>
    <p>Valor : {'R$ 2000'}</p>
    <p> Prazo : {`${20} dias`}</p>
</div>
<div>
    <input className="circle" type="radio" id="pac" name="pac" value='pac' style={styles.radioWhite} checked={agencia === 'pac'} onChange={() => {
        setAgencia('')
        setAgencia('pac')
        
        }}/>
    <label for="pac">PAC</label>
    <p>Valor : {'R$ 2000'}</p>
    <p> Prazo : {`${20} dias`}</p>
</div>
</form> */}