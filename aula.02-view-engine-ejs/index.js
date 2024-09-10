// IMPORTANDO O EXPRESS NA APLICAÇÃO
const express = require("express"); // CommonJS Modules

// Criando uma Instância do Express
const app = express();
// app.metodoAUtilizar

// Definindo o EJS como renderizador de páginas
app.set('view engine','ejs');

// CRIANDO A ROTA PRINCIPAL
app.get("/", function(req,res){ // /home , / -> rota raiz
    // Será renderizada a página index.ejs que está na pasta views
    res.render("index")
}) 

// ROTA PERFIL
// :nome é um parâmetro obrigatório
// :nome? é um parâmetro opcional
app.get("/perfil/:nome?", (req, res) => {
    // Coletando o parâmetro e guardando na variável
    const nome = req.params.nome;
    // sera renderizada perfil.ejs
    res.render("perfil",{
        nome:nome
    });
   
  });


// ROTA PEDIDOS
app.get("/pedidos", (req, res) => {
    // ARRAY DE OBJETOS COM OS PEDIDOS
    const pedidos = [
    {produto: "Celular", valor: 3000},
    {produto: "Computador", valor: 4000},
    {produto: "Tablet", valor: 2000},
    {produto: "Notebook", valor: 3800}
  ]
    res.render("pedidos", {
      // Enviando o array de objetos para a página
      pedidos: pedidos
    })
  });
   

// ROTA DE VÍDEOS
// :playlist? e :video? - parâmetros opcionais
app.get("/videos/:playlist?/:video?", (req, res) => {
    const playlist = req.params.playlist;
    const video = req.params.video;
    // sera renderizada videos.ejs
    res.render("videos",{
        playlist:playlist,
        video:video
    });
   
  });


// ROTA DE PRODUTOS
app.get("/produtos/:produto?",(req,res) => {
    const listaProdutos = ['Computador','Celular','Tablet','Notebook'];
    const produto = req.params.produto
    res.render("produtos",{
        // ENVIANDO VARIÁVEL PARA A PÁGINA
        // SERÁ CHAMADO NA PÁGINA || VARIÁVEL QUE ESTÁ NA INDEX (req.params)
        produto:produto,
        listaProdutos:listaProdutos
        // NA PÁGINA produtos.ejs haverá um teste de condição
    })
})

// Iniciando o servidor na porta 8080
const port = 8080;
app.listen(8080, function(error){
    if(error){
        console.log(`Ocorreu um erro: ${error}`);
    }else{
        console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
    }
})

