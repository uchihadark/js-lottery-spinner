

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


getDepositAmount();