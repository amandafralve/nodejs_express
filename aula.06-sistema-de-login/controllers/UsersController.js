import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt"
import Auth from "../middleware/Auth.js";

// ROTA DE LOGIN
router.get("/login", (req,res) => {
    res.render("login", {
        loggedOut: true
        
    });
});

// ROTA DE LOGOUT
router.get("/logout", (req,res)=>{
    
    req.session.user = undefined;
    res.redirect("/")
    
})

// ROTA DE CADASTRO
router.get("/cadastro", (req,res) => {
    res.render("cadastro", {
        loggedOut: true,
        messages: req.flash()
    });
});

// ROTA DE CRIAÇÃO DE USUÁRIO
router.post("/createUser", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    // VERIFICAR SE O USUÁRIOI JÁ ESTÁ CADASTRADO
    User.findOne({where: {email: email}}).then((user) => {
        if(user == undefined){
            // AQUI É FEITO O CADASTRO E O HASH DE SENHA
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
      User.create({
        email: email,
        password: hash,
    }).then(() => {
        res.redirect("/login");
    });
       // CASO O USUÁRIO JÁ ESTEJA CADASTRADO:
    } else {
        req.flash('danger', "Usuário já cadastrado.")
        req.flash('success', "Usuário já cadastrado.")
        res.redirect("/cadastro")
     }
    }); 
});

// ROTA DE AUTENTICAÇÃO
router.post("/authenticate", (req,res) => {
    const email = req.body.email
    const password = req.body.password
    // BUSCA O USUÁRIO NO BANCO
    User.findOne({
        where:{
            email : email
        }
    }).then((user => {
        // SE O USUÁRIO TIVER CADASTRADO:
        if(user != undefined){
            // VALIDA A SENHA (VERIFICA O HASH)
            const correct = bcrypt.compareSync(password, user.password)

            if(correct){
                // AUTORIZA LOGIN
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                // res.send(`Usuario logado: <br>
                //     ID: ${req.session.user['id']}<br>
                //     EMAIL: ${req.session.user['email']}`)
                // ENVIAR MENSAGEM
                req.flash('success', "Login efetuado com sucesso!");
                res.redirect("/");
            } else{
                req.flash('danger', "A Senha informada está incorreta. Tente novamente")
                res.redirect("/login")
            }
        }
        else{
            // SE O USUÁRIO NÃO EXISTE 
            req.flash('danger', "Usuário não existe. Verifique os dados digitados")
            res.redirect("/login")        }
    })).catch((error) => {
        console.log(error);
    });
})


export default router;