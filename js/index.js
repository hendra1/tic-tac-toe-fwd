$(document).ready(function() {
    var movesA, movesB;
    var x = "x"
    var o = "o"
    var o_win = 0;
    var x_win = 0;
    var is_end=false;

    //reset()
    function clicked(x) {
        if(is_end){return;}
          if (document.getElementById("game").children[x - 1].textContent === "X" || document.getElementById("game").children[x - 1].textContent === "O") {
              return;
          }
          var box = document.getElementById("game").children[x - 1];
          box.classList.add('disable')
          if ((movesA.length + movesB.length) % 2 === 0) {
              box.textContent = "X";          
              box.classList.add(x)
              box.classList.add('btn-info')
              movesA.push(x);
              check(movesA, true);
          } else {
              box.textContent = "O";
              box.classList.add(o)
              box.classList.add('btn-primary')
              movesB.push(x);
              check(movesB);
          }
      }

    function check(x, y) {
        if (x.includes(1) && x.includes(2) && x.includes(3) || x.includes(1) && x.includes(5) && x.includes(9) || x.includes(1) && x.includes(4) && x.includes(7) ||  
            x.includes(2) && x.includes(5) && x.includes(8) || x.includes(3) && x.includes(5) && x.includes(7) || x.includes(3) && x.includes(6) && x.includes(9) || 
            x.includes(4) && x.includes(5) && x.includes(6) || x.includes(7) && x.includes(8) && x.includes(9)){
            //document.getElementById("map").setAttribute("style", "height:370px;")
            if (y) {
                //document.getElementById("map").innerHTML += '<p>Cross Wins!</p>';
                alert('X wins has won the game. Start a new game')
                x_win++
                $('#x_win').text(x_win)
                reset();
            } else {
                //document.getElementById("map").innerHTML += '<p>Circle Wins!</p>';
                alert('O has won the game. Start a new game')         
                o_win++
                $('#o_win').text(o_win)
            }
            is_end=true;
            reset();
        }
    }
    
    function reset(x) {
        movesA = [];
        movesB = [];
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
