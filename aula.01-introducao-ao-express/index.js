// IMPORTANDO O EXPRESS NA APLICAÇÃO
const express = require("express"); // CommonJS Modules

// Criando uma Instância do Express
const app = express();
// app.metodoAUtilizar

// CRIANDO A ROTA PRINCIPAL
app.get("/", function(req,res){ // /home , / -> rota raiz
    res.send("Hello World! Bem Vindo")
}) 
// Iniciando o servidor na porta 8080
app.listen(8080, function(error){
    if(error){
        console.log(`Ocorreu um erro: ${error}`);
    }else{
        console.log("Servidor iniciado com sucesso!");
    }
})