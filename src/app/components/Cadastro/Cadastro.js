'use client'
import { useState } from 'react'
import styles from './cadastro.module.css'
import Link from 'next/link'
import axios from 'axios'


export default function Cadastro(){

    const [ name,  setName ] = useState('');
    const [ email,  setEmail ] = useState('');
    const [ password,  setPassword ] = useState('');


    const onSubmit  = async (e) => {

        e.preventDefault();

        const headers = {
        
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        await axios.post('http://localhost:8080/cadastrar', { name, email, password }, headers)
        .then((response) => {

        }).catch((err) => {
            
        })

        setName('');
        setEmail('');
        setPassword('');

    }

    return(
        


        <div className={styles.container}>

            <h1 className={styles.h1}>Cadastro</h1>

            <div className={styles.card}>
                <form onSubmit={onSubmit} className={styles.formulario}>

                    <input className={styles.input} type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder='Nome'
                    />

                    <input className={styles.input} type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Email'/>

                    <input className={styles.input} type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder='Senha'/>

                    <button type='submit' className={styles.btn}> Cadastrar</button>

                </form>

                <div className={styles.cardRod}>

                    <span ><Link className={styles.link} href='/'> Já é cadastrado ? Faça login</Link></span>

                    <span ><Link className={styles.link} href='/listaUsuarios'> Veja os usuários cadastrados</Link></span>
                
                </div>
              
            </div>
        </div>

    
    )
}