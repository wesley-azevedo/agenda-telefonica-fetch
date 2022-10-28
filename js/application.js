function checkCredential() {
    if (localStorage.getItem('logged') === false) {
        window.location.href = "login.html"
    }
}

function logout() {
    localStorage.setItem('logged', false);
    window.location.href = "login.html"
}

async function addContato() {
    let dados = input_nova_tarefa.value.split(" ")
    let nome = dados[0]
    let idade = dados[1]
    let chuchu = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            idade: idade
        })
    })
    console.log(chuchu)
    if (chuchu.ok) {
        console.log('adicionei')
        atualizarContatos()
    }
}

async function atualizar(identificador) {
    let nomeNovo = prompt("nome?")
    let idadeNovo = prompt("idade?")

    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/' + identificador, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeNovo,
            idade: idadeNovo
        })
    });
    if (res.ok) {
        alert('Atualizou')
        atualizarContatos()
    } else {
        alert('Erro ao atualizar')
    }

}

atualizarContatos();

async function atualizarContatos() {

    let response = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3');
    let body = await response.json();
    console.log(body);

    body.forEach(item => {
        let contact = document.createElement("tr");
        console.log(document.createElement("tr"));
        contact.id = `contact${item.id}`;
        console.log(contact.id);
        document.querySelector('#contactsBody').appendChild(contact);
        
        let id = document.createElement("td");
        id.innerHTML = `${item.id}`;
        console.log(id.value);
        console.log(`#${contact.id}`)
        document.querySelector(`#${contact.id}`).appendChild(id);

        let name = document.createElement("td");
        name.innerHTML = `${item.nome}`;
        console.log(name.value);
        console.log(`#${contact.id}`)
        document.querySelector(`#${contact.id}`).appendChild(name);

        let phone = document.createElement("td");
        phone.innerHTML = `${item.idade     }`;
        console.log(phone.value);
        console.log(`#${contact.id}`)
        document.querySelector(`#${contact.id}`).appendChild(phone);
    })
}

async function deletar(identificador) {
    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/' + identificador, {
        method: 'DELETE',
    });
    if (res.ok) {
        atualizarContatos();
    } else {
        console.log(res.statusText)
    }
}