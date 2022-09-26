import firebase from './firebase.config'
import { useState } from 'react'

import './index.css'
function App() {
  
  const [titulo, setTitulo] = useState('')
  const [autor,  setAutor] = useState('')
  
  async function handleAdd(){
      await firebase.firestore().collection('posts')
      .add({
        titulo: titulo,
        autor: autor
      }).then(() => {
        console.log("Dados Cadastrado.")
        setTitulo('')
        setAutor('')
      }).catch((error) =>{
        console.log("De ruim : " + error)
      })
  }
  
  return (
    <div className='container'>
     <div className="form-container">
      <label htmlFor="">Titulo</label>
        <textarea cols="10" rows="10" value={titulo} onChange= {(e) => setTitulo(e.target.value)}></textarea>
        <label htmlFor="">Autor</label>
        <input type="text" placeholder='Digite o nome do Autor' value={autor} onChange={ (e) => setAutor(e.target.value) } />
        <button onClick={handleAdd}>Cadastrar</button>
     </div>
    </div>
  );
}

export default App;
