import express from 'express'
const router = express.Router()

import Pedido from '../models/Pedido.js'

// ROTA PEDIDOS
router.get("/pedidos", function(req,res){
    Pedido.findAll().then((pedidos) =>{
        res.render("pedidos",{
            pedidos:pedidos
        })
    })
})

// ROTA INSERÇÃO DE PEDIDOS
router.post("/pedidos/new", (req,res) =>{
    const numero = req.body.numero;
    const valor = req.body.valor
    Pedidos.create({
        numero:numero,
        valor:valor
    }).then(() => {
        res.redirect("/pedidos");
    })
})


// ROTA CANCELAR PEDIDO
router.get("/pedidos/delete/:id", (req,res)=>{
    const id = req.params.id
})

export default router