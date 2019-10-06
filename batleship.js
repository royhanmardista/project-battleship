function sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  function clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }  
function bikinBoard() {
    const board = []
    const kamus = 'ABCDEFGHIJKLMNO'
    for (let i=0; i<11; i++) {
        let temp = []
        for (let j=0; j<11; j++) {
            if (i===0 && j > 0) {
                temp.push(kamus[j-1])
            } else if (j===0 && i > 0 ) {
                temp.push(i)
            } else {
                temp.push(' ')
            }            
        }
        board.push(temp)
    }
    return board
}

function printBoard(board) {
    let output = []
    for (let i=0; i<board.length; i++) {
        output.push(board[i].join('|'))
    }
    return output.join('\n')
}
let board = bikinBoard()
function random (board) {    
    let titik = Math.floor(Math.random()*11)
    while (titik === 0 && titik != board.length) {
        titik = Math.floor(Math.random()*11)
    }
    return titik
}

function cariArah() {
    const arah = ['kanan', 'kiri','atas','bawah']
    return arah[Math.floor(Math.random()*arah.length)]
}

function titikClear(size,titik) {    
    if (titik-size > 0) {
        return true
    } else if (titik+size < 12) {
        return true
    }
return false
}

function allClear(titikX,titikY,arah,board,size) {      
    if (arah === 'kanan') {
        if ((titikY+size) && (titikY+size )< board.length) {
            for (let j=titikY; j<titikY+size; j++) {
                if (board[titikX][j] !== ' ') {
                    return false
                }                
            }
            return true
        }        
        return false
    } else
    if (arah === 'kiri') {
        if ((titikY-size) && (titikY-size) > 1 ) {
            for (let j= titikY; j>= titikY-size; j--) {
                if (board[titikX][j] !== ' ') {
                    return false
                }
            }
            return true
        }        
        return false
    } else
    if (arah === 'atas') {
        if ((titikX-size) && titikX-size > 1) {            
            for (let i= titikX; i>= titikX-size; i--) {
                if (board[i][titikY] !== ' ') {
                    return false
                }
            }
            return true
        }   
        return false
    }else 
    if (arah === 'bawah') {
        if ((titikX+size) && titikX+size < board.length) {
            for (let i=titikX; i<titikX+size; i++) {
                if (board[i][titikY] !== ' ') {
                   return false
                }
                    
            }
            return true 
        }        
    return false    
    }
    
}


function pasangKapal(titikX,titikY,arah,size,board) {     
    if (arah === 'kanan' ) {
        for (let i=titikY; i<titikY+size; i++) {
            board[titikX][i] = '*' 
        }
    } else if (arah === 'kiri') {
        for (let i= titikY; i> titikY-size; i--) {
            board[titikX][i] = '*'
        }
    } else if (arah === 'atas') {
        for (let i= titikX; i> titikX-size; i--) {
            board[i][titikY] = '*'
        }
    } else if (arah === 'bawah') {
        for (let i=titikX; i<titikX+size; i++) {           
           board[i][titikY] = '*'
        }
    }

}

function batleShip() {
    let kapal = [5,4,3,2]    
    let board = bikinBoard()  
    let titikX = random(board)
    let titikY = random(board)
    let arah = cariArah()    
    let counter = 0
    let size = kapal[counter]
    while (counter < 4) {
        if (allClear(titikX,titikY,arah,board,size)) {
            size = kapal[counter]
            pasangKapal(titikX,titikY,arah,size,board)
            counter ++            
            
        } else {
            titikX = random(board)
            titikY = random(board)
            arah = cariArah()
        }
    }
    console.table(board)
    sleep(1000)
    clearScreen() 
    const huruf = 'ABCDEFGHIJ'
    const angka = ['1','2','3','4','5','6','7','8','9','10']
    const bomb = process.argv.slice(2)
    for (let i=0; i<bomb.length; i++) {
        let baris = angka.indexOf(bomb[i][1])+1 
        let kolom = huruf.indexOf(bomb[i][0])+1
        if (board[baris][kolom] === ' ') {
            board[baris][kolom] = ' | '
            console.table(board)
            sleep(1000)
            clearScreen() 
        } else if (board[baris][kolom] === '*'){
            board[baris][kolom] = ' X '
            console.table(board)
            sleep(1000)
            clearScreen() 
        }
    }
    console.table(board)    
    
}

batleShip()
//let papan = bikinBoard()
//pasangKapal(8,10,'atas',3,papan)
//console.table(papan)
//console.log(allClear(1,1,'atas',3,papan))
