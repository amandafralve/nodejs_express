import express from "express";
const router = express.Router();
// Importando o model de Produto
import Produto from "../models/Produto.js";
import Auth from "../middleware/Auth.js";

// ROTA PRODUTOS
router.get("/produtos", Auth, (req, res) => {
  Produto.findAll()
    .then((produtos) => {
      res.render("produtos", {
        produtos: produtos,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE CADASTRO DE PRODUTOS
router.post("/produtos/new",Auth, (req, res) => {
  const nome = req.body.nome;
  const preco = req.body.preco;
  const categoria = req.body.categoria;

  Produto.create({
    nome: nome,
    preco: preco,
    categoria: categoria,
  })
    .then(() => {
      res.redirect("/produtos");
    })
    .catch((error) => {
      console.log(error);
    });
});
// ROTA DE EXCLUSÃO DE PRODUTOS
// ESSA ROTA POSSUI UM PARÂMETRO ID
router.get("/produtos/delete/:id", Auth, (req, res) => {
  // COLETAR O ID QUE VEIO NA URL
  const id = req.params.id;
  // MÉTODO PARA EXCLUIR
  Produto.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/produtos");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDIÇÃO DE PRODUTO
router.get("/produtos/edit/:id", Auth,(req, res) => {
  const id = req.params.id;
  Produto.findByPk(id).then((produto) => {
    res.render("produtoEdit", {
        produto: produto,
      });   
  }).catch((error) => {
    console.log(error);
  });
});

// ROTA DE ALTERAÇÃO DE PRODUTO
router.post("/produtos/update", Auth,(req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const preco = req.body.preco;
  const categoria = req.body.categoria;
  Produto.update(
    {
      nome: nome,
      preco: preco,
      categoria: categoria
    },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/produtos");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;
