class Model {
    constructor(){
        this.currentPlayer = 1,
        this.boardObj = {
            0: [0, 0, 0, 0, 0, 0, 0],
            1: [0, 0, 0, 0, 0, 0, 0],
            2: [0, 0, 0, 0, 0, 0, 0],
            3: [0, 0, 0, 0, 0, 0, 0],
            4: [0, 0, 0, 0, 0, 0, 0],
            5: [0, 0, 0, 0, 0, 0, 0],
            6: [0, 0, 0, 0, 0, 0, 0]
        }
    }
    playMove(tdId) {
        let moveArr = tdId.split("-");
        let row = Number(moveArr[0]);
        let square = Number(moveArr[1]);
        if(this.boardObj[row][square] === 0 && (row === 6 || this.boardObj[row + 1][square] !== 0)){
            this.boardObj[row][square] = this.currentPlayer;
            return true;
        }
        else {
            return false;
        }
    }
    checkWin(id) {
        let moveArr = id.split("-");
        let row = Number(moveArr[0]);
        let square = Number(moveArr[1]);
        let winCounter = 1;
        if(row < 4 && this.boardObj[row][square] === this.boardObj[row + 1][square] && this.boardObj[row][square] === this.boardObj[row + 2][square] && this.boardObj[row][square] === this.boardObj[row + 3][square]){
            return true;
        }
        while(winCounter !== 4){
            if(this.boardObj[row][square + winCounter] === this.currentPlayer){
                winCounter++;
            }
            else {
                break;
            }
        }
        let big = winCounter;
        winCounter = 1;
        while(winCounter !== 4){
            if(this.boardObj[row][square - winCounter] === this.currentPlayer){
                winCounter++;
            }
            else {
                break;
            }
        }
        big += winCounter
        if(big >= 5) {
            return true;
        }
        else {
            winCounter = 1;
        }
        return false;
    }

    checkAlahson(id) {
        let moveArr = id.split("-");
        let row = Number(moveArr[0]);
        let square = Number(moveArr[1]);
        let winCounter = 1;
        while(winCounter !== 4) {
            if(this.boardObj[row + winCounter] === undefined || this.boardObj[row - winCounter] === undefined) {
                break;
            }
            if(this.boardObj[row + winCounter][square + winCounter] === this.currentPlayer) {
                winCounter++;
            }
            else {
                break;
            }
        }
        let bigWin = winCounter;
        winCounter = 1;
        while(winCounter !== 4) {
            if(this.boardObj[row - winCounter] === undefined || this.boardObj[row - winCounter] === undefined) {
                break;
            }
            if(this.boardObj[row - winCounter][square - winCounter] === this.currentPlayer) {
                winCounter++;
            }
            else {
                break;
            }
        }
        bigWin += winCounter
        if(bigWin >= 5) {
            return true;
        }
        else {
            winCounter = 1;
            bigWin = 0;
        }
        while(winCounter !== 4) {
            if(this.boardObj[row + winCounter] === undefined || this.boardObj[row - winCounter] === undefined) {
                break;
            }
            if(this.boardObj[row + winCounter][square - winCounter] === this.currentPlayer) {
                winCounter++;
            }
            else {
                break;
            }
        }
        bigWin = winCounter;
        winCounter = 1;
        while(winCounter !== 4) {
            if(this.boardObj[row + winCounter] === undefined || this.boardObj[row - winCounter] === undefined) {
                break;
            }
            if(this.boardObj[row - winCounter][square + winCounter] === this.currentPlayer) {
                winCounter++;
            }
            else {
                break;
            }
        }
        bigWin += winCounter;
        if(bigWin >= 5) {
            return true;
        }
        else {
            winCounter = 1;
        }
        return false;
    }
    switchPlayer() {
        if(this.currentPlayer === 1){
            this.currentPlayer = 2;
        }
        else {
            this.currentPlayer = 1;
        }
    }

}
class View {
    constructor() {
        this.playingColor = "yellow";
    }
    playMove(id) {
        document.getElementById(id).style.backgroundColor = this.playingColor;
        let moveArr = id.split("-");
        let row = Number(moveArr[0]);
        let square = Number(moveArr[1]);
        if(row === 0) return;
        document.getElementById(`${row-1}-${square}`).style.backgroundColor = "white";
    }
    switchPlayer(){
       if(this.playingColor === "yellow") {
           this.playingColor = "blue";
       }
       else {
           this.playingColor = "yellow";
       }
    }
    shoWin(player) {
        let winner = document.getElementById(`player${player}`).value;
        document.getElementById("win").innerHTML = `<img src="https://cliply.co/wp-content/uploads/2021/09/CLIPLY_372109170_FREE_FIREWORKS_400.gif"><br>${winner} has won the game`;
        let squareArr = document.querySelectorAll("td");
        for(let i = 0; i<squareArr.length; i++) {
           squareArr[i].style.backgroundColor = this.playingColor;
        }
    }
}
class Controller {
    constructor(model, view) {
        this.model = model,
        this.view = view;
    }
    playTheGame() {
        document.getElementById("board").addEventListener("click", (event) => {
            if(event.target.tagName !== 'TD') return;
            if(this.model.playMove(event.target.id) === false) return;
            this.view.playMove(event.target.id);
            if(this.model.checkWin(event.target.id) === true || this.model.checkAlahson(event.target.id) === true) {
                this.view.shoWin(this.model.currentPlayer);
                return;
            }
            this.model.switchPlayer();
            this.view.switchPlayer();
        })
        document.getElementById("start").addEventListener("click", () => {
            if(document.getElementById("player1").value === "" || document.getElementById("player2").value === "") return;
            document.getElementById("board").hidden = false;
            document.getElementById("restart").hidden = false;
        })
        document.getElementById("restart").addEventListener("click", () => {
            let tdArr = document.querySelectorAll('td');
            for(let i = 0; i < tdArr.length; i++) {
                if(tdArr[i].id.split("-")[0] === "6"){
                    tdArr[i].style.backgroundColor = "white";
                }
                else {
                    tdArr[i].style.backgroundColor = "lightgray";
                }
            }
            for(let row in this.model.boardObj) {
                for(let j = 0; j < this.model.boardObj[row].length; j++) {
                    this.model.boardObj[row][j] = 0;
                }
            }
            document.getElementById("win").innerHTML = "";
        })
    }
}
let app = new Controller(new Model, new View);
app.playTheGame();
