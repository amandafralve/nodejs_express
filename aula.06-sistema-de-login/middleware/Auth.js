// VERIFICA SE A FUNÇÃO ESTÁ CRIADA

function Auth(req, res, next){
    if(req.session.user != undefined){
        next()
    }else{
        // se a sessão for undefined(não logado) joga para a sessaio de login
        res.render("login", {
            loggedOut: true
        })
    }
}

export default Auth;