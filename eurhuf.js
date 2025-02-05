convertValue=400;

document.getElementById('myid').addEventListener('input', function() {
    var sumValue = document.getElementById('myid').value;
    sumValue = sumValue.replace(/,/g, '.');
    if (!isNaN(sumValue) && sumValue !== '') {
        document.getElementById('result').innerText = 'Forintban: ' + Math.round(parseFloat(sumValue * convertValue ));
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
            document.getElementById('result2').innerText = 'Forintban fizetendő még: ' + ( Math.round(parseFloat(sumValue * convertValue)) - Math.round(parseFloat(eurValue * convertValue)));
    }
        else {
            document.getElementById('result2').innerText = 'Forint visszajáró: ' + (  Math.round(parseFloat(eurValue * convertValue )) - Math.round(parseFloat(sumValue * convertValue)) );
        }
    } else {
        document.getElementById('result2').innerText = 'Helytelen eur összeg!';
    }
});

document.getElementById('myftid').addEventListener('input', function() {
    var eurValue = document.getElementById('myeurid').value;
    var ftValue = document.getElementById('myftid').value;
    var sumValue = document.getElementById('myid').value;
    sumValue = sumValue.replace(/,/g, '.');

    if ( !isNaN(sumValue) && sumValue !== '' && ( eurValue % 5 === 0 ) && !isNaN(ftValue) && ( ftValue >= 0 ) )  {
        if ( (sumValue * convertValue) >= ( ( eurValue * convertValue ) + ftValue ) )   
            document.getElementById('result2').innerText = 'Forintban fizetendő még: ' + ( Math.round(parseFloat(sumValue * convertValue)) - Math.round(parseFloat(eurValue * convertValue)));
        else {
            var sumResult = sumValue * convertValue;
            var endResult = Math.round(parseFloat((eurValue * convertValue ) + parseFloat(ftValue) - sumResult));
	    if ( isNaN(endResult) ) { 
        	document.getElementById('result2').innerText = 'Forint adat hiányzik vagy rossz, írjál 0-t, ha nincs!';
	    } else {
		endMessage = endResult < 0 ? "Forintban fizetendő még" : "Forint visszajáró";
		endResult  = endResult < 0 ? endResult = endResult * -1 : endResult;
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
