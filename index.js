const prompt = require('prompt-sync')();

const ROW = 3;
const COL = 3;

const SYMBOL_COUNT = {
    A : 5,
    B : 6,
    C : 2,
    D : 7,
    E : 4
}

const spin = () => {
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
    const reels = [[],[],[]]
    for(let i=0;i<COL;i++){
        const symbolsCopy = [...symbols];
        for(let j = 0;j<ROW;j++){
            let randomIndex = Math.floor(Math.random()*symbolsCopy.length);
            reels[i].push(symbolsCopy[randomIndex]);
            symbolsCopy.splice(randomIndex,1);
        }
    }
    return reels;
}

const getDepositAmount = () => {
    while(true){
        const amountInput = prompt("Enter an amount for deposit : ");

        if(isNaN(amountInput) || amountInput <= 0){
            console.log("Please enter a valid amount!");
        }else{
            return amountInput;
        }
    }
}

const getNumberOfLines = () => {
    while(true){
        const numberOfLines = prompt("Enter number of lines to bet (1-3) : ");

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Please enter valid number of lines!")
        }else{
            return numberOfLines;
        }
    }
}

const getBet = (balance,lines) => {
    while(true){
        const betAmount = prompt("Enter bet amount per line : ");
        if(isNaN(betAmount) || betAmount <= 0 || betAmount > balance/lines){
            console.log("Please enter a valid bet amount!");
        }else{
            return betAmount;
        }
    }
}

console.log(spin())

let balance = getDepositAmount();
const lines = getNumberOfLines();
const betAmount = getBet(balance,lines)
