const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//Creates a local storage in JSON format
const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
)


//Creates a local storage array
let transactions = 
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


function addTransaction(event){
    event.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text or an amount.');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

//Generate randomID for each transaction.
function generateID(){
    return Math.floor(Math.random() * 10000000);
}

function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? '-' : '+' ;
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onClick="removeTransaction(
        ${transaction.id}
    )">x</button>
    `
    list.appendChild(item);
}


function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);