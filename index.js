const infoTextBox = document.querySelector(".info");
const youCardsTextBox = document.querySelector(".you-cards");
const sumTextBox = document.querySelector(".sum");
const playerAssetTextBox = document.querySelector(".player-asset");
const input = document.querySelector("#input");
const getAndStopCardBox = document.querySelector(".get-card-box");
const endGameBtnBox = document.querySelector(".end-box");
const inputBox = document.querySelector(".input-box");
const codeSquadBtnBox = document.querySelector(".code-squad");
const resetBtnBox = document.querySelector(".reset-box");
const startBtnBox =  document.querySelector("#start-btn");

let playerAsset = 1000;
let youCardArray = [];
let dealerCardArray = [];
let youCardSum = 0;
let dealerCardSum = 0;
let win = 0;
let lose = 0;
let draws = 0;
let round = 0;
let cardDeck = [];
const sortedCardDeck = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11];

const getRandomCardDeck = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const compareNumber = () => {
    if (youCardSum > dealerCardSum || dealerCardSum > 21) {
        renderYouWin();
    } else if (youCardSum < dealerCardSum) {
        renderDealerWin();
    } else {
        renderDraws();
    }
}

const renderYouWin = () => {
    playerAsset = playerAsset + Number(input.value)
    win++;
    getAndStopCardBox.id = 'display';
    endGameBtnBox.removeAttribute('id');
    infoTextBox.innerHTML = `승리하였습니다!`;
    youCardsTextBox.innerHTML = `플레이어: [${youCardSum}] <br> 딜러: [${dealerCardSum}]`;
    sumTextBox.innerHTML = "";
    playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
}

const renderDealerWin = () => {
    playerAsset = playerAsset - Number(input.value)
    lose++;
    getAndStopCardBox.id = 'display';
    endGameBtnBox.removeAttribute('id');
    infoTextBox.innerHTML = `패배하였습니다. 한 게임 더 하시겠습니까?`;
    youCardsTextBox.innerHTML = `플레이어: [${youCardSum}] <br> 딜러: [${dealerCardSum}]`;
    sumTextBox.innerHTML = "";
    playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
}

const renderDraws = () => {
    draws++;
    getAndStopCardBox.id = 'display';
    endGameBtnBox.removeAttribute('id');
    infoTextBox.innerHTML = `비겼습니다!`;
    youCardsTextBox.innerHTML = `플레이어: [${youCardArray}] <br> 딜러: [${dealerCardSum}]`;
    sumTextBox.innerHTML = `총합: ${youCardSum}`;
    playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
}

const main = () => {
    getYouCard();
    renderResultGame();
    checkYouNumber();
}

const getYouCard = () => {
    const card = cardDeck.shift();
    youCardSum = youCardSum + card;
    youCardArray.push(card);
}

const renderResultGame = () => {
    infoTextBox.innerHTML = `Game: ${round}`
    youCardsTextBox.innerHTML = `플레이어: [${youCardArray}]`
    sumTextBox.innerHTML = `총합: ${youCardSum}`;
    playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
}

const checkYouNumber = () => {
    if (youCardSum > 21) {
        playerAsset = playerAsset - Number(input.value);
        lose++;
        getAndStopCardBox.id = 'display';
        endGameBtnBox.removeAttribute('id');
        infoTextBox.innerHTML = `패배하였습니다. 한 게임 더 하시겠습니까?`;
        youCardsTextBox.innerHTML = `플레이어: [${youCardArray}]`;
        sumTextBox.innerHTML = `총합: ${youCardSum}`;
        playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
    } else if (youCardSum === 21) {
        playerAsset = playerAsset + (input.value * 2);
        win++;
        getAndStopCardBox.id = 'display';
        endGameBtnBox.removeAttribute('id');
        infoTextBox.innerHTML = `승리하였습니다!`;
        youCardsTextBox.innerHTML = `플레이어: [${youCardArray}]`;
        sumTextBox.innerHTML = `총합: ${youCardSum}`;
        playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
    }
}

const getDealerCard = () => {
    dealerCardSum = 0;
    dealerCardArray = [];
    while (dealerCardSum < 17) {
        const card = cardDeck.shift();
        dealerCardSum = dealerCardSum + card;
        dealerCardArray.push(card);
    }

    if (dealerCardSum > 21) {
        renderYouWin();
    } else if (dealerCardSum === 21) {
        renderDealerWin()
    } else {
        compareNumber()
    }
}

const checkInputValue = () => {
    if (input.value > playerAsset || input.value < 100 || isNaN(input.value) || input.value % 100 !== 0 || input.value === "" ) {
        alert("100원 단위로 입력해주세요.");
        return true;
    } else {
        return false;
    }
}

const startGame = () => {
    let alive = checkInputValue()
    if (!alive) {
        round++;
        inputBox.id = 'display';
        getAndStopCardBox.removeAttribute('id');
        codeSquadBtnBox.removeAttribute('id');
        main();
    } else {
        showBettingInput()
    }
}

const renderEmptyAssetMessage = () => {
    endGameBtnBox.id = 'display';
    inputBox.id = 'display';
    codeSquadBtnBox.id = 'display';
    resetBtnBox.removeAttribute('id');
    infoTextBox.innerHTML = "자산이 없습니다.";
    youCardsTextBox.innerHTML = "";
    sumTextBox.innerHTML = "";
}

const showBettingInput = () => {
    startBtnBox.id = 'display';
    inputBox.removeAttribute('id');
    cardDeck = getRandomCardDeck(sortedCardDeck);
    playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
}

const restartGame = () => {
    if (cardDeck.length < 11) {
        cardDeck = getRandomCardDeck(sortedCardDeck);
    } else if (playerAsset === 0) {
        renderEmptyAssetMessage()
    } else {
        endGameBtnBox.id = 'display';
        inputBox.removeAttribute('id');
        infoTextBox.innerHTML = "배팅할 금액을 입력해주세요"
        youCardsTextBox.innerHTML = ""
        sumTextBox.innerHTML = ""
        input.value = null;
        youCardArray = [];
        youCardSum = 0;
        playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
    }
}

const stopGame = () => {
    youCardsTextBox.innerHTML = ""
    sumTextBox.innerHTML = ""
    infoTextBox.innerHTML = `${win}승 ${draws}무 ${lose}패로 ${playerAsset}원의 자산이 남았습니다. <br> 플레이 해주셔서 감사합니다.`
    endGameBtnBox.id = 'display';
    resetBtnBox.removeAttribute('id');
    codeSquadBtnBox.id = 'display';
}

const resetGame = () => {
    location.reload();
}

const showDeck = () => {
    const arrSixCard = [];
    for (let i = 0; i < 6; i++) {
        const card = cardDeck[i];
        arrSixCard.push(card);
    }
    alert(arrSixCard);
    codeSquadBtnBox.id = 'display';
}

const gatherEventHandler = () => {
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

    const resetGameBtn = document.querySelector(".reset-box");
    resetGameBtn.addEventListener("click", resetGame);

    const codeSquadBtn = document.querySelector(".code-squad");
    codeSquadBtn.addEventListener("click", showDeck);
}

gatherEventHandler()