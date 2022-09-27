import firebase from './firebase.config'
import { useState,useEffect } from 'react'

import './app.css'
function App() {
  
  const [idPost,setIdPost] = useState('')
  const [titulo, setTitulo] = useState('')
  const [autor,  setAutor] = useState('')
  const [posts, setPosts] = useState([])
  
  async function handleAdd(){
    console.log("clicou")
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
  
  async function editPost(){
    await firebase.firestore().collection('posts').doc(idPost)
    .update({
      titulo,
      autor
    })
    
  }
  
 
  
  useEffect(() => {
    async function loadPosts() {
      await firebase.firestore().collection('posts').onSnapshot((doc) => {
      let lista = []
        doc.forEach((item) =>{
          lista.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor
          })
        })
        setPosts(lista)
      })
     
    }
    loadPosts()
    
  }, [posts]);
  
  return (
    <div className='container'>
     <div className="form-container">
     <label htmlFor="">ID</label>
     <input type="text" placeholder="Digite o Id" value={idPost} onChange={(e) => setIdPost(e.target.value)}/>
     
      <label htmlFor="">Titulo1</label>
        <textarea cols="10" rows="3" value={titulo} onChange= {(e) => setTitulo(e.target.value)}></textarea>
        <label htmlFor="">Autor</label>
        <input type="text" placeholder='Digite o nome do Autor' value={autor} onChange={ (e) => setAutor(e.target.value) } />
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={editPost}>Editar</button>
     </div>
     
     <div className="list-container">
        <ul>
        {
          posts.map((post) =>{
            return(
                <li key={post.id}>
                  <span>  {post.id } -- </span> <br />
                  <span>  {post.titulo } -- </span> <br />
                  <span>  {post.autor }</span> <br />
                </li>
            )
          })
        }
        </ul>
     </div>
     
    </div>
  );
}

export default App;
