const messageBox = document.querySelector("#message");
const playerAssetMessageBox = document.querySelector("#player-asset");
const youCards = document.querySelector("#you-cards");
const sumBox = document.querySelector("#sum");
let input = document.querySelector("#input");

let playerAsset = 1000;
let alive = false;
let youCardArray = [];
let dealerCardArray = [];
let youCardSum = 0;
let dealerCardSum = 0;
let win = 0;
let lose = 0;
let draws = 0;
let round = 0;
let cardDeck = [];

const getCardDeck = () => {
    let max = 51;
    let sortedCardDeck = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11];
        for (let i = 0; i < 52; i++) {
            const randomNumber = Math.floor(Math.random() * (max));
            const randomCard = sortedCardDeck.splice(randomNumber, 1);
            max--;
            cardDeck.push(randomCard[0])
        }
}

const getYouCard = () => {
    const card = cardDeck.shift();
    youCardSum = youCardSum + card;
    youCardArray.push(card);
}

const printGame = () => {
    messageBox.textContent = `Game: ${round}`
    youCards.textContent = `플레이어: [${youCardArray}]`
    sumBox.textContent = `총합: ${youCardSum}`;
    playerAssetMessageBox.textContent = `현재 자산: ${playerAsset}`;
}

const isAlive = () => {
    if (youCardSum > 21 || youCardSum === 21) {
        endGamePrint()
    }
}

const compareNumber = () => {
    if (youCardSum < dealerCardSum) {
        lose++;
        document.querySelector(".get-card-box").id = 'display';
        document.querySelector(".end-box").removeAttribute('id');
        messageBox.innerHTML = `패배하였습니다. 한 게임 더 하시겠습니까? <br> 현재 자산 : ${playerAsset}`;
        youCards.innerHTML = `플레이어: [${youCardSum}] <br> 딜러: [${dealerCardSum}]`;
        sumBox.textContent = "";
    } else if (youCardSum > dealerCardSum) {
        playerAsset = playerAsset + input
        win++;
        document.querySelector(".get-card-box").id = 'display';
        document.querySelector(".end-box").removeAttribute('id');
        messageBox.innerHTML = `승리하였습니다! <br> 현재 자산 : ${playerAsset}`;
        youCards.innerHTML = `플레이어: [${youCardSum}] <br> 딜러: [${dealerCardSum}]`;
        sumBox.textContent = "";
    }
}

const main = () => {
    getYouCard();
    printGame();
    isAlive();
}

const endGamePrint = () => {
    if (youCardSum > 21) {
        lose++;
        document.querySelector(".get-card-box").id = 'display';
        document.querySelector(".end-box").removeAttribute('id');
        messageBox.innerHTML = `패배하였습니다. 한 게임 더 하시겠습니까? <br> 현재 자산 : ${playerAsset}`;
        youCards.textContent = `플레이어: [${youCardArray}]`;
        sumBox.textContent = `총합: ${youCardSum}`;
    } else if (youCardSum === 21) {
        playerAsset = playerAsset + (input * 2);
        win++;
        document.querySelector(".get-card-box").id = 'display';
        document.querySelector(".end-box").removeAttribute('id');
        messageBox.innerHTML = `승리하였습니다! <br> 현재 자산 : ${playerAsset}`;
        youCards.textContent = `플레이어: [${youCardArray}]`;
        sumBox.textContent = `총합: ${youCardSum}`;
    }
}

const startGame = () => {
    if (playerAsset === 0) {
        emptyAssetPrint()
    } else {
        document.querySelector(".input-box").id = 'display';
        document.querySelector(".get-card-box").removeAttribute('id');
        playerAsset = playerAsset - input.value;
        main();
    }
}

const showBettingInput = () => {
    getCardDeck();
    round++;
    playerAssetMessageBox.textContent = `현재 자산: ${playerAsset}`;
    document.querySelector("#start-btn").id = 'display';
    document.querySelector(".input-box").removeAttribute('id');

}

const restartGame = () => {
    if (cardDeck.length < 11) {
        getCardDeck()
    }
    messageBox.innerHTML = "배팅할 금액을 입력해주세요"
    youCards.innerHTML = ""
    sumBox.innerHTML = ""
    document.querySelector(".end-box").id = 'display';
    document.querySelector(".input-box").removeAttribute('id');
    input.value = null;
    round++
    youCardArray = [];
    youCardSum = 0;
}

const stopGame = () => {
    round = 0;
    youCards.innerHTML = ""
    sumBox.innerHTML = ""
    messageBox.innerHTML = `${win}승 ${draws}무 ${lose}패로 ${playerAsset}원의 자산이 남았습니다. <br> 플레이 해주셔서 감사합니다.`
    document.querySelector(".end-box").id = 'display';
    document.querySelector(".reset-game").removeAttribute('id');
}

const getDealerCard = () => {
    while (dealerCardSum < 17) {
        const card = cardDeck.shift();
        dealerCardSum = dealerCardSum + card;
        dealerCardArray.push(card);
        console.log(dealerCardSum);
    }
    console.log(cardDeck)
    compareNumber()
}

const emptyAssetPrint = () => {
    messageBox.innerHTML = "자산이 없습니다.";
    youCards.innerHTML = "";
    sumBox.innerHTML = "";
    document.querySelector(".input-box").id = 'display';
    document.querySelector(".reset-game").removeAttribute('id');
}

const resetGame = () => {
    location.reload();
}

const EventHandler = () => {
    const startBtn = document.querySelector("#start-btn");
    startBtn.addEventListener("click", showBettingInput);

    const bettingBtn = document.querySelector(".betting-btn");
    bettingBtn.addEventListener("click", startGame);

    const getCardBtn = document.querySelector(".get-card-btn");
    getCardBtn.addEventListener("click", main);

    const stopBtn = document.querySelector(".stop-card-btn");
    stopBtn.addEventListener("click", getDealerCard);

    const restartBtn = document.querySelector(".restart-btn");
    restartBtn.addEventListener("click", restartGame);

    const stopGameBtn = document.querySelector(".stop-game-btn");
    stopGameBtn.addEventListener("click", stopGame);

    const resetGameBtn = document.querySelector(".reset-game");
    resetGameBtn.addEventListener("click", resetGame);


}

EventHandler()