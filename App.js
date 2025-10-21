// src/App.js

import React, { useEffect, useState } from "react";
import { listarNotas, criarNota } from "./api";
import "./App.css";

function App() {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");


  async function carregarNotas() {
    setErro(""); 
    try {
      const data = await listarNotas();
      setNotas(data);
    } catch (err) {
      setErro(err.message);
    }
  }

  useEffect(() => {
    carregarNotas();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const novaNota = { titulo, descricao };
      await criarNota(novaNota);
      
      
      await carregarNotas(); 
      
      alert("Nota criada com sucesso!");
      setTitulo("");
      setDescricao("");
      setErro(""); 
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="container">
      <h1>Cadastro de Notas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <h2>Notas cadastradas</h2>
      <ul>
        {notas.length === 0 && !erro ? (
            <p>Carregando notas ou nenhuma nota cadastrada.</p>
        ) : (
          notas.map((nota) => (
          
            <li key={nota.id}>
              <strong>{nota.titulo}</strong> — {nota.descricao}
            </li>
          ))
        )}
      </ul>
      {}
      <button onClick={carregarNotas} style={{ marginTop: '10px' }}>Recarregar</button>
    </div>
  );
}

export default App;