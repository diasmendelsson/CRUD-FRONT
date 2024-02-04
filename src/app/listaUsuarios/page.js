'use client'
import { useEffect, useState } from "react";
import styles from "./lista.module.css"
import { FaUserCircle } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import Link from "next/link";
import axios from 'axios'
import { servDelete } from "../services/delete";



export default function Listar() {

  
  const [ dados, setDados ] = useState([])

  
  // Declarar a váriavel para receber o número da página
  const [page, setPage ] = useState('')

  // Declarar a váriavel para receber o número da última página 
  const [ lastPage, setLastPage ] = useState('')

  const [mensage, setMessage] = useState('')


  // Criar a função com a requisição para API recuperar usuários 
  const getUser = async (page) => { 

    if(page === undefined){
        page = 1
    }

    setPage(page)

     // Realizar a reuisição para API com axios para a rota  listar usuários
     await axios.get('http://localhost:8080/usuarios?page=' + page)
     .then((response) => {
      
      // Atribuir os registros no state data
      setDados(response.data.test)

      // Aqui pega os dados da pagination e recebe
      setLastPage(response.data.pagination.lastPage)

     }).catch((err) =>{

     })

  

  }

    // useEffect é usado para lidar com efeitos colaterais em um componente. Por exemplo, atualizar o estado do componente, fazer chamadas a APIs, manipular eventos, entre outros 
    useEffect(() => {
      //Chamar a função
      getUser();
  },[]);


  const deleteUser = async (idUser) => {
    console.log(idUser)


    const response = await servDelete('http://localhost:8080/usuarios/' + idUser )
  
    getUser(page)
    
  }


    return(


    

      <main className={styles.principal}>

        <h1 className={styles.usuario}>Usuários</h1>

        <button className={styles.btn1}><Link href="/">Voltar </Link></button>



              <div className={styles.container}>

              {dados.map(user => (
                <div  key={user.id} className={styles.card}>

                      <FaUserCircle  className={styles.icon} />

                      <h1>{user.name}</h1>

                      <p>{user.email}</p>

                      <div className={styles.botoes}>
                        <Link href={`/visualizar/${user.id}`}><button className={styles.btn} ><HiViewGrid /></button></Link>
                        <Link href={`/editar/${user.id}`}><button className={styles.btn} >Editar</button></Link>
                        <button onClick={() => deleteUser(user.id)} className={styles.btn}>Excluir</button>
                      </div>

                </div>
            ))}
        
        </div>

        <div className={styles.nav}>

           {page !== 1 ? <button type="button" onClick={() => getUser(1)}><FaCaretLeft /></button> : <button type="button" disabled><FaCaretLeft /></button> }

           {page !== 1 ? <button className={styles.btnNav} type="button" onClick={() => getUser(page - 1)}>{page - 1}</button> : "" }

           <button className={styles.btnNav} type="button" disabled>{page}</button>

           {page + 1 <= lastPage ? <button className={styles.btnNav} type="button" onClick={() => getUser(page + 1)}>{page + 1}</button> : ""}


           {page !== lastPage ? <button type="button" onClick={() => getUser(lastPage)}><FaCaretRight /></button> : <button type="button" disabled><FaCaretRight /></button> }


        </div>


        </main>

    )
}