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
        let moveArr = tdId.split("-");
        let row = Number(moveArr[0]);
        let square = Number(moveArr[1]); 
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
        document.getElementById("win").innerText = `player ${player} won`;
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
            this.model.switchPlayer();
            this.view.switchPlayer();
        })
    }
}
let app = new Controller(new Model, new View);
app.playTheGame();
//let model = new Model;
//model.playMove("6-0")
//console.log(model.boardObj);
