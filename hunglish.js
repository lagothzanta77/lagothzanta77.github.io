    let pointnr=0;
    let testArray=[];
    let listArray=[];
    let badList=[];
    let randNR=0;
    let testNr=0;
    let cycleCount=0;

function resetgen() {

    pointnr=0;
    testArray=[];
    listArray=[];
    badList=[];
    randNR=0;
    testNr=0;
    cycleCount=0;

}

async function loadCSV(fName) {
    const response = await fetch(fName);
    const data = await response.text();

    const rows = data.split('\n');
    const result = rows.map(row => row.split(':'));

    return result;
}

function checkInput(result, inputId, maxPoint ) {
    if ( cycleCount < testArray.length) {
	    document.getElementById('inputtest').innerHTML = result[testArray[cycleCount]][2];
	    testNr=testArray[cycleCount];
	    const inputContent = document.getElementById(inputId).value;
	    if (result[testNr][1] === inputContent) {
		pointnr++;
	        document.getElementById('outputcheck').innerHTML = 'Jó  válasz a '+(cyclecount+1)+'kérdésre';
		document.getElementById('outputcheck').style.display = 'block';
		document.getElementById('outputcheck').style.color = 'green';
        } else {
	        document.getElementById('outputcheck').innerHTML = 'Rossz válasz: '+result[testNr][1]+'- a '+(cyclecount+1)+'kérdésre';
		document.getElementById('outputcheck').style.display = 'block';
		document.getElementById('outputcheck').style.color = 'red';
	}
	resetCode();
	cycleCount++;
	if ( cycleCount < testArray.length) {
            document.getElementById('inputtest').innerHTML = result[testArray[cycleCount]][2];
	}
	else {
	        document.getElementById('scoring').innerHTML = pointnr+' /'+maxPoint+' pont ';
		document.getElementById('scoring').style.display = 'block';
		document.getElementById('scoring').style.color = 'green';
	}
    }
}

function resetCode() {
     setTimeout(() => {
	document.getElementById('outputcheck').style.display = 'none'; 
	document.getElementById('outputcheck').innerHTML = '';
	document.getElementById('myInputTest').value = '';
    }, 7000); 
}

function start(result, maxCount) {
    for (i=1;i<maxCount;i++) {
	randNr=Math.floor(Math.random() * (listArray.length));
	testArray.push(listArray[randNr]);
	listArray.splice(randNr,1);
    }
	document.getElementById('startbutton').style.display = 'none';
        document.getElementById('mainbutton').style.display = 'block';
        document.getElementById('myInputTest').style.display = 'block';
        document.getElementById('inputtest').innerHTML = result[testArray[0]][2];
}

loadCSV('wordbookae.txt').then(result => {
    resetgen();
    for (i=0;i<result.length;i++) {
	listArray.push(i);
    }
    document.getElementById('mainbutton').style.display = 'none';
    document.getElementById('myInputTest').style.display = 'none';
    document.getElementById('startbutton').onclick = () => { start(result, 10) };
    document.getElementById('mainbutton').onclick = () => { checkInput(result, 'myInputTest', 10) };
}).catch(error => {
    console.error('Error during loading of CSV!!', error);
});

