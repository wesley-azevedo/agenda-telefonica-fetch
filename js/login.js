function insertCredential() {
    localStorage.setItem('user', "login");
    localStorage.setItem('pass', "senha");
    if (localStorage.getItem('logged') === true) {
        window.location.href = "application.html"
    }
}

function access() {
    if (user.value === localStorage.getItem('user') && pass.value === localStorage.getItem('pass')) {
        localStorage.setItem('logged', true);
        window.location.href = "application.html"
    } else {
        loginMessage.innerHTML = 'Tente usar "login" e "senha".'
    }
}