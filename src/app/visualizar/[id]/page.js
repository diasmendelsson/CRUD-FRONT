'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from './visualizar.module.css'
import { FaUserCircle } from "react-icons/fa"
import axios from "axios";
import { useSearchParams } from 'next/navigation'



export default function Listar({ params }) {

  const  [ data, setData ] = useState([])

  const [ message, setMessage ] = useState('')

  const [ id ] = useState(params.id)

  const getUser = async () => {


    const users = await axios.get('http://localhost:8080/usuarios/' + id)
    .then((response) => {
      setData(response.data.test)


    }).catch((err) =>{

      if(err.response){

        setMessage(err.response.data.mensagem)
      }else{
        setMessage("ERRO: Tente mais tarde !!")
      }

    })
  


  }

 
  useEffect(() =>{
    getUser();
  }, [id])

    return(
    

      <main className={styles.principal}>

        <h1 className={styles.usuario}>Usuário</h1>

        <button className={styles.btn1}><Link href="/listaUsuarios">Voltar </Link></button>
      
        <div className={styles.container}>
       
          <div className={styles.card}>

                <FaUserCircle  className={styles.icon} />

                {message ? <p>{message}</p> : ""}

                <h1>{data.name}</h1>

                <p>{data.email}</p>

                <p >{data.password}</p>

                <div className={styles.botoes}>

                <Link href={`/editar/${data.id}`}><button className={styles.btn} >Editar</button></Link>
                    <button className={styles.btn}>Excluir</button>
                 
               </div>

          </div>

       

        </div>

        </main>

    )
}