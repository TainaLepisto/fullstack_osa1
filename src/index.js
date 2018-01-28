import React from 'react'
import ReactDOM from 'react-dom'



// Button vastaa yksittäistä palautteenantonappia
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

// Statistics huolehtii tilastojen näyttämisestä
const Statistics = ({hyva, neutraali, huono, yhteensa}) => {
    if (yhteensa === 0) {
        return (
          <div>
            <em>Anna palautetta nappeja painelemalla</em><br/>
            <em>Ei vielä annettuja palautteita</em>
          </div>
        )
      }
      return (
        <div>
            <table>  
            <tbody>
                <tr><td>Hyvä</td><td>{hyva}</td></tr>
                <tr><td>Neutraali</td><td>{neutraali}</td></tr>
                <tr><td>Huono</td><td>{huono}</td></tr>
            </tbody>
            </table>
            <br/>
            <Statistic hyva={hyva} huono={huono} yhteensa={yhteensa} />
        </div>
      )
}

// Statistic huolehtii yksittäisen tilastorivin, esim. keskiarvon näyttämisestä
const Statistic = ({hyva, huono, yhteensa}) => (
    <table><tbody>
        <tr><td>Keskiarvo</td><td>{ Math.round((hyva + -1*huono ) / yhteensa *10) / 10} </td></tr>
        <tr><td>Positiivisia</td><td>{ Math.round(hyva  / yhteensa * 100 *10) / 10} % </td></tr>
    </tbody></table>
)


class App extends React.Component {
    constructor() {
      super()
      this.state = {
        hyva: 0,
        neutraali: 0 ,
        huono: 0,
        yhteensa: 0
      }
    }

    handler = (palaute) => {
        console.log('nappia painettu ', palaute)
    
        return () => {
            if(palaute==='hyva'){
                this.setState({ hyva: this.state.hyva +1, yhteensa: this.state.yhteensa +1 })
            }
            if(palaute==='neutraali'){
                this.setState({ neutraali: this.state.neutraali +1, yhteensa: this.state.yhteensa +1 })
            }
            if(palaute==='huono'){
                this.setState({ huono: this.state.huono +1, yhteensa: this.state.yhteensa +1 })
            }
        }
    }


    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button handleClick={this.handler('hyva')} text="Hyvä" />
                <Button handleClick={this.handler('neutraali')} text="Neutraali" />
                <Button handleClick={this.handler('huono')} text="Huono" />

                <h2>Statistiikka</h2>
                <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} yhteensa={this.state.yhteensa} />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)