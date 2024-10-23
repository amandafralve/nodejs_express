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

// ROTA DE EXCLUSÃO DE PRODUTO
router.get("/produtos/delete/:id", (req,res) => {
    const id = req.params.id;
    // MÉTODO EXCLUIR
    Produto.destroy({
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect("/produtos")
    }).catch(error => {
        console.log(error);
    })
})

// ROTA EDICAO DADOS PRODUTO
router.get("/produtos/edit/:id", (req,res) =>{
    const id = req.params.id;
    Produto.findByPk(id).then((produto) => {
        res.render("produtoEdit",{
            produto:produto
        })
    }).catch((error) => {
        console.log(error);
    })
})

//ROTA ALTERACAO DADOS PRODUTO
router.post("/produtos/update", (req,res) =>{
    const {id, nome, preco, categoria} = req.body;

    Produto.update(
        {
            nome:nome,
            preco:preco,
            categoria:categoria
        },
        {
            where: {id:id}
        }
    ).then(()=>{
        res.redirect("/produtos")
    }).catch((error) =>{
        console.log(error)
    })
})

export default router