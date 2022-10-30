import { useState } from "react";
import { FiSearch } from 'react-icons/fi'
import './style.css'
import api from './services/api'


function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    //01310930/json/
    if (input === '') {
      alert("por favor preencha o campo!")
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    } catch {
      alert('Ops... Erro ao buscar o CEP.')
      setInput('')
    }
  }


  return (
    <div className="container">
      <h1 className="title">Buscador Cep</h1>
      <div className="containerInput">
        <input type="text"
          placeholder="Digite seu Cep..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Completomento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
      )}

    </div>
  );
}

export default App;
