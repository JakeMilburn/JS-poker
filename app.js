    var balance = 5000;
    var dealerBalance = 5000;
    var executed = false; //checks the status of the flop
    var pot = 0;
    var bet = 0;
    var checkExec = false; //check the status of the turn card
    var flow = 0;
    var riverExec = false;
    var winner = 0;
    var k = 0;
    var dealerHand = [];
	var playerHand = [];
	var increment = 0;

//Generates deck of cards

    let deck = new Array();
    const suits = ["s", "d", "c", "h"];
    const values =["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    function getDeck(){
        var deck = new Array();
            for(var i = 0; i < suits.length; i++){
                for(var x = 0; x < values.length; x++){
                    var card = {Value: values[x], Suit: suits[i], val: k};
                    k++;
                    deck.push(card);
                }
            }
        return deck;
    }

//Shuffles deck of cards 1000 times

    const shuffle = () => {
        for(let i = 0; i < 1000; i++){
            let location1 = Math.floor((Math.random() * deck.length));
            let location2 = Math.floor((Math.random() * deck.length));
            let tmp = deck[location1];
            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
    };

    const removeCardFromDeck = () => {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");
        card.className = "card" + increment;
        increment++;
        value.className = "value";
        suit.className = "suit " + deck[0].Suit;
        value.innerHTML = deck[0].Value;
        card.appendChild(value);
        card.appendChild(suit);
        card.setAttribute("data-jmp-cardvalue", deck[0].val);
        card.setAttribute("data-npm-cardvalue", deck[0].Value + deck[0].Suit);
        deck.splice(0, 1);
        return card;
    };


    function renderDealerHand(){
        for (var a = 0; a < 2; a++){
            var card = removeCardFromDeck();
            $('.dealerCards').hide();
            document.getElementById("dealerCards").appendChild(card);
        }
    }


     var flop = (function() {
        
        return function() {
            if (!executed) {
                executed = true;
                for (var a = 0; a < 3; a++){
                var card = removeCardFromDeck();
                document.getElementById("tableCards").appendChild(card);
         }
     }
    };
    })();

    function renderPlayerHand(){
        for (var a = 0; a < 2; a++){
            var card = removeCardFromDeck();
            document.getElementById("playerCards").appendChild(card);
        }
    }

     var turnCard = (function() {
        
        return function() {
            if (!checkExec) {
                checkExec = true;
                var card = removeCardFromDeck();
                document.getElementById("tableCards").appendChild(card);
     }
    };
    })();

     var riverCard = (function() {
        
        return function() {
            if (!riverExec) {
                riverExec = true;
                var card = removeCardFromDeck();
                document.getElementById("tableCards").appendChild(card);
     }
    };
    })();

    function theWinner(){
        if (winner === 1) {
            dealerBalance = dealerBalance + pot;
            pot = 0;
            document.getElementById("dealerBalance").innerHTML = 'Balance: £' + dealerBalance;
            document.getElementById("pot").innerHTML = 'Pot: £' + pot;

        } 
        else if (winner === 2) {
            balance = balance + pot;
            pot = 0;
            document.getElementById("balance").innerHTML = 'Balance: £' + balance;
            document.getElementById("pot").innerHTML = 'Pot: £' + pot;
            
        }
        else if (winner === 3) {
            balance = balance + (pot / 2);
            dealerBalance = dealerBalance + (pot / 2);
            pot = 0;
            document.getElementById("dealerBalance").innerHTML = 'Balance: £' + dealerBalance;
            document.getElementById("balance").innerHTML = 'Balance: £' + balance;
            document.getElementById("pot").innerHTML = 'Pot: £' + pot;
        }
    }

///******************************************************************
	function showCards(){
	    if (flow === 4) {
	        setTimeout(
	          function() 
	          {
	          	if(winner == 1) {
	          		$('.dealerWin').show();
	          		document.getElementById("dealerPot").innerHTML = '+' + pot;
		            $('#dealerPot').show();
	          	} else if(winner == 2) {
	          		$('.playerWin').show();
	          		document.getElementById("playerPot").innerHTML = '+' + pot;
					$('#playerPot').show();
	          	}
	            $('.dealerHidden').hide();
	            $('.dealerCards').show();
	          }, 3000);

	    }
	}
///*******************************************************************

//Initialises the game on load

    function load()
    {
    	$('#dealerPot').hide();
		$('#playerPot').hide();
    	$('.dealerWin').hide();
		$('.playerWin').hide();
        deck = getDeck();
        shuffle();
        renderDealerHand();
        renderPlayerHand();
        $('.dealerHidden').show();
    }

/********Player option 1 (pre flop)**************/

//Check logic

        $('.check').on('click', function() {
	        if (flow === 0) { //option1
	            flop();
	            flow = 1;
	        }
	        else if (flow === 1){ //option after flop
	            turnCard();
	            flow = 2;
	        }
	        else if (flow === 2){ //option after turn
	            riverCard();
	            flow = 3;
	        }
	        else if (flow === 3){ //option after river (final action)
	            //decide winner
	            flow = 4;
	            getHands();
	            fullHandCheck();
	            showCards();  ///********************************************
	            theWinner();
	            setTimeout(
		           	function()
		           	{
			           	$('#playerCards, #dealerCards, #tableCards').empty();
			            increment = 0;
			            load();
			            flow = 0;
			            pot = 0;
			            document.getElementById("pot").innerHTML = 'Pot: £' + pot;
			            executed = false;
			            checkExec = false;
			            riverExec = false;
			        }, 6000);
			    }
		    });
    
//Fold 
    $('.fold').on('click',function(){
            winner = 1;
            theWinner();
            $('#playerCards, #dealerCards, #tableCards').empty();
            increment = 0;
            load();
            flow = 0;
            pot = 0;
            document.getElementById("pot").innerHTML = 'Pot: £' + pot;
            executed = false;
            checkExec = false;
            riverExec = false;
     });

//Betting-sets a variable based on the bet amount chosen

	$('.bets').on('change', function() {
	    if (this.value == 10){
	     bet = 10;
	    } 
	    else if (this.value == 50){
	         bet = 50;
	    } 
	    else if (this.value == 100){
	         bet = 100;
	    } 
	    else if (this.value == 500){
	         bet = 500;
	    } 
	    else if (this.value == 'all'){
	         bet = balance;
	    } 
	    else {
	        bet = 0;
	        alert('Please select a bet');
	    }
	});

//Actually submits the bet 

	$('.betSubmit').on('click',function(){
        if (flow === 0){
            if (bet > 0 && bet <= balance){
                balance = balance - bet;
                pot = pot + bet;
                flop();
                document.getElementById("balance").innerHTML = 'Balance: £' + balance;
                document.getElementById("pot").innerHTML = 'Pot: £' + pot;
                flow = 1;
            } else {
                alert('You cannot afford that');
            }
        } 
        else if (flow === 1){
            if (bet > 0 && bet <= balance){
                balance = balance - bet;
                pot = pot + bet;
                turnCard();
                document.getElementById("balance").innerHTML = 'Balance: £' + balance;
                document.getElementById("pot").innerHTML = 'Pot: £' + pot;
                flow = 2;
            } else {
                alert('You cannot afford that');
            }
        } 
        else if (flow === 2){
            if (bet > 0 && bet <= balance){
                balance = balance - bet;
                pot = pot + bet;
                riverCard();
                document.getElementById("balance").innerHTML = 'Balance: £' + balance;
                document.getElementById("pot").innerHTML = 'Pot: £' + pot;
                flow = 3 ;
            } else {
                alert('You cannot afford that');
            }
        } 
        else if (flow === 3){
            if (bet > 0 && bet <= balance){
                balance = balance - bet;
                pot = pot + bet;
                document.getElementById("balance").innerHTML = 'Balance: £' + balance;
                document.getElementById("pot").innerHTML = 'Pot: £' + pot;
                flow = 4;
                getHands();
                fullHandCheck();
                showCards(); ///**************************************
                theWinner();
                setTimeout(
		           	function()
		           	{
			           	$('#playerCards, #dealerCards, #tableCards').empty();
			            increment = 0;
			            load();
			            flow = 0;
			            pot = 0;
			            document.getElementById("pot").innerHTML = 'Pot: £' + pot;
			            executed = false;
			            checkExec = false;
			            riverExec = false;
			        }, 6000);
            } else {
                alert('You cannot afford that');
            }
        }
    });

    window.onload = load;   

	function getHands(){
	    for ( var i = 0; i < 2; i++){
	        var element = document.getElementsByClassName("card" + i);
	        if (element === undefined) {
	            console.log("Can't find the card with value: " + i);
	            continue;
	        }
	        dealerHand[i] = element[0].getAttribute('data-npm-cardvalue');
	    }
	    for ( var i = 4; i < 9; i++){
	        var element = document.getElementsByClassName("card" + i);
	        if (element === undefined) {
	            console.log("Can't find the card with value: " + i);
	            continue;
	        }
	        dealerHand[i] = element[0].getAttribute('data-npm-cardvalue');
	        playerHand[i] = element[0].getAttribute('data-npm-cardvalue');
	    }
	    for ( var i = 2; i < 4; i++){
	        var element = document.getElementsByClassName("card" + i);
	        if (element === undefined) {
	            console.log("Can't find the card with value: " + i);
	            continue;
	        }
	        playerHand[i] = element[0].getAttribute('data-npm-cardvalue');
	    }
	    // fullHandCheck();
	}

	function fullHandCheck(){
	    var hand1 = Hand.solve([dealerHand[0], dealerHand[1], dealerHand[4], dealerHand[5], dealerHand[6], dealerHand[7], dealerHand[8]]);
	    console.log(hand1.descr);
	    var hand2 = Hand.solve([playerHand[2], playerHand[3], playerHand[4], playerHand[5], playerHand[6], playerHand[7], playerHand[8]]);
	    console.log(hand2.descr);
	    var winners = Hand.winners([hand1, hand2]);

	    if(winners[0] === hand1 && winners[0] != hand2){
	        winner = 1;
	        console.log('dealer');
	    }else if(winners[0] === hand2 && winners[0] != hand1){
	        winner = 2;
	        console.log('player');
	    }else if (winners[0] === hand1 && winners[0] === hand2){
	        winner = 3;
	        console.log('draw');
	    }

	    console.log(winner);
	}
