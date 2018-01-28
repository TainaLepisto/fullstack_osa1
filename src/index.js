import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        hyva: 0,
        neutraali: 0 ,
        huono: 0 
      }
    }

    handler = (palaute) => {
        console.log('nappia painettu ', palaute)

        return () => {
            if(palaute==='hyva'){
                this.setState({ hyva: this.state.hyva +1 })
            }
            if(palaute==='neutraali'){
                this.setState({ neutraali: this.state.neutraali +1 })
            }
            if(palaute==='huono'){
                this.setState({ huono: this.state.huono +1 })
            }
        }
    }
    
    historia = () => {
        if (this.state.hyva === 0 && this.state.neutraali === 0 && this.state.huono === 0) {
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