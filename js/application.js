contactList = JSON.parse(localStorage.getItem('contactList'))
console.log(contactList)
contactFilter = JSON.parse(localStorage.getItem('contactFilter'))
console.log(contactFilter)

function checkCredential() {
    if (localStorage.getItem('logged') === false) {
        window.location.href = "login.html"
    } else {
        escreverHTML();
    }
}

function logout() {
    localStorage.setItem('logged', false);
    window.location.href = "login.html"
}

async function updateContacts() {
    let response = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3');
    let body = await response.json();
    localStorage.setItem('contactList', JSON.stringify(body))
    contactList = JSON.parse(localStorage.getItem('contactList'))
    console.log(contactList)
    escreverHTML()
}

async function addContact() {
    let addName = inputAddName.value
    let addPhone = inputAddPhone.value
    let addNewContact = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: addName,
            idade: addPhone
        })
    })
    console.log(addNewContact)
    if (addNewContact.ok) {
        console.log('adicionei')
        updateContacts()
        window.location.reload(false);
    }
}

function escreverHTML() {

    if (contactFilter != [0]) {
        numberOfContacts.innerHTML = contactList.length
        contactList.forEach(item => {
        let contact = document.createElement("tr");
        contact.id = `contact${item.id}`;
        document.querySelector('#contactsBody').appendChild(contact);

        let id = document.createElement("td");
        id.innerHTML = `${item.id}`;
        document.querySelector(`#${contact.id}`).appendChild(id);

        let name = document.createElement("td");
        name.innerHTML = `${item.nome}`;
        document.querySelector(`#${contact.id}`).appendChild(name);

        let phone = document.createElement("td");
        phone.innerHTML = `${item.idade}`;
        document.querySelector(`#${contact.id}`).appendChild(phone);

        let options = document.createElement("td");
        options.id = `options${item.id}`;
        document.querySelector(`#${contact.id}`).appendChild(options);

        let editBtn = document.createElement("input");
        editBtn.type = 'button'
        editBtn.value = 'editar'
        document.querySelector(`#${options.id}`).appendChild(editBtn);

        let deleteBtn = document.createElement("input");
        deleteBtn.type = 'button'
        deleteBtn.value = 'excluir'
        document.querySelector(`#${options.id}`).appendChild(deleteBtn);
    })  
    
    



    } else {
        numberOfContacts.innerHTML = contactFilter.length
        contactFilter.forEach(item => {
        let contact = document.createElement("tr");
        contact.id = `contact${item.id}`;
        document.querySelector('#contactsBody').appendChild(contact);

        let id = document.createElement("td");
        id.innerHTML = `${item.id}`;
        document.querySelector(`#${contact.id}`).appendChild(id);

        let name = document.createElement("td");
        name.innerHTML = `${item.nome}`;
        document.querySelector(`#${contact.id}`).appendChild(name);

        let phone = document.createElement("td");
        phone.innerHTML = `${item.idade}`;
        document.querySelector(`#${contact.id}`).appendChild(phone);

        let options = document.createElement("td");
        options.id = `options${item.id}`;
        document.querySelector(`#${contact.id}`).appendChild(options);

        let editBtn = document.createElement("input");
        editBtn.type = 'button'
        editBtn.value = 'editar'
        document.querySelector(`#${options.id}`).appendChild(editBtn);

        let deleteBtn = document.createElement("input");
        deleteBtn.type = 'button'
        deleteBtn.value = 'excluir'
        document.querySelector(`#${options.id}`).appendChild(deleteBtn);
    })
    } 
}

function searchContact() {
    const filterName = nameFilter.value
    console.log(filterName)

    if (filterName != "") {
        contactFilter = contactList.filter(item => item.nome == filterName)
        console.log(contactFilter)
        localStorage.setItem('contactFilter', JSON.stringify(contactFilter))
        window.location.reload(false);
    } else {
        localStorage.setItem('contactFilter', [0])
        window.location.reload(false);
    }



}

// Parte de cima foi ajustada.









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
        updateContacts()
    } else {
        alert('Erro ao atualizar')
    }

}

async function deletar(identificador) {
    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/' + identificador, {
        method: 'DELETE',
    });
    if (res.ok) {
        updateContacts();
    } else {
        console.log(res.statusText)
    }
}