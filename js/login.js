function insertCredential() {
    localStorage.setItem('user', "login");
    localStorage.setItem('pass', "senha");
    console.log(localStorage.getItem('user'))
    console.log(localStorage.getItem('senha'))   
 

}

function access() {
    if (user.value === localStorage.getItem('user').valeu && pass.value === "senha") {
        localStorage.setItem("logged", true);
        window.location.href = "index.html"
    } else {
        loginMessage.innerHTML = 'Tente usar "login" e "senha".'
    }
}