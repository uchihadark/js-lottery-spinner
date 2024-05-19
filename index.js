

const prompt = require('prompt-sync')();

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


let balance = getDepositAmount();
const lines = getNumberOfLines();
const betAmount = getBet(balance,lines)
