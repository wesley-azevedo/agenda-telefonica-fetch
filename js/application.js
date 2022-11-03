let contactList = JSON.parse(localStorage.getItem('contactList'));
let contactFilter = JSON.parse(localStorage.getItem('contactFilter'));
let favoriteList = [];
let order = [];
let idEdit = "";

function checkCredential() {
    if (localStorage.getItem('logged') === false) {
        window.location.href = "login.html"
    } else {
        if (localStorage.getItem('favoriteList') != null) {
            favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
        }
        writeHTML();
    }
}

function orderList() {
    if (localStorage.getItem('order') == "asc") {
        order = localStorage.setItem('order', "desc");
    } else {
        order = localStorage.setItem('order', "asc");
    }
    location.reload();
}

function logout() {
    localStorage.setItem('logged', false);
    window.location.href = "login.html";
}

async function addContact() {
    let addName = inputAddName.value;
    let addPhone = inputAddPhone.value;
    let addNewContact = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa', {
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
        console.log('adicionei');
        location.reload();
    }
}

async function editContact() {
    let editedId = editId.value;
    let editedName = inputEditName.value;
    let editedPhone = inputEditPhone.value;

    let response = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa/' + editedId, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: editedName,
            idade: editedPhone
        })
    });
    if (response.ok) {
        console.log("atualizei")
    } else {
        alert('erro ao atualizar contato');
    }
    location.reload();
    console.log("teste")
}

async function showContact(id) {
    console.log(id)
    contactToShow = contactList.filter(item => item.id == id)
    contactToShow.forEach(element => {
        inputEditName.value = element.nome;
        inputEditPhone.value = element.idade;
        editId.value = id
    });
}

async function writeHTML() {

    let response = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa');
    let body = await response.json();
    localStorage.setItem('contactList', JSON.stringify(body.sort(function (a, b) {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
    })));

    if (contactFilter == 0 || contactFilter == null) {
        contactList = JSON.parse(localStorage.getItem('contactList'));
    } else {
        contactList = contactFilter
    }

    if (localStorage.getItem('order') != "asc") {
        contactList = contactList.reverse();
    }

    numberOfContacts.innerHTML = contactList.length;
    contactList.forEach(item => {
        let contact = document.createElement("tr");
        contact.id = `contact${item.id}`;
        document.querySelector('#contactsBody').appendChild(contact);

        let id = document.createElement("td");
        id.id = `id${item.id}`;
        document.querySelector(`#${contact.id}`).appendChild(id);
        let starIcon = document.createElement("i");
        starIcon.id = `starIcon${item.id}`;
        if (favoriteList.includes(item.id)) {
            starIcon.classList = "bi bi-star";
        } else {
            starIcon.classList = "bi bi-star-fill";
        }
        starIcon.addEventListener("click", () => { favoriteContact(item.id) });
        document.querySelector(`#id${item.id}`).appendChild(starIcon);

        let name = document.createElement("td");
        name.innerHTML = `${item.nome}`;
        document.querySelector(`#${contact.id}`).appendChild(name);

        let phone = document.createElement("td");
        phone.innerHTML = `${item.idade}`;
        document.querySelector(`#${contact.id}`).appendChild(phone);

        let options = document.createElement("td");
        options.id = `options${item.id}`;
        document.querySelector(`#${contact.id}`).appendChild(options);

        let editBtn = document.createElement("button");
        editBtn.id = `edit${item.id}`;
        editBtn.type = 'button';
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.setAttribute("data-bs-target", "#editContact");
        editBtn.addEventListener("click", () => { showContact(item.id) });
        editBtn.classList = "btn btn-outline-warning m-1";
        document.querySelector(`#${options.id}`).appendChild(editBtn);
        let editIcon = document.createElement("i");
        editIcon.classList = "bi bi-pencil-square";
        document.querySelector(`#edit${item.id}`).appendChild(editIcon);

        let deleteBtn = document.createElement("button");
        deleteBtn.id = `delete${item.id}`
        deleteBtn.type = 'button';
        deleteBtn.addEventListener("click", () => { deleteContact(item.id) });
        deleteBtn.classList = "btn btn-outline-danger m-1";
        document.querySelector(`#${options.id}`).appendChild(deleteBtn);
        let deleteIcon = document.createElement("i");
        deleteIcon.classList = "bi bi-trash";
        document.querySelector(`#delete${item.id}`).appendChild(deleteIcon);
    })
}

function favoriteContact(id) {
    if (favoriteList.includes(id)) {
        indexFavoriteId = favoriteList.indexOf(id);
        favoriteList.splice(indexFavoriteId, 1)
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    } else {
        favoriteList.push(id);
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    }
    location.reload();
}

function searchContact() {
    const filterName = nameFilter.value.toLowerCase();
    if (filterName != "") {
        contactFilter = contactList.filter(item => item.nome.toLowerCase() == filterName);
        localStorage.setItem('contactFilter', JSON.stringify(contactFilter));
    } else {
        contactFilter = localStorage.setItem('contactFilter', [0]);
    }
    location.reload();
}

async function deleteContact(id) {
    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa/' + id, {
        method: 'DELETE',
    });
    if (res.ok) {
        console.log("deletei")
    } else {
        console.log(res.statusText)
    }
    location.reload();
}