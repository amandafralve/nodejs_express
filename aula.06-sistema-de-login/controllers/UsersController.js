import express from 'express';
const router = express.Router();
import User from '../models/User.js';
// IMportando bcrypt
import bcrypt from "bcrypt";

// ROTA DE LOGIN
router.get("/login", (req,res)=> {
    res.render("login");
});

// ROTA DE CADASTRO
router.get("/cadastro", (req,res) =>{
    res.render("cadastro");
});

// ROTA DE CRIAÇÃO DE USUARIO
router.post("/createUser", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    //  VERIFICAR SE O USUARIO JA ESTA CADASTRADO
    User.findOne({ where: {email:email}}).then(user => {
        //SE NÃO HOUVER
        if(user == undefined){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, 10);
            User.create({
                email:email,
                password:hash
            }).then(()=>{
                res.redirect("/login");
            })
        }else{
            // CASO USUARIO JA ESTEJA CADASTRADO
            res.send(`Usuário já cadastrado.<br><a href="/login">Faça o login</a>`)
        }
    })
    
})

// ROTA DE AUTENTICAÇÃO
router.post("/authenticate", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    // BUSCA O USUARIO NO BANCO
    User.findOne({
        where: {
            email:email
        },
    }).then(user =>{
        // SE O USUARIO ESTIVER CADASTRADO
        if(user != undefined){
            // VALIDA A SENHA (hash)
            const correct = bcrypt.compareSync(password, user.password);
            // SE A SENHA FOR VÁLIDA
            if(correct){
               // AUTORIZA LOGIN
               res.redirect("/");
            }else{
                // SENHA NÃO E VALIDA
                res.send(`Senha inválida!<br> <a href="/login">Tente novamente.</a>`);
            }
            
        }else{ // SE O USUARIO NAO EXISTE
            res.send(`Usuário não cadastrado. <a href="/cadastro">Cadastrar-se</a> ou <a href="/login">Faça login novamente</a>`);
        }
    })
})

export default router;