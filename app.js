console.log("Hello Bhopal!");

const calc = () => {
    return 4*8;
}

let aNumber = calc();


const printCalc = (callback) => {
    console.log(callback());
}

printCalc(calc);

