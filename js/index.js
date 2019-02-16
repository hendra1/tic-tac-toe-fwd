$(document).ready(function() {
    var movesX, movesO;
    var x = "x"
    var o = "o"
    var o_win = 0;
    var x_win = 0;
    var matrixCombination = [
      [1,2,3],[1,5,9],[1,4,7],
      [2,5,8],[3,5,7],[3,6,9],
      [4,5,6],[7,8,9]
    ];
    reset()
    function clicked(x) {
          if (document.getElementById("game").children[x - 1].textContent === "X" || document.getElementById("game").children[x - 1].textContent === "O") {
              return;
          }
          var box = document.getElementById("game").children[x - 1];
          box.classList.add('disable')
          if ((movesX.length + movesO.length) % 2 === 0) {
              box.textContent = "X";          
              box.classList.add(x)
              box.classList.add('btn-info')
              movesX.push(x);
              check(movesX, true);
          } else {
              box.textContent = "O";
              box.classList.add(o)
              box.classList.add('btn-primary')
              movesO.push(x);
              check(movesO);
          }
      }

    function check(x, isX) {
      if(x.length > 2){    
        if (formula(x)){        
            if (isX) {                            
                x_win++
                $('#x_win').text(x_win)
            } else {
                o_win++
                $('#o_win').text(o_win)
            }
            alert((isX?'X':'O')+' has won the game. Start a new game')
            reset();
        }
      }
    }

    function formula(x){
      var isValid=false;ex=0;
      for(let ct =0; ct < matrixCombination.length; ct++){
        let ex=0;
        for(let ctr = 0; ctr < 3; ctr++){
          for(let c=0; c < x.length; c++){               
            if(matrixCombination[ct][ctr] === x[c]){
              ex++
            }
            if(ex===3){
              return true;
            }
          }
        }
      }
      return false;
    }
    
    function reset(x) {
        movesX = [];
        movesO = [];
        is_end=false;
        $("#game li").text("+");
        $("#game li").removeClass('disable')
        $("#game li").removeClass('o')
        $("#game li").removeClass('x')
        $("#game li").removeClass('btn-primary')
        $("#game li").removeClass('btn-info')     
    }

    $('#game li').click(function(val){  
      clicked(parseInt(this.id))  
    });
    
    $("#reset").click(()=>reset());
});
