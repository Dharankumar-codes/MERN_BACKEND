// TASK 1 – PRIVATE SALARY

function createEmployee() {
    let salary = 20000;

    let updateSalary = (amount) => {
        salary = salary + amount;
        return salary;
    };

    return updateSalary;
}

let updateSalary = createEmployee();

console.log(updateSalary(5000));
console.log(updateSalary(3000));
console.log(updateSalary(2000));


// TASK 2 – PRODUCT STOCK

function createStock() {
    let stock = 10;

    let addStock = (quantity) => {
        stock = stock + quantity;
        console.log("Stock:", stock);
    };

    let sellProduct = (quantity) => {
        if (quantity <= stock) {
            stock = stock - quantity;
            console.log("Stock:", stock);
        } else {
            console.log("Not enough stock");
        }
    };

    return {
        addStock: addStock,
        sellProduct: sellProduct
    };
}

let product = createStock();

product.addStock(5);
product.sellProduct(3);
product.sellProduct(2);
product.sellProduct(20);

