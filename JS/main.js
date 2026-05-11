const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("transaction-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {

  list.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction, index) => {

    const li = document.createElement("li");

    li.classList.add(
      transaction.type === "income" ? "plus" : "minus"
    );

    li.innerHTML = `
      ${transaction.text} - ₹${transaction.amount}

      <button class="delete-btn" onclick="deleteTransaction(${index})">
        X
      </button>
    `;

    list.appendChild(li);

    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  const totalBalance = totalIncome - totalExpense;

  balance.innerText = `₹${totalBalance}`;
  income.innerText = `₹${totalIncome}`;
  expense.innerText = `₹${totalExpense}`;

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

form.addEventListener("submit", function(e) {

  e.preventDefault();

  const transaction = {
    text: text.value,
    amount: +amount.value,
    type: type.value
  };

  transactions.push(transaction);

  text.value = "";
  amount.value = "";

  updateUI();
});

function deleteTransaction(index) {

  transactions.splice(index, 1);

  updateUI();
}

updateUI();