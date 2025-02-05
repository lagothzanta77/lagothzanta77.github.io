convertValue=400;

document.getElementById('myid').addEventListener('input', function() {
    var sumValue = document.getElementById('myid').value;
    sumValue = sumValue.replace(/,/g, '.');
    if (!isNaN(sumValue) && sumValue !== '') {
        document.getElementById('result').innerText = 'Forintban: ' + Math.round(parseFloat(sumValue * convertValue ));
    } else {
        document.getElementById('result').innerText = 'Kérlek, adj meg egy számot!';
    }
});

document.getElementById('myeurid').addEventListener('input', function() {
    var eurValue = document.getElementById('myeurid').value;
    var ftValue2 = document.getElementById('myftid').value;
    var sumValue = document.getElementById('myid').value;
    sumValue = sumValue.replace(/,/g, '.');
    
    if (!isNaN(sumValue) && sumValue !== '' && ( eurValue % 5 === 0 ) )  {
        if ( sumValue * convertValue >= eurValue * convertValue ) {  
            document.getElementById('result2').innerText = 'Forintban fizetendő még: ' + ( Math.round(parseFloat(sumValue * convertValue)) - Math.round(parseFloat(eurValue * convertValue)));
    }
        else {
            document.getElementById('result2').innerText = 'Forint visszajáró: ' + (  Math.round(parseFloat(eurValue * convertValue )) - Math.round(parseFloat(sumValue * convertValue)) );
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
    
    if (!isNaN(sumValue) && sumValue !== '' && ( eurValue % 5 === 0 ) && !isNaN(ftValue) )  {
        if ( sumValue * convertValue >= ( ( eurValue * convertValue ) + ftValue ) )   
            document.getElementById('result2').innerText = 'Forintban fizetendő még: ' + ( Math.round(parseFloat(sumValue * convertValue)) - Math.round(parseFloat(eurValue * convertValue)));
        else {
            var sumResult = sumValue * convertValue;
            var endResult = (eurValue * convertValue ) + parseFloat(ftValue) - sumResult;
            document.getElementById('result2').innerText = 'Forint visszajáró: ' + endResult;
        }
    } else {
        document.getElementById('result2').innerText = 'Helytelen eur!';
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
