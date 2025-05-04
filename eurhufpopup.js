let convertValue = 0;

if (window.opener && !window.opener.closed) {
    convertValue = window.opener.convertValue;
}

document.getElementById('myid').addEventListener('input', function() {
    var sumValue = document.getElementById('myid').value;
    sumValue = sumValue.replace(/,/g, '.');
    if (!isNaN(sumValue) && sumValue !== '') {
        document.getElementById('result').innerText = 'Ft: ' + Math.round(parseFloat(sumValue * convertValue )) ;
    } else {
        document.getElementById('result').innerText = 'Csak számot írj be!';
    }
});

document.getElementById('myeurid').addEventListener('input', function() {
    var eurValue = document.getElementById('myeurid').value;
    var ftValue2 = document.getElementById('myftid').value;
    var sumValue = document.getElementById('myid').value;
    sumValue = sumValue.replace(/,/g, '.');

    if ( !isNaN(sumValue) && sumValue !== '' && ( eurValue % 5 === 0 ) && ( eurValue >=0 ) )  {
        if ( sumValue * convertValue >= eurValue * convertValue ) {  
            document.getElementById('result2').innerText = 'Ft még: ' + ( Math.round(parseFloat(sumValue * convertValue)) - Math.round(parseFloat(eurValue * convertValue)));
    }
        else {
            document.getElementById('result2').innerText = 'Ft vissza: ' + Math.floor((  Math.round(parseFloat(eurValue * convertValue )) - Math.round(parseFloat(sumValue * convertValue)) )/5)*5;
        }
    } else {
        document.getElementById('result2').innerText = 'Helytelen eur!';
    }
});

document.getElementById('myftid').addEventListener('input', function() {
    var eurValue = document.getElementById('myeurid').value;
    var ftValue = document.getElementById('myftid').value;
    var sumValue = document.getElementById('myid').value;
    sumValue = sumValue.replace(/,/g, '.');

    if ( !isNaN(sumValue) && sumValue !== '' && ( eurValue % 5 === 0 ) && !isNaN(parseFloat(ftValue)) && ( ftValue >= 0 ) )  {
        if ( (sumValue * convertValue) > ( ( eurValue * convertValue ) + ftValue ) ) {
            document.getElementById('result2').innerText = 'Ft fiz: ' + ( Math.ceil(parseFloat(sumValue * convertValue)) - Math.round(parseFloat(eurValue * convertValue)) - Math.round(parseFloat(ftValue)) );
        } else {
            var sumResult = Math.round(parseFloat(sumValue * convertValue ));
            var endResult = Math.round(parseFloat((eurValue * convertValue ) + parseFloat(ftValue) - sumResult));
	    if ( isNaN(endResult) ) { 
        	document.getElementById('result2').innerText = 'Forint adat hiányzik vagy rossz, írjál 0-t, ha nincs!';
	    } else {
		endMessage = endResult < 0 ? "Ft még" : "Ft vissza";
		endResult  = endResult < 0 ? endResult = endResult * -1 : Math.floor(endResult/5)*5;
        	document.getElementById('result2').innerText = endMessage+': ' + endResult;
	    }
        }
    } else {
        document.getElementById('result2').innerText = 'Helytelen Ft összeg!';
    }
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('myeurid').value = '';
    document.getElementById('myftid').value = '';
    document.getElementById('myid').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('result2').innerText = '';
    document.getElementById('myid').focus();
});
