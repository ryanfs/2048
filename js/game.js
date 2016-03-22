function Game() {
  this.board = this.generateBoard();
  // this.board = [2,2,0,2,0,0,0,2,0,0,0,0,0,0,0,2];
  // this.board = [2,2,4,8,16,32,64,128,256,512,1024,1024,0,0,0,2];
  this.grid = this.toGrid();
  this.score = 0;
};

Game.prototype.generateBoard = function() {
  var startingPieces = _.sample([2,2,4,2,2,2,2,2], 2);
  var startingBoard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  var board = startingBoard.concat(startingPieces);
  return _.shuffle(board);
}

Game.prototype.toString = function() {
  for (var i = 0; i < this.board.length; i += 5) {
    this.board.splice(i, 0, '\n');
  }
  return this.board.join('');
}

Game.prototype.toGrid = function() {
  var grid = [], i, k;
  for (var i = 0, k = -1; i < this.board.length; i++) {
    if (i % 4 === 0) {
      k++;
      grid[k] = [];
    }
    grid[k].push(this.board[i]);
  }
  return grid;
}

Game.prototype.print = function() {
  for (var i = 0; i < this.grid.length; i++) {
    console.log(this.grid[i]);
  }
}


var updateGrid = function(board) {
  var grid = [], i, k;
  for (var i = 0, k = -1; i < board.length; i++) {
    if (i % 4 === 0) {
      k++;
      grid[k] = [];
    }
    grid[k].push(board[i]);
  }
  return grid;
}

Game.prototype.removeZerosAndAddPairs = function() {
  for (var j = 3; j >= 0; j--) {
    for (var i = 3; i >= 0; i--){
      if (this.grid[j][i] === 0){
      this.grid[j].splice(i, 1);
      }
    }
  }
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (this.grid[i][j] === this.grid[i][j + 1]) {
        var points = (this.grid[i][j + 1]) * 2;
        this.grid[i][j] = (this.grid[i][j + 1] * 2);
        this.grid[i].splice(j + 1, 1);
        if (Number.isInteger(points)) {this.score += points;}
        console.log(this.score.toString());
      }
    }
  }
}

Game.prototype.collectEmptyCells = function(){
  var arr = []
  for (arrIdx in this.grid){
    for (innerIdx in this.grid){
      if (this.grid[arrIdx][innerIdx] === 0){
        arr.push([arrIdx,innerIdx]);
      };
    };
  };
  return arr;
}

Game.prototype.placeRandomTwoFour = function(){
  var randomEmptyCell = _.sample(this.collectEmptyCells());
  var num = _.sample([2,2,4,2,2,2,2,2,2])
  this.grid[randomEmptyCell[0]][randomEmptyCell[1]] = num;
}


Game.prototype.addZerosBackIn = function() {
  for (var j = 3; j >= 0; j--) {
    for (var i = 3; i >= 0; i--){
      if (isNaN(this.grid[j][i])){
      this.grid[j][i] = 0;
      }
    }
  }
  for (var j = 0; j < 4; j++) {
    for (var k = 0; k < 4; k++) {
      if (this.grid[j].length < 4) {
        this.grid[j].push(0);
      }
    }
  }
}

var transpose = function(a) {
  return Object.keys(a[0]).map(
    function (c) { return a.map(function (r) { return r[c]; }); });
}


Game.prototype.moveLeft = function() {
  var previousState = _.flatten(this.grid);
  this.removeZerosAndAddPairs();
  this.addZerosBackIn();
  if (previousState.join('') != _.flatten(this.grid).join('')) {
    this.placeRandomTwoFour();
  }
  this.showNumbers();
  $('#score').html(this.score);
};

Game.prototype.moveRight = function() {
  for (var i = 0; i < 4; i++) {
    this.grid[i].reverse();
  }

  this.moveLeft();

  for (var i = 0; i < 4; i++) {
    this.grid[i].reverse();
  }
  this.showNumbers();
}

Game.prototype.moveUp = function() {
  this.grid = transpose(this.grid);
  this.moveLeft();
  this.grid = transpose(this.grid);
  this.showNumbers();
}

Game.prototype.moveDown = function() {
  this.grid = transpose(this.grid);
  for (var i = 0; i < 4; i++) {
    this.grid[i].reverse();
  }
  this.moveLeft();
    for (var i = 0; i < 4; i++) {
    this.grid[i].reverse();
  }
  this.grid = transpose(this.grid);
  this.showNumbers();
}

Game.prototype.showNumbers = function() {
  arr = _.flatten(this.grid);
  for (var i = 0; i < arr.length; i++) {
    var nums = $($('.container').children()[i]);
    nums.text(arr[i]);
    for (var k = 0; k < nums.length; k++) {
      var boxNumber = $(nums[k]);
      boxNumber.removeClass();
      if (boxNumber.text() === '0') { boxNumber.html('&nbsp;'); }
      if (boxNumber.text() === '2') { boxNumber.addClass('two');}
      if (boxNumber.text() === '4') { boxNumber.addClass('four');}
      if (boxNumber.text() === '8') { boxNumber.addClass('eight');}
      if (boxNumber.text() === '16') { boxNumber.addClass('sixteen');}
      if (boxNumber.text() === '32') { boxNumber.addClass('thirtytwo');}
      if (boxNumber.text() === '64') { boxNumber.addClass('sixtyfour');}
      if (boxNumber.text() === '128') { boxNumber.addClass('onetwoeight');}
      if (boxNumber.text() === '256') { boxNumber.addClass('twofivesix');}
      if (boxNumber.text() === '512') { boxNumber.addClass('fivetwelve');}
      if (boxNumber.text() === '1024') { boxNumber.addClass('tentwentyfour');}
      if (boxNumber.text() === '2048') { boxNumber.addClass('winner');}
    }
  }
}
// To Do
// Move up/down



