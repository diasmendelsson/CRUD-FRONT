'use client'
import { useEffect, useState } from "react";
import styles from './editar.module.css'
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"
import axios from "axios";
import { useSearchParams } from 'next/navigation'



export default function Editar({ params }) {

    const [ data, setData ] = useState({
      name:"",
      email:"",
      password:""
    })

    const [ message, setMessage ] = useState('')

    const [ id ] = useState(params.id)
   

    const getUser = async () => {

      // Retornar erro quando não tiver o id do usuário 
      if(id === undefined){
        setMessage('ERRO: Usuário não encontrado!')
      }

      // Realizar a requisição para API com axio para a rota recuperar os usuários 
      await axios.get('http://localhost:8080/usuarios/' + id)
      .then((response) => {

        console.log(response.data.test)
        setData(response.data.test)

      }).catch((err) =>{
        if(err.response){
          setMessage(err.response.data.mensagem)
        }else{
          setMessage("ERRO: Tente mais tarde!")
        }
      })

    }

    useEffect(() => {
      getUser();
    }, [id])

    // Receber os dados do formulario
    const valueInput = (e) => setData({ ...data, [e.target.name]: e.target.value})

    // Executar a função quando o usuário clicar no botão do formulário
    const editUser = async (e) => {

      // Bloquear o recarregamento da página
      e.preventDefault();

      const headers = {
      
          'headers': {
              'Content-Type': 'application/json'
          }
      }

      await axios.put('http://localhost:8080/usuarios/' + id, data, headers)
      .then((response) => {

        setMessage(response.data.mensagem)
      }).catch((err) => {
          if(err.response){
            setMessage(err.response.data.mensagem)
          }else {
            setMessage("Erro: Tente novamente ais tarde ou entre em contato com Mendelsson Gostoso")
          }
      })

    }

    return(
    

      <main className={styles.principal}>

        <button className={styles.btn1}><Link href="/listaUsuarios">Voltar </Link></button>

        <div className={styles.card}>

                <form onSubmit={editUser} className={styles.formulario}>

                  {message ? <p>{message}</p> : ""}

                    <input className={styles.input}
                    name="id"
                    type='hidden'
                    value={data.id}
                    />



                 
                     <input className={styles.input}
                    name="name"
                    type='text'
                    value={data.name}
                    onChange={valueInput}
                    placeholder='Nome'
                    />
                  

                    
                    <input className={styles.input}
                    name="email"
                    type='email'
                    value={data.email}
                    onChange={valueInput}
                    placeholder='Email'/>
                 
                    
                  
                    <input className={styles.input}
                    name="password"
                    type='text'
                    value={data.password}
                    onChange={valueInput}
                    placeholder='Senha'/>
                   
                    <button type='submit' className={styles.btn}> Editar</button>

                </form>
              
            </div>

        </main>

    )
}