var game = new Game();
$(document).ready(function() {

  game.showNumbers();

  Mousetrap.bind('left', function(e) {
    game.moveLeft();
  });

  Mousetrap.bind('right', function(e) {
    game.moveRight();
  });

  Mousetrap.bind('up', function(e) {
    e.preventDefault();
    game.moveUp();
  })

  Mousetrap.bind('down', function(e) {
    e.preventDefault();
    game.moveDown();
  })


});
