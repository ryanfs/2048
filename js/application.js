var game = new Game();
$(document).ready(function() {

  game.showNumbers();

  Mousetrap.bind('left', function(e) {
    game.moveLeft();
    game.print();
    console.log('--------');
  });

  Mousetrap.bind('right', function(e) {
    game.moveRight();
    game.print();
    console.log('--------');
  });

  Mousetrap.bind('up', function(e) {
    e.preventDefault();
    game.moveUp();
    game.print();
    console.log('--------');
  })

  Mousetrap.bind('down', function(e) {
    e.preventDefault();
    game.moveDown();
    game.print();
    console.log('--------');
  })


});
