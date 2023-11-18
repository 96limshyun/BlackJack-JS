# BlackJack-JS
- 1단계: 간단 카드 게임 구현하기
---------------------

## 실행화면
(https://github.com/limsbong/BlackJack-JS/assets/126482821/22572082-5f74-4fa0-a0c7-c48c4f9c5196)

---------------------
## Content
1. 랜덤 숫자 불러오기
2. main함수로 게임 시작
3. 상황별로 출력하기
4. 게임 재시작 및 종료

---------------------
## 1. 랜덤 숫자 불러오기
- random.prototype를 사용해 1 ~ 11 까지 랜덤 숫자를 불러온다.
```
const getRandomNum = () => {
    const randomNumber = Math.floor(Math.random() * (12 - 1)) + 1;

    return randomNumber;
}
```

---------------------
## 2. main함수로 게임 시작
- alive boolean 값으로 게임 상태를 확인한다. false면 게임 진행, true면 게임 종료
- getRandomNum()로 각 플레이어에게 랜덤 숫자를 넣어주고 각 플레이어 배열에 지금까지 얻어온 숫자를 저장한다.
```
let youNumArray = [];
let dealerNumArray = [];

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
```

---------------------
## 3. 상황별로 출력하기
- printGame 함수에 플레이어의 숫자를 인수로 넘겨주어 상활별로 함수를 출력한다.
- 상활별로 win, lose, draws, round를 1씩 증가시켜 출력한다.
```
let win = 0;
let lose = 0;
let draws = 0;
let round = 0;

const printGame = (youNumber, dealerNumber) => {
    if (youNumber > dealerNumber) {
        printWin();
    } else if (dealerNumber > youNumber) {
        printLose();
    } else {
        printDraws();
    }
}
```

```
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
```

---------------------
## 4. 게임 재시작 및 종료
- alive 변수에 restartGame 함수를 넣어주고 input값을 인수로 넣어주어 Y면 false를 리턴해 게임을 계속 진행하고 N이면 true를 리턴해 while문을 빠져나와 printEndGame 함수를 실행해 게임을 종료시켰다. 
```
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
```