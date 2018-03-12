(function() {

    //declare map size and mine amount:

    var mapHeight = 10,
        mapWidth = 10,
        mineAmount = 10,
        coveredFields = (mapHeight*mapWidth)-mineAmount;
    // console.log(coveredFields);
    //generate map

    var map = $("#map");
    for (var i = 0; i < mapHeight; i++) {
        var row = $("<div class='row'></div>");
        for (var j = 0; j < mapWidth; j++) {
            row.append($("<div class='field covered' data-x='" + i + "' data-y='" + j + "'></div>"));
        }
        map.append(row);
    }

    //generate mines:

    for(var i = 0; i< mineAmount; i++) {

        do {
            var minex = Math.floor(Math.random() * 10);
            var miney = Math.floor(Math.random() * 10);

            var mineLocation = [minex, miney];

            // console.log(minex,miney);

            var mine = document.querySelector("div.covered[data-x='" + mineLocation[0] + "'][data-y='" + mineLocation[1] + "']");
        } while (mine.classList.contains('mine'));
        mine.classList.add('mine');

    }

    var gameOn = 1;

    //actual game starts here

    var rightClickFun = function (ev){
        ev.preventDefault();
        // console.log('context menu blocked!');
        if (ev.target.classList.contains('covered')) {
            if (ev.target.classList.contains('declareMine')) {
                ev.target.classList.remove('declareMine');

                ev.target.innerHTML = '';
                // console.log('removed class');
            } else {
                ev.target.classList.add('declareMine');

                ev.target.innerHTML = '<i class="fas fa-times"></i>';

                // console.log('added class');
            }
        }
        else if(ev.target.tagName === 'path') { //Ensuring event will be triggered when player clicks on icon
            // console.log(ev.target.parentElement.parentElement.tagName);
            ev.target.parentElement.parentElement.classList.remove('declareMine');
            ev.target.parentElement.parentElement.innerHTML = '';
        }
        else if(ev.target.tagName === 'svg') {
            // console.log(ev.target.parentElement.tagName);
            ev.target.parentElement.classList.remove('declareMine');
            ev.target.parentElement.innerHTML = '';
        }


        return false;
    };

    var clickFun = function (e) {
        if (e.target.classList.contains('covered') && !e.target.classList.contains('declareMine')) {
            if (e.target.classList.contains('mine')) {
                e.target.classList.remove('covered');
                e.target.classList.remove('mine');
                e.target.classList.add('discovered');
                e.target.classList.add('discoveredMine');
                $('#map').css('backgroundColor', 'red');
                gameOn = 0;
                if(gameOn===0){
                    var node1 = document.createTextNode('Game Over!');
                    var gameState = document.querySelector('#gameState');
                    gameState.appendChild(node1);

                    document.querySelector("#map").removeEventListener('contextmenu', rightClickFun, false);

                    document.querySelector("#map").removeEventListener('click', clickFun);
                }

            }
            else {
                chainDisc(e.target);
            }
        }

    };

        document.querySelector("#map").addEventListener('contextmenu', rightClickFun, false);

        document.querySelector("#map").addEventListener('click', clickFun);

    //after a covered field without a mine has been clicked this is what happens:
    function chainDisc(theField) {

        theField.classList.remove('covered');
        theField.classList.add('discovered');
        coveredFields -= 1;

        // console.log(coveredFields);

        //set mines to 0
        var mines = 0;
        //save clicked field coordiates
        var targetX = parseInt(theField.dataset.x);
        var targetY = parseInt(theField.dataset.y);

        var mini,
            maxi,
            minj,
            maxj;
        //set the loop limits based on where the clicked field is located
        if(targetX === 0){
            mini = 0;
            maxi = 2;
        } else if(targetX === 9){
            mini = -1;
            maxi = 1;
        } else {
            mini = -1;
            maxi = 2;
        }

        if(targetY === 0){
            minj = 0;
            maxj = 2;
        } else if(targetY === 9){
            minj = -1;
            maxj = 1;
        } else {
            minj = -1;
            maxj = 2;
        }

        //loop through fields around the clicked field to look for mines
        for(var i=mini; i < maxi; i++) {
            for(var j=minj; j < maxj; j++) {

                var xCheck = targetX+parseInt(i);
                var yCheck = targetY+parseInt(j);

                // console.log(xCheck, yCheck);
                var field = document.querySelector("div[data-x='" + xCheck + "'][data-y='" + yCheck + "']");
                if(field && field.classList.contains('mine')){
                    mines +=1;
                }
            }
        }
        // end loop, we know how many mines are around a clicked field
        // console.log(mines);
        // if there are more than 0 mines around the clicked field then show up a number of mines after discovering
        if(mines!==0 && !theField.classList.contains('declareMine')) {
            var node = document.createTextNode(mines.toString());
            theField.appendChild(node);
        }
        //otherwise, cycle through the fields around the clicked field
        else {
            for(var k=mini; k < maxi; k++) {
                for(var l=minj; l < maxj; l++) {

                    var xDisc = targetX+parseInt(k);
                    var yDisc = targetY+parseInt(l);

                    // console.log(xCheck, yCheck);
                    var checkField = document.querySelector("div[data-x='" + xDisc + "'][data-y='" + yDisc + "']");
                    if(checkField.classList.contains('covered') && !checkField.classList.contains('declareMine')) {
                        chainDisc(checkField);
                    }
                }
            }
        }

        if(coveredFields===0) {
            $('#map').css("backgroundColor", "green");
            var node1 = document.createTextNode('You Won!');
            var gameState = document.querySelector('#gameState');
            gameState.appendChild(node1);
            gameOn = 2;

            document.querySelector("#map").removeEventListener('contextmenu', rightClickFun, false);

            document.querySelector("#map").removeEventListener('click', clickFun);

        }
    }

})();