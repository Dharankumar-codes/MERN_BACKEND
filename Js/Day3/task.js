// TASK 1 – PRIVATE BANK BALANCE

function createBankAccount() {
    let balance = 5000;

    function checkBalance() {
        console.log("Account Balance:", balance);
    }

    return checkBalance;
}

let balance = 100000;

let bankAccount = createBankAccount();

console.log("Outside Balance:", balance);
bankAccount();


// TASK 2 – DEPOSIT USING CLOSURE

function createAccount() {
    let balance = 1000;

    function deposit(amount) {
        balance = balance + amount;
    }

    function getBalance() {
        console.log(balance);
    }

    return {
        deposit: deposit,
        getBalance: getBalance
    };
}

let account = createAccount();

account.deposit(500);
account.deposit(200);
account.getBalance();


// TASK 3 – PRIVATE COUNTER

function createCounter() {
    let count = 0;

    function increment() {
        count = count + 1;
    }

    function decrement() {
        count = count - 1;
    }

    function getCount() {
        console.log(count);
    }

    return {
        increment: increment,
        decrement: decrement,
        getCount: getCount
    };
}

let count = 100;

let counter = createCounter();

counter.increment();
counter.increment();
counter.increment();
counter.decrement();

counter.getCount();

console.log("Outside Count:", count);


// TASK 4 – EMPLOYEE SALARY PRIVACY

function createEmployee(name, initialSalary) {
    let salary = initialSalary;

    function getName() {
        return name;
    }

    function getSalary() {
        return salary;
    }

    function increaseSalary(amount) {
        if (amount > 0) {
            salary = salary + amount;
        }
    }

    return {
        getName: getName,
        getSalary: getSalary,
        increaseSalary: increaseSalary
    };
}

let employee = createEmployee("Arun", 25000);

employee.increaseSalary(5000);

console.log(employee.getName());
console.log(employee.getSalary());

let salary = 100000;

console.log("Outside Salary:", salary);
console.log("Employee Salary:", employee.getSalary());

