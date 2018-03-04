import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

class Anekdote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            pisteet: [0, 0, 0, 0, 0, 0]
        }
    }

    handlerNext = () => {
        return () => {
            console.log(this.state.selected)
            console.log(this.state.pisteet)

            this.setState({ selected: Math.floor(Math.random() * this.props.anecdotes.length) })
        }
    }

    handlerVote = () => {
        return () => {
            console.log(this.state.selected)
            console.log(this.state.pisteet)
            const kopio = this.state.pisteet.slice()
            kopio[this.state.selected] += 1
            console.log(kopio)
            this.setState({ pisteet: kopio })
        }
    }

    enitenAania = () => {
        let enitenAania = 0

        for (let i = 1; i < this.state.pisteet.length; i++) {
            if (this.state.pisteet[enitenAania] < this.state.pisteet[i]) {
                enitenAania = i
            }
        }
        console.log("laskettiin eniten ääniä", enitenAania)

        return (
            <p>
                {this.props.anecdotes[enitenAania]}
                <br />
                Ääniä: {this.state.pisteet[enitenAania]}
            </p>
        )
    }

    render() {
        return (
            <div>
                {this.props.anecdotes[this.state.selected]}
                <p>
                    Ääniä: {this.state.pisteet[this.state.selected]}
                </p>
                <br />
                <Button handleClick={this.handlerVote()} text="Äänestä tätä" />
                <Button handleClick={this.handlerNext()} text="Seuraava satunnainen ohjelmistotuotantoon liittyvän anekdootti" />

                <h2>Eniten ääniä saanut anekdootti</h2>
                {this.enitenAania()}


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
const Statistics = () => {
    if (store.total === 0) {
        return (
            <div>
                <em>Anna palautetta nappeja painelemalla</em><br />
                <em>Ei vielä annettuja palautteita</em>
            </div>
        )
    }
    return (
        <div>
            <table>
                <tbody>

                    <Statistic otsikko={'hyvä'} kaava={store.GOOD} />
                    <Statistic otsikko={'neutraali'} kaava={store.OK} />
                    <Statistic otsikko={'huono'} kaava={store.BAD} />

                    <Statistic otsikko={'Keskiarvo'} kaava={Math.round((store.GOOD + -1 * store.BAD) / store.total * 10) / 10} />
                    <Statistic otsikko={'Positiivisia'} kaava={Math.round(store.GOOD / store.total * 100 * 10) / 10} />
                </tbody>
            </table>
            <br />
        </div>
    )
}

// Statistic huolehtii yksittäisen tilastorivin, esim. keskiarvon näyttämisestä
const Statistic = ({ otsikko, kaava }) => (
    <tr>
        <td>{otsikko}</td>
        <td>{kaava}</td>
    </tr>
)


class App extends React.Component {
    constructor() {
        super()
    }



    render() {
        return (
            <div>
                <h1>Unicafe</h1>

                <h1>Anna palautetta</h1>
                <Button onClick={e => store.dispatch({ type: 'GOOD' })} text="Hyvä" />
                <Button onClick={e => store.dispatch({ type: 'OK' })} text="Neutraali" />
                <Button onClick={e => store.dispatch({ type: 'BAD' })} text="Huono" />

                <h2>Statistiikka</h2>
                <Statistics />
            </div>

        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
