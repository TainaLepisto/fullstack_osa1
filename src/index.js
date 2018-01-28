import React from 'react'
import ReactDOM from 'react-dom'

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
    
    historia = () => {
        if (this.state.yhteensa === 0) {
          return (
            <div>
              <em>Anna palautetta nappeja painelemalla</em>
            </div>
          )
        }
        return (
          <div>
            Hyvä: {this.state.hyva} <br/>
            Neutraali: {this.state.neutraali} <br/>
            Huono: {this.state.huono} <br/>
            <br/>
            Keskiarvo: { Math.round((this.state.hyva + -1*this.state.huono ) / this.state.yhteensa *10) / 10} <br/>
            Positiivisia: { Math.round(this.state.hyva  / this.state.yhteensa * 100 *10) / 10} %
          </div>
        )
      }

    render() {
        return (
            <div>
            
            <h1>Anna palautetta</h1>
            <button onClick={this.handler('hyva')}>Hyvä</button>
            <button onClick={this.handler('neutraali')}>Neutraali</button>
            <button onClick={this.handler('huono')}>Huono</button>

            <h2>Statistiikka</h2>
            <div>{this.historia()}</div>

            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)