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
    const reels = []
    for(let i=0;i<COL;i++){
        reels.push([])
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
            return betAmount*lines;
        }
    }
}

const transpose = (reels) => {
    const transposedReel = [];
    for(let i = 0;i<ROW;i++){
        transposedReel.push([]);
        for(let j = 0;j<COL;j++){
            transposedReel[i].push(reels[j][i]);
        }
    }
    return transposedReel;
}

const printReels = (transposedReel) => {
    for(const reel of transposedReel){
        let rowString = "";
        for(const[i,symbol] of reel.entries()){
            rowString += symbol;
            if(i != reel.length-1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (reel,lines,money) => {
    let winningsCount = 0;
    for(let i=0;i<lines;i++){
        const symbols = reel[i];
        let allSame = 1;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = 0;
                break;
            }
        }
        if(allSame){
            winningsCount += 1;
        }
    }
    return winningsCount*money;

}

const game = () => {
    let balance = getDepositAmount();
    while(true){
        console.log("Current Balance : $", balance);
        const lines = getNumberOfLines();
        const betAmount = getBet(balance,lines);
        balance -= betAmount;
        const reels = spin();
        const transposedReel = transpose(reels);
        printReels(transposedReel);
        const winAmount = getWinnings(transposedReel,lines,betAmount);
        console.log("You have won $", winAmount);

        balance += winAmount;

        if(balance <= 0){
            console.log("You ran out of money!!");
            break;
        }

        const input = prompt("Enter 1 if you want to continue playing else press 0 to quit : ");
        if(isNaN(input) || input > 1 || input < 0){
            console.log("Please enter a valid number!");
        }else{
            if(input == 0)break;
        }
    }
}

game();



