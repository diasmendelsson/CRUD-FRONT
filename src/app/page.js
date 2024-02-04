import styles from './page.module.css'
import Cadastro from './components/Cadastro/Cadastro'

export default function Home() {
  return (
    <main className={styles.principal} >

        <Cadastro />

    </main>
  )
}
