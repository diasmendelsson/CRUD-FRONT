import axios from 'axios'

export const servDelete = async (url) =>{

    var mensagem;

    await axios.delete(url)
    .then((response) => {
        mensagem = response.data.mensagem

    }).catch((err) =>{

        if(err.response){

          mensagem = err.response.data.mensagem

          }else{
           mensagem = "ERRO: Tente mais tarde !!"
          }

    })

  
}