let addInput = document.querySelector('.todo-input'); //input
let addButton = document.querySelector('.add-todo-btn'); // plus
let todoList = document.querySelector('.todoList'); // list
let countTodo = document.querySelector('.count-todo'); //sonidan
let deleteAllBtn = document.querySelector('.clear-todo-btn'); // hammasini ociradon btn


// 'Onkeyup event'Klaviyaturada yazganimzda Input icina yazamiz
addInput.addEventListener('keyup', () => {
    if (addInput == '') return

    let userData = addInput.value; //input icina yazganimzni olamiz

    if (userData.trim() != 0) { // agar yazganimiz quri probel bomasa
        addButton.classList.add("active"); // addBtn ni yaqamiz
    } else {
        addButton.classList.remove("active"); // addBtn ocik duradi
    }

});
showToDo(); // spiskamizni gorsatadon funksiyani caqir


//Plus Btn basganda qoshish
addButton.addEventListener('click', () => { // plus knopkani basganda
    let userData = addInput.value; //inputdagi qiymatni olamiz
    let getLocalStorage = localStorage.getItem("New Todo"); //get localstorage
    if (getLocalStorage == null) { // agar icida pustoy bolsa
        listTodo = []; //array yaratamiz
    } else {
        listTodo = JSON.parse(getLocalStorage); // json stringni obyekta aylantirish
    }
    listTodo.push(userData); // arraya qiymatni qoshish
    localStorage.setItem("New Todo", JSON.stringify(listTodo)); //localStorage ga qoshish
    showToDo(); // spiskamizni gorsatadon funksiyani caqir
    addInput.value = ''; // inputni tozalash

    addButton.classList.remove("active"); // activeni ocirish

});
// ekrana chiqaradon funksiya
function showToDo() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listTodo = [];
    } else {
        listTodo = JSON.parse(getLocalStorage);
    }
    if (listTodo.length > 0) {
        deleteAllBtn.classList.add('active');
    } else {
        addInput.value = '';
        deleteAllBtn.classList.remove('active');
    }
    let todoLI = '';
    listTodo.forEach((element, index) => {
        todoLI += `<li><span>${element} </span>
        <button id="removeToDoBtn" onclick='deleteTodo(${index})' class="remove-todo-btn">-</button></li>`;
    });
    todoList.innerHTML = todoLI;
    countTodo.innerText = listTodo.length;
}

// minus basganda ociradon funkisya 
function deleteTodo(i) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listTodo = JSON.parse(getLocalStorage);
    listTodo.splice(i, 1);
    localStorage.setItem("New Todo", JSON.stringify(listTodo));
    showToDo();
}
// clearni basganda hammasini ociradon funksiyam
deleteAllBtn.addEventListener('click', () => {
    listTodo = [];
    localStorage.setItem("New Todo", JSON.stringify(listTodo));
    showToDo();
});