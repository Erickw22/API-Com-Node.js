import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

//Rota para criação de novo usuario
app.post('/user', async (req, res) =>{

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})
//Rota para Listar todos os usuarios ja criados
app.get('/user', async (req, res) => {

    let users = []

    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else{
        const users = await prisma.user.findMany()
    }
    
    res.status(200).json(users)

})

//Rota para Editar varios usuarios ja existentes
app.put('/user/:id', async (req, res) =>{

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

//Rota para Excluir usuarios ja existentes
app.delete('/user/:id', async (req, res) =>{
    await prisma.user.deleteMany({
        where: {
            id: req.params.id,
        },
    })

res.status(200).json({message: 'Usuário deletado'})
})


app.listen(3000)