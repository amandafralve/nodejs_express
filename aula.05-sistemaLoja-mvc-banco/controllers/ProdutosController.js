import express from 'express'
const router = express.Router()

import Produto from '../models/Produto.js'

// ROTA PRODUTOS
router.get("/produtos", function(req,res){
    Produto.findAll().then(produtos => {
        res.render("produtos", {
            produtos:produtos
        })
    })
})

// ROTA CADASTRO DE PRODUTO
router.post("/produtos/new", (req,res) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const categoria = req.body.categoria
    Produto.create({
        nome:nome,
        preco:preco,
        categoria:categoria
    }).then(() => {
        res.redirect("/produtos");
    })
})

export default router