//API REST


import express from 'express' //importando express para criação de servidor
import { StatusCodes } from 'http-status-codes' //importando Status code para passar o status HTTP após a utilização do método


//Criação de servidor com express 
const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
}) 

app.use(express.json()) //determina que todos os requests serão enviados em json


//Lista para simular banco de dados
let users = [
  {id: 1, name: 'Nícolas Kormann', age: 26},
  {id: 2, name: 'Adem Pölitz', age: 101},
]

/* ----------------------------------------------------------- */

//Resposta na raiz da página
app.get('/', (request, response) => {
  return response.send('<h1>Trabalhando com servidor express.</h1>')
})


//CRIANDO ROTAS


//Criando rota get para retonar lista de usuários
//Rota get - para obter informação
//Recuperando todos os recursos de uma coleção
app.get('/users', (request, response) => {
  return response.send(users)
})


//Criando rota get para retonar usuários específico
//Rota get - para obter informação
//Recuperando apenas um recurso de uma coleção
app.get('/users/:userId', (request, response) => {
  const userId = request.params.userId
  const user = users.find(user => {
    return (user.id === Number(userId))
  })
  return response.send(user)
})


//Criando rota com post para criar novo usuário na lista
app.post('/users', (request, response) => {
  const newUser = request.body

  users.push(newUser)

  return response.status(StatusCodes.CREATED).send(newUser)
})


//Criando rota com put para atualizar/modificar um usuário
app.put('/users/:userId', (request, response) => {
  const userId = request.params.userId
  const updateUser = request.body
  
  users = users.map((user) => {
    if (Number(userId) === user.id) {
      return updateUser
    }
    return user
  })
  return response.send(updateUser)
})


//Criando tora com delete para remover usuário
app.delete('/users/:userId', (request, response) => {
  const userId = request.params.userId
  users = users.filter((user) => user.id !== Number(userId))
  return response.status(StatusCodes.NO_CONTENT).send()
})

