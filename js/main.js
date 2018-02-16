$(function() {
    var updateInterval = 150;
    var width = 500;
    var height = 500;
    var $player = $("#player .head");
    var $game = $("#game");
    var dir = "down"; // false
    var movementSpeed = 10;
    var pause = false;
    var moveArr = [];

    var bindKeys = function() {
        $(window).keydown(function (e) {
            if (e.which == 87) {
                dir = "up";
            } 
            if (e.which == 68) {
                dir = "right";
            } 
            if (e.which == 83) {
                dir = "down";
            } 
            if (e.which == 65) {
                dir = "left";
            }
        });
    };

    var updateTail = function() {
        var $tails = $("#player .tail");

        if ($tails.length == 0) {
            moveArr = [];
        }

        $tails.each(function(i, tail) {
            var $tail = $(tail);

            var x = $tail.position().left;
            var y = $tail.position().top;

            var index = $tail.index();
            var ins = moveArr[index];

            if (ins != undefined) {
                if (ins == "up") {
                    $tail.css("top", y - movementSpeed);
                }
                else if (ins == "right") {
                    $tail.css("left", x + movementSpeed);
                }
                else if (ins == "down") {
                    $tail.css("top", y + movementSpeed);
                }
                else if (ins == "left") {
                    $tail.css("left", x - movementSpeed);
                }
            }

            x = $tail.position().left;
            y = $tail.position().top;

            worldWrap(x, y, $tail);
        });

        moveArr = moveArr.slice(0, $tails.length);
    };

    var movement = function() {
        var x = $player.position().left;
        var y = $player.position().top;

        if (dir == "up") {
            moveArr.unshift("up");
            $player.css("top", y - movementSpeed);
        }
        else if (dir == "right") {
            moveArr.unshift("right");
            $player.css("left", x + movementSpeed);
        }
        else if (dir == "down") {
            moveArr.unshift("down");
            $player.css("top", y + movementSpeed);
        }
        else if (dir == "left") {
            moveArr.unshift("left");
            $player.css("left", x - movementSpeed);
        }

        x = $player.position().left;
        y = $player.position().top;

        checkFoodCollision(x, y);
        worldWrap(x, y, $player);
    };

    var spawnFood = function() {
        var $food = $("<div id='food'>");

        var x = Math.floor(Math.random() * $game.width() - 10) + 0
        var y = Math.floor(Math.random() * $game.height() - 10) + 0

        x = Math.ceil(x / 10) * 10;
        y = Math.ceil(y / 10) * 10;

        $food.css("top", y);
        $food.css("left", x);

        $game.append($food.clone());
    };

    var checkFoodCollision = function(x, y) {
        var $food = $("#food");
        var foodX = $food.position().left;
        var foodY = $food.position().top;

        updateTail();

        if (foodX == x && foodY == y) {
            $food.remove();
            addSegment();
            spawnFood();
        }
    };

    var addSegment = function() {
        var $new = $("<div class='tail'>");
        var pos = $("#player").children().last().position();

        $new.css("top", pos.top);
        $new.css("left", pos.left);

        $player.parent().append($new)
    };

    var worldWrap = function(x, y, $e) {
        if (x == (width)) {
            $e.css("left", 0);
        }
        if (y == (height)) {
            $e.css("top", 0);
        }
        if (x == -10) {
            $e.css("left", width - 10);
        }
        if (y == -10) {
            $e.css("top", height - 10);
        }
    };

    var update = setInterval(function () {
        if (!pause) {
            movement();
        }
    }, updateInterval);
    
    bindKeys();
    spawnFood();

    // Debuging

    window.pause = function() {
        pause = true;
    };

    window.play = function () {
        pause = false;
    };
});