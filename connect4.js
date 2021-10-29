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
        while(winCounter !== 4){
            if(this.boardObj[row][square - winCounter] === this.currentPlayer){
                winCounter++;
            }
            else {
                break;
            }
        }
        if(winCounter === 4) {
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
            if(this.boardObj[row + winCounter] === undefined) {
                break;
            }
            if(this.boardObj[row + winCounter][square + winCounter] === this.currentPlayer) {
                winCounter++;
            }
            else {
                break;
            }
        }
        while(winCounter !== 4) {
            if(this.boardObj[row - winCounter] === undefined) {
                break;
            }
            if(this.boardObj[row - winCounter][square - winCounter] === this.currentPlayer) {
                winCounter++;
            }
            else {
                break;
            }
        }
        if(winCounter === 4) {
            return true;
        }
        else {
            winCounter = 1;
        }
        while(winCounter !== 4) {
            if(this.boardObj[row + winCounter] === undefined) {
                break;
            }
            if(this.boardObj[row + winCounter][square - winCounter] === this.currentPlayer) {
                winCounter++;
            }
            else {
                break;
            }
        }
        while(winCounter !== 4) {
            if(this.boardObj[row + winCounter] === undefined) {
                break;
            }
            if(this.boardObj[row - winCounter][square + winCounter] === this.currentPlayer) {
                winCounter++;
            }
            else {
                break;
            }
        }
        if(winCounter === 4) {
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
        document.getElementById("win").innerText = `${winner} has won the game`;
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
            console.log(this.model.boardObj);
            if(this.model.checkWin(event.target.id) === true || this.model.checkAlahson(event.target.id) === true) {
                this.view.shoWin(this.model.currentPlayer);
                return;
            }
            this.model.switchPlayer();
            this.view.switchPlayer();
        })
        document.getElementById("start").addEventListener("click", () => {
            document.getElementById("board").hidden = false;
            document.getElementById("restart").hidden = false;
        })
        document.getElementById("restart").addEventListener("click", () => {
            let tdArr = document.querySelectorAll('td');
            for(let i = 0; i < tdArr.length; i++) {
                tdArr[i].style.backgroundColor = null;
            }
            for(let row in this.model.boardObj) {
                for(let j = 0; j < this.model.boardObj[row].length; j++) {
                    this.model.boardObj[row][j] = 0;
                }
            }
            document.getElementById("win").innerText = "";
        })
    }
}
let app = new Controller(new Model, new View);
app.playTheGame();
