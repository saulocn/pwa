let logado = JSON.parse(localStorage.getItem("logado"))


LoginUsuario_render({
    logado,
    usuario:localStorage.getItem("nomeUsuario"),
    onLogin: (nomeUsuario) => {
        localStorage.setItem("logado", true)
        localStorage.setItem("nomeUsuario", nomeUsuario)
        logado = true
    },
    onLogout: () => {
        logado = false
        localStorage.setItem("logado", false)
        localStorage.removeItem("nomeUsuario")
    }
});