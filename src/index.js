import React from 'react'
import ReactDOM from 'react-dom'


class Anekdote extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selected: 0
      }
    }

    handler = () => {    
        return () => {
            this.setState({ selected: Math.floor(Math.random() * this.props.anecdotes.length)})
        }
    }
  
    render() {
      return (
        <div>
            {this.props.anecdotes[this.state.selected]}
            <br/>
            <Button handleClick={this.handler()} text="Seuraava satunnainen ohjelmistotuotantoon liittyvän anekdootti" />
        </div>
      )
    }
  }
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  


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
                <Statistic otsikko={'Hyva'} kaava={hyva} />
                <Statistic otsikko={'Neutraali'} kaava={neutraali} />
                <Statistic otsikko={'Huono'} kaava={huono} />
                <Statistic otsikko={'Keskiarvo'} kaava={ Math.round((hyva + -1*huono ) / yhteensa *10) / 10} />
                <Statistic otsikko={'Positiivisia'} kaava={Math.round(hyva  / yhteensa * 100 *10) / 10} />
            </tbody>
            </table>
            <br/>
        </div>
      )
}

// Statistic huolehtii yksittäisen tilastorivin, esim. keskiarvon näyttämisestä
const Statistic = ({otsikko, kaava}) => (
        <tr>
            <td>{otsikko}</td>
            <td>{kaava}</td>
        </tr>
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

                <h1>Anekdootit</h1>
                <Anekdote anecdotes={anecdotes} />

                <br/><br/>
<hr/>
                <h1>Unicafe</h1>

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