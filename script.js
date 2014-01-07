$(function(){
	var numberArray= [],
		length = 5,
		sum = 0,
		targetnumber = 0,
		i, j, n1,
		innerHTML = '',
		numberCount = 0,
		targetCount = 0,
		randI = 0,
		randJ = 0,
		flag = -1,
		score = 0;

	//calculating the target
	var target = function() {
		targetnumber = 0;
		numberCount = 0;
		var invalidIdCount = 0;
		$( '#numberDisplay' ).find( 'ul' ).each(function () {
			numberCount = numberCount + $(this).find('li').size();
		});
		if( numberCount > 0 ) {
			do {
				targetCount = Math.round( Math.random() * (numberCount-1) ) + 1;
			} while ( targetCount === 0 );
		}
		else{
			$('#target').text('');
			flag = 1;
			gameOver();
		}
		for ( i = 0; i < targetCount; i++ ) {
			randI = Math.round( Math.random() * 4 );
			randJ = Math.round( Math.random() * 4 );
			if( $( '#li' + randI + randJ ).length === 1 ) {
				if( !( $( '#li' + randI + randJ ).hasClass('selected') ) ){
					$( '#li' + randI + randJ ).addClass('selected');
					targetnumber = targetnumber + parseInt( $( '#li' + randI + randJ ).text(), 10 );
				}
			} else {
				invalidIdCount++;
			}
			if( (invalidIdCount === targetCount) && (targetnumber === 0) ){
				i = -1;
				invalidIdCount = 0;
			}
		}
		$('.selected').removeClass();
		$( '#target' ).text( targetnumber );
	}

	//function for calculating sum of clicked numbers
	var calculatingSum = function(){
		var clickedsum = 0,
			clickedLiCount = 0,
			clickedLi;
		$( 'li' ).click(function(){
			clickedLi = $( this );
			if( !( clickedLi.hasClass( 'clicked' ) ) ){
				clickedsum = clickedsum + parseInt( $( clickedLi ).text(), 10 );
			}
			if( clickedsum <= targetnumber ) {
				$( clickedLi ).addClass( 'clicked' );
				clickedLiCount++;
			}
			else if( clickedsum > targetnumber ) {
				$( 'body li' ).unbind( 'click' );
				clickedsum = 0;
				$('li').removeClass('clicked');
				flag = 2;
				gameOver();
			}

			if( clickedsum === targetnumber ) {
				$( 'body li' ).unbind( 'click' );
				if( !( $( clickedLi ).hasClass( 'clicked' ) ) ){
					$( clickedLi ).addClass( 'clicked' );
					clickedLiCount++;
				}
				j = 10;
				for (i = 0; i<clickedLiCount; i++){
					score = score + ( ( i + 1 ) * j );
					j = j + 5;
				}
				$( '#score' ).text(score*10);
				$( '.clicked' ).remove();

				if($( 'body' ).find( 'li' ).size() > -1){
					playGame();
					$('li').removeClass();
				}
				else{
					alert('last li');
					gameOver();
				}
			}
		});
	}

	var gameOver = function(){
		if(flag === 1){
			$('#won').css('display','block');
		}
		else if(flag === 2){
			$('#lost').css('display','block');
		}
		$('button').text('Replay');
		$('button').css({display : 'block', padding : '33% 2% 20%'});
		$('#gameWrapper').css('display','none');
	}

	//play Game function
	var playGame = function(){
		console.log('playGame called');
		target();
		$( 'body li' ).bind( 'click' );
		calculatingSum();
	}

	var init = function(){
		// expand to have the correct amount or rows
		for( i = 0; i < length; i++ ) {
		  numberArray.push( [] );
		}

		// expand all rows to have the correct amount of cols and add number to each cell
		for ( i = 0; i < length; i++) {
		    for ( j =  numberArray[i].length; j < length; j++) {
			do {
					n1 = Math.round( Math.random() * 9 );
				} while( n1 === 0 );
				numberArray[i].push( n1 );
		    }
		}

		//displaying the contents in array to the matrix
		for( i = 0; i < length; i++) {
			innerHTML = '<ul>';
			for( j = 0; j < length; j++) {
				innerHTML = innerHTML + "<li id='li" + i + j + "'>" + numberArray[i][j] + "</li>" ;
			}
			innerHTML = innerHTML + '</ul>';
			$( '#numberDisplay' ).append( innerHTML );
		}


		playGame();
	}

	$('button').click(function(){
		flag = -1;
		if($('#numberDisplay').html().length !== 0){
			$('#numberDisplay').html('');
		}
		$(this).css('display','none');
		$('#gameWrapper').css('display','block');
		$('#resultWrapper p').css('display','none');
		init();
	});

});
