// TASK 1 - PRINT NUMBERS

for (let number = 1; number <= 10; number++) {
    console.log(number);
}


// TASK 2 - EVEN NUMBERS

for (let number = 2; number <= 20; number = number + 2) {
    if (number % 2 === 0) {
        console.log(number);
    }
}


// TASK 3 - MULTIPLICATION TABLE

let num = 5;

for (let count = 1; count <= 10; count++) {
    let result = num * count;
    console.log(num + " x " + count + " = " + result);
}


// TASK 4 - STAR PATTERN

for (let line = 1; line <= 5; line++) {
    let output = "";

    for (let star = 1; star <= line; star++) {
        output = output + "* ";
    }

    console.log(output);
}


// TASK 5 - NUMBER PATTERN

for (let line = 1; line <= 5; line++) {
    let output = "";

    for (let number = 1; number <= line; number++) {
        output = output + number + " ";
    }

    console.log(output);
}

