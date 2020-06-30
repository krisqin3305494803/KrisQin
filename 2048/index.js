const LEFT = 0;
const TOP = 1;
const RIGHT = 2;
const BOTTOM = 3;
const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0]
]
function clearboard(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
}
function travelarr(arr) {
    var res = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (!arr[i][j]) {
                res.push(i * 4 + j);
            }
        }
    }
    return res;
}
// 生成新块
function newCell(arr) {
    var res = travelarr(arr)
    var i = parseInt(Math.random() * res.length);
    if (res.length == 0) {
        return false;
    }
    // console.log(res, i, res[i]);
    var row = parseInt(res[i] / 4);
    var colume = res[i] % 4;
    arr[row][colume] = 2;

    return i;
}
// newCell(board);
// console.log(board)
// 改变数组;
// 移动合并
function moveright(arr) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arr[i][j] != 0 && arr[i][j + 1] == 0) {
                arr[i][j + 1] = arr[i][j];
                arr[i][j] = 0;
            }
        }
    }
}
function moveleft(arr) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arr[i][j] != 0 && arr[i][j - 1] == 0) {
                arr[i][j - 1] = arr[i][j];
                arr[i][j] = 0;
            }
        }
    }
}
function movebottom(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < 4; j++) {
            if (arr[i][j] != 0 && arr[i + 1][j] == 0) {
                arr[i + 1][j] = arr[i][j];
                arr[i][j] = 0;
            }
        }
    }
}
function movetop(arr) {
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arr[i][j] != 0 && arr[i - 1][j] == 0) {
                arr[i - 1][j] = arr[i][j];
                arr[i][j] = 0;
            }
        }
    }
}

// 数组，方向;
function changeboard(arr, dir) {
    // <- 
    if (dir == LEFT) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < 3; j++) {
                if (arr[i][j] == arr[i][j + 1]) {
                    arr[i][j] *= 2;
                    arr[i][j + 1] = 0;
                }
            }
        }
        moveleft(arr);
        moveleft(arr);
        moveleft(arr);
    } else if (dir == RIGHT) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 4; j > 0; j--) {
                if (arr[i][j] == arr[i][j - 1]) {
                    arr[i][j] *= 2;
                    arr[i][j - 1] = 0;
                }
            }
        }
        moveright(arr);
        moveright(arr);
        moveright(arr);
    } else if (dir == BOTTOM) {
        for (let i = 1; i < 4; i++) {
            for (let j = 3; j >= 0; j--) {
                if (arr[i][j] == arr[i - 1][j]) {
                    arr[i][j] *= 2;
                    arr[i - 1][j] = 0;
                }
            }
        }
        // console.log(arr)
        movebottom(arr);
        movebottom(arr);
        movebottom(arr);
    } else if (dir == TOP) {
        for (let i = 0; i < 3; i++) {
            for (let j = 3; j >= 0; j--) {
                if (arr[i][j] == arr[i + 1][j]) {
                    arr[i][j] *= 2;
                    arr[i + 1][j] = 0;
                }
            }
        }
        movetop(arr);
        movetop(arr);
        movetop(arr);
    }
}

// 数组渲染div
function render() {
    var cells = document.getElementsByClassName('cell');
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < 4; j++) {
            let index = i * 4 + j;
            if (board[i][j] != 0) {
                if (board[i][j] > 4) {
                    cells[index].classList = "active-cell cell bignumber-cell value-" + board[i][j];
                } else {
                    cells[index].classList = "active-cell cell value-" + board[i][j];
                }

                cells[index].innerHTML = board[i][j];
            } else {
                cells[index].classList = "cell";
                cells[index].innerHTML = "";
            }
        }
    }

}

// 计分
function getscore(board) {
    var nowscore = document.getElementById('now-score-span');
    var bestscore = document.getElementById('best-score-span')
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            sum += board[i][j];
        }
    }
    nowscore.innerHTML = sum;
    if (sum > bestscore.innerHTML) {
        bestscore.innerHTML = sum;
    }
    return bestscore.innerHTML;
}

// 判断失败与否
function isfail(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return true;
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == board[i + 1][j]) {
                return true;
            }
        }
    }
    for(let i=0;i<4;i++){
        for(let j=0;j<3;j++){
            if( board[i][j] == board[i][j + 1]){
                return true;
            }
        }
    }
    console.log(board)
    return false;
}

// 简化代码
function keydown(board, dir) {
    changeboard(board, dir);
    newCell(board);
    render();
    let bestscore = getscore(board);
    if (!isfail(board)) {
        confirm('很遗憾，失败了！');
        localStorage.setItem('bestScore', bestscore);
        clearboard(board);
        document.getElementById('now-score-span').innerHTML = 0;
    }
}
document.addEventListener('keydown', (e) => {
    // console.log(e.keyCode)
    if (e.keyCode == 38) {
        keydown(board, TOP)
        //top
    } else if (e.keyCode == 37) {
        keydown(board, LEFT);
        // left
    } else if (e.keyCode == 39) {
        keydown(board, RIGHT)
        //right
    } else if (e.keyCode == 40) {
        keydown(board, BOTTOM)
        //bottom
    }
})

render();
if (localStorage.getItem('bestScore') != null) {
    document.getElementById('best-score-span').innerHTML = localStorage.getItem('bestScore');
}

document.getElementById('start').addEventListener('click', function (params) {
    document.getElementsByClassName('outer-wrap')[0].style.display = 'flex';
    document.getElementById('start').style.display = 'none'

})