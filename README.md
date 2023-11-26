# BlackJack-JS
- 2단계: 간단 블랙잭 게임 구현하기
---------------------

## 실행화면
https://github.com/limsbong/BlackJack-JS/assets/126482821/8f2eea35-ce85-481f-b969-dd76c0151184

---------------------
## Content
1. startGame
2. 배팅하기 및 게임 시작
3. main 함수
4. 카드 그만 받기 및 딜러와 카드 비교하기
5. restart
6. 게임 그만하기 및 reset
7. 치트키

---------------------
## 1. startGame 및 카드 섞기
- css에 display를 none으로 하는 값을 지정해두고 각 상황마다 id를 부여해 button, input, message를 보이고 없에주었다.
- start 버튼을 클릭하면 버튼이 사라지고 베팅 버튼과 input창, 현재 자신 메세지가 나타난다.
- 정렬되어 있는 카드 배열을 선언하고 sortedCardDeck 함수로 섞어 cardDeck변수에 넣어준다.
```
#display {
    display: none;
}
```
```
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
```
```
const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", showBettingInput);

const showBettingInput = () => {
    startBtnBox.id = 'display';
    inputBox.removeAttribute('id');
    cardDeck = getRandomCardDeck(sortedCardDeck);
    playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
}
```

---------------------
## 2. 배팅하기 및 게임 시작
- input창에 배팅할 금액을 입력하고 배팅하기 버튼을 누르면 startGame 함수가 실행된다.
- input에 넘겨준 값이 현재 자산보다 크거나, 100 보다 작거나, 숫자가 아니거나, 비어있거나, 100단위가 아니라면 경고창을 띄우고 true를 다시 배팅하게 만들었다.
- 아니라면 false를 반환해 게임이 진행된다.
- input 창이 사라지고 카드받기, 그만받기, 치트 버튼이 나타나고 main 함수가 실행된다.
```
const checkInputValue = () => {
    if (input.value > playerAsset || input.value < 100 || isNaN(input.value) || input.value % 100 !== 0 || input.value === "" ) {
        alert("100원 단위로 입력해주세요.");
        return true;
    } else {
        return false;
    }
}
```
```
const bettingBtn = document.querySelector(".betting-btn");
    bettingBtn.addEventListener("click", startGame);

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
```

---------------------
## 3. main 함수
```
const main = () => {
    getYouCard();
    renderResultGame();
    checkYouNumber();
}
```
- getYouCard함수로 섞었던 카드 배열에서 맨 앞 값을 빼오고 그 값을 youCardSum변수에 더해준다. 지금까지 뽑았던 카드 값을 화면에 보여주기 위해 뽑았던 카드를 배열 함수에 담아준다. 
```
const getYouCard = () => {
    const card = cardDeck.shift();
    youCardSum = youCardSum + card;
    youCardArray.push(card);
}
```
- 뽑은 카드를 실시간으로 보여준다.
```
const renderResultGame = () => {
    infoTextBox.innerHTML = `Game: ${round}`
    youCardsTextBox.innerHTML = `플레이어: [${youCardArray}]`
    sumTextBox.innerHTML = `총합: ${youCardSum}`;
    playerAssetTextBox.innerHTML = `현재 자산: ${playerAsset}`;
}
```
- 카드를 뽑다가 합이 21보다 크다면 현재 자산에서 배팅한 금액을 빼고 패배 메세지를 보여준다.
- 카드를 뽑다가 합이 21이 된다면 배팅한 금액의 2배를 현재 자산에 더해주고 승리 메세지를 보여준다.
```
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
```

---------------------
## 4. 카드 그만 받기 및 딜러와 카드 비교하기
- 유저가 카드를 뽑다 그만 받기를 누르는 순간부터 딜러가 카드를 받는다. 현재 카드 합이 17미만이라면 카드를 계속 받는다.
- 만약 딜러가 카드를 뽑다 합이 21이 넘어가면 유저가 이겼다는 메세지를 보여주는 함수를 실행하고 합이 21이되면 딜러가 이겼다는 메세지를 보여주는 함수를 실행한다. 아니라면 유저의 카드와 딜러의 카드를 비교하는 함수를 실행한다.
```
const stopBtn = document.querySelector(".stop-card-btn");
    stopBtn.addEventListener("click", getDealerCard);

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
```
- 유저의 카드 합과 딜러의 카드 합을 비교한다.
- 각 플레이어가 이겼을때 승리 메시지를 출력하는 함수를 실행한다.
```
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
```

----------------
## 5. restart
- 다시하기 버튼을 누르면 restartGame함수가 실행되어 현재 카드덱의 수가 11보다 작다면 52장을 랜덤카드를 다시 받고 게임을 시작한다. 아니라면 각 플레이어가 얻은 카드들을 초기화하고 배팅창부터 다시 시작한다.
```
const restartBtn = document.querySelector(".restart-btn");
    restartBtn.addEventListener("click", restartGame); 

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
```
- 다시하기를 눌렀는데 현재 자산이 없다면 자산이 없다는 메세지를 보여주고 reset 버튼을 보여주어 게임을 reset하게 만들었다.
```
const renderEmptyAssetMessage = () => {
    endGameBtnBox.id = 'display';
    inputBox.id = 'display';
    codeSquadBtnBox.id = 'display';
    resetBtnBox.removeAttribute('id');
    infoTextBox.innerHTML = "자산이 없습니다.";
    youCardsTextBox.innerHTML = "";
    sumTextBox.innerHTML = "";
}
```

------------
## 6. 게임 그만하기 및 reset
- stop게임을 누르면 지금까지의 승패 수를 알려주고 reset게임 버튼이 나타난다.
- reset은 페이지를 새로고침해 처음부터 시작하게 만들었다.
```
const stopGameBtn = document.querySelector(".stop-game-btn");
    stopGameBtn.addEventListener("click", stopGame);

    const resetGameBtn = document.querySelector(".reset-box");
    resetGameBtn.addEventListener("click", resetGame);
```
```
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
```
------------
## 7. 치트키

```
const codeSquadBtn = document.querySelector(".code-squad");
codeSquadBtn.addEventListener("click", showDeck);

const showDeck = () => {
    const arrSixCard = [];
    for (let i = 0; i < 6; i++) {
        const card = cardDeck[i];
        arrSixCard.push(card);
    }
    alert(arrSixCard);
    codeSquadBtnBox.id = 'display';
}
```