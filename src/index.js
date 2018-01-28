import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
    <h1>{props.kurssi}</h1>
)

const Sisalto = (props) => (
    <div>
        <Osa osa={props.osa1} />
        <Osa osa={props.osa2} />
        <Osa osa={props.osa3} />
    </div>
)

const Osa = (props) => (
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
)

const Yhteensa = (props) => (
    <p>Yhteensä {props.yhteensa} tehtävää</p>
)



const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }

  return (
    <div>

      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} />
      <Yhteensa yhteensa={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} />

    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)