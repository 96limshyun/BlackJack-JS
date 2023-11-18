let youNumArray = [];
let dealerNumArray = [];
let win = 0;
let lose = 0;
let draws = 0;
let round = 0;

const getRandomNum = () => {
    const randomNumber = Math.floor(Math.random() * (12 - 1)) + 1;

    return randomNumber;
}

const printGame = (youNumber, dealerNumber) => {
    if (youNumber > dealerNumber) {
        printWin();
    } else if (dealerNumber > youNumber) {
        printLose();
    } else {
        printDraws();
    }
}

const printWin = () => {
    win++
    console.log("간단 카드 게임을 시작합니다.");
    console.log(`round ${round}`);
    console.log(`You: ${youNumArray}`);
    console.log(`Dealer ${dealerNumArray}`);
    console.log("당신이 이겼습니다.");
    console.log(`현재 적적: ${win}승 ${lose}패 ${draws}무`);
}

const printLose = () => {
    lose++
    console.log("간단 카드 게임을 시작합니다.");
    console.log(`round ${round}`);
    console.log(`You: ${youNumArray}`);
    console.log(`Dealer ${dealerNumArray}`);
    console.log("딜러가 이겼습니다.");
    console.log(`현재 적적: ${win}승 ${lose}패 ${draws}무`);
}

const printDraws = () => {
    draws++
    console.log("간단 카드 게임을 시작합니다.");
    console.log(`round ${round}`);
    console.log(`You: ${youNumArray}`);
    console.log(`Dealer ${dealerNumArray}`);
    console.log("비겼습니다.");
    console.log(`현재 적적: ${win}승 ${lose}패 ${draws}무`);
}

const restartGame = (input) => {
    if (input === "y" || input === "Y") {
        return false;   
    } else if (input === "n" || input === "N") {
        return true;
    } else {
        alert("y 또는 n을 입력해주세요.")
        const input = prompt("한 게임 더 하시겠습니까? (Y / N)");
        restartGame(input);
    }
}

const printEndGame = () => {
    console.log("게임을 종료합니다.");
    console.log("플레이해주셔서 감사합니다.");
}

const main = () => {
    let alive = false;
    while (!alive) {
        const youNumber = getRandomNum();
        const dealerNumber = getRandomNum();
        youNumArray.push(youNumber);
        dealerNumArray.push(dealerNumber);

        printGame(youNumber, dealerNumber);

        const input = prompt("한 게임 더 하시겠습니까? (Y / N)");


        alive = restartGame(input);
    }
    printEndGame();
}

main();