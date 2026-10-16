
import { useState } from "react";

const App = () => {
  const [type, setType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(5000);
  const [rejected, setRejected] = useState([]);
  const [processed, setProcessed] = useState(false);

  const addTransaction = () => {
    if (amount === "" || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: type,
      amount: Number(amount)
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setProcessed(false);
  };

  const processTransactions = () => {
    let currentBalance = 5000;
    let rejectedList = [];
    let resultList = [];

    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      let status = "Accepted";

      if (transaction.type === "credit") {
        currentBalance += transaction.amount;
      } else if (transaction.amount <= currentBalance) {
        currentBalance -= transaction.amount;
      } else {
        status = "Rejected";
        rejectedList.push(transaction);
      }

      resultList.push({
        ...transaction,
        status: status,
        balance: currentBalance
      });
    }

    setTransactions(resultList);
    setBalance(currentBalance);
    setRejected(rejectedList);
    setProcessed(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Bank Transaction Validation
      </h1>

      <h2 className="mb-4 text-xl font-semibold">
        Available Balance: ₹{balance}
      </h2>

      <div className="mb-6 flex flex-wrap gap-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded border bg-white p-3"
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded border bg-white p-3"
        />

        <button
          onClick={addTransaction}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Transaction
        </button>
      </div>

      <button
        onClick={processTransactions}
        className="mb-6 rounded bg-green-600 px-4 py-2 text-white"
      >
        Validate Transactions
      </button>

      <h2 className="mb-3 text-xl font-bold">Transactions</h2>

      {transactions.map((item) => (
        <div key={item.id} className="mb-3 rounded bg-white p-4 shadow">
          <p>Type: {item.type}</p>
          <p>Amount: ₹{item.amount}</p>

          {processed && (
            <>
              <p>Running Balance: ₹{item.balance}</p>
              <p className={item.status === "Rejected" ? "text-red-600" : "text-green-600"}>
                Status: {item.status}
              </p>
            </>
          )}
        </div>
      ))}

      {processed && (
        <>
          <h2 className="mt-6 text-xl font-bold">
            Final Balance: ₹{balance}
          </h2>

          <h2 className="mt-4 text-xl font-bold text-red-600">
            Rejected Transactions
          </h2>

          {rejected.length === 0 ? (
            <p>No rejected transactions.</p>
          ) : (
            rejected.map((item) => (
              <p key={item.id} className="mt-2 text-red-600">
                Debit ₹{item.amount} — Insufficient balance
              </p>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default App;
