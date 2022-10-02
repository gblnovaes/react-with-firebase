import firebase from './firebase.config'
import { useState,useEffect } from 'react'

import './app.css'
function App() {
  
  const [idPost,setIdPost] = useState('')
  const [titulo, setTitulo] = useState('')
  const [autor,  setAutor] = useState('')
  const [posts, setPosts] = useState([])
  
  const [email,setEmail] = useState('')
  const [senha,setSenha] = useState('')
  
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
    }).then(() =>{
        setIdPost('')
        setTitulo('')
        setAutor('')
    })
    
  }
 
  async function deletePost(){
    await firebase.firestore().collection('posts').doc(idPost).delete().then(()=>{
      setIdPost('')
      console.log("DEleado com sucesso.")
    })
  }
 
    async function deletePostById(id){
    await firebase.firestore().collection('posts').doc(id).delete().then(()=>{
      console.log("Deletado com sucesso. ID:" + id) 
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
  
  async function novoUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(email,senha)
    .then(()=>{
      console.log("Cadastrado com sucesso")
      setEmail('')
      setSenha('')
    })
    .catch((error)=>{
      console.log("Error :" + error)
    })
  }
  
  return (
    
    <>
    
    <div className='container'>
    <h2>Cadastro de Novo Usuario</h2>
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Digite o Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
          
          <label htmlFor="">Senha</label>
          <input type="text" placeholder="Digite a Senha"  value={senha} onChange={(e) => setSenha(e.target.value)}/> <br />
          
          <button onClick={novoUsuario}>Cadastrar</button>
    </div>
    
    <div className='container'>
        <div className="form-container">
        <h2>Banco de Dados</h2>
          <label htmlFor="">ID</label>
          <input type="text" placeholder="Digite o Id" value={idPost} onChange={(e) => setIdPost(e.target.value)} />

          <label htmlFor="">Titulo1</label>
          <textarea placeholder="Digite o titulo" cols="10" rows="3" value={titulo} onChange={(e) => setTitulo(e.target.value)}></textarea>
          <label htmlFor="">Autor</label>
          <input type="text" placeholder='Digite o nome do Autor' value={autor} onChange={(e) => setAutor(e.target.value)} />
          <button onClick={() => handleAdd()}>Cadastrar</button>
          <button onClick={() => editPost()}>Editar</button>
          <button onClick={() => deletePost()}>Excluir</button>
        </div>

        <div className="list-container">
          <ul>
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <span>  {post.id} --  </span><button onClick={() => deletePostById(post.id)}> Excluir</button> <br />
                  <span>  {post.titulo} -- </span> <br />
                  <span>  {post.autor}</span> <br />
                </li>
              )
            })}
          </ul>
        </div>

      </div></>
  );
}

export default App;
