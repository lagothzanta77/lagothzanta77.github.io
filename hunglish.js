let pointnr=0;
let testArray=[];
let listArray=[];
let badList=[];
let randNR=0;
let testNr=0;
let cycleCount=0;
let result=[ [],[],[] ];
let badAnswers=[];
let fLists=[	"wordbookae.txt", 
		"wordbookfj.txt", 
		"wordbookkm.txt", 
		"wordbooknr.txt", 
		"workbooknew.txt" 
];

let flistCounter=0;
let maxPoint=0;

function resetgen() {

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
    result = rows.map(row => row.split(':'));

    return result;
}

function checkInput(result, inputId ) {
    if ( cycleCount < testArray.length) {
	    document.getElementById('inputtest').innerHTML = result[testArray[cycleCount]][2];
	    testNr=testArray[cycleCount];
	    const inputContent = document.getElementById(inputId).value;
	    document.getElementById(inputId).disabled=true;
	    if (result[testNr][1] === inputContent) {
		pointnr++;
	        document.getElementById('outputcheck').innerHTML = 'Jó  válasz a(z) '+(cycleCount+1)+'. kérdésre ebben a 10-es kupacban';
		document.getElementById('outputcheck').style.display = 'block';
		document.getElementById('outputcheck').style.color = 'green';
        } else {
	        document.getElementById('outputcheck').innerHTML = 'Rossz válasz: ['+result[testNr][1]+'] a(z) '+(cycleCount+1)+'. kérdésre ebben a 10-es kupacban. A te válaszod: ['+inputContent+'] volt!';
		document.getElementById('outputcheck').style.display = 'block';
		document.getElementById('outputcheck').style.color = 'red';
		badAnrNr=badAnswers.length+1;
		const tempContent=[ result[testArray[cycleCount]][2],result[testNr][1] ];
		badAnswers.push(tempContent);
	}
	resetCode();
	cycleCount++;
	document.getElementById('mainbutton').disabled=true;
	if ( cycleCount < testArray.length) {
            document.getElementById('inputtest').innerHTML = result[testArray[cycleCount]][2];
	}
	else {
	        document.getElementById('scoring').innerHTML = pointnr+' /'+maxPoint+' pont ';
		document.getElementById('scoring').style.display = 'block';
		document.getElementById('scoring').style.color = 'green';
		cycleCount=0;

		flistCounter++;
		if ( flistCounter < fLists.length ) {
		  loadCSV(fLists[flistCounter]).then(result => {
	    		resetgen();
		        for (let i=0;i<(result.length-1);i++) {
				listArray.push(i);
		        }
		        document.getElementById('mainbutton').style.display = 'none';
		        document.getElementById('repeatbutton').style.display = 'none';
		        document.getElementById('myInputTest').style.display = 'none';
			start(result, 10);
		        maxPoint=maxPoint+10;
			document.getElementById('scoring').style.display = 'none';
			document.getElementById('mainbutton').onclick = () => { checkInput(result, 'myInputTest') };
		  }).catch(error => {
		        console.error('Error during loading of CSV!!', error);
		  });
		}
		else {
		    document.getElementById('mainbutton').style.display = 'none';
		    document.getElementById('repeatbutton').style.display = 'block';
		    document.getElementById('inputtest').innerHTML = badAnswers[0][0];
		}
	}
    }
}

function repeater(badAnswers,inputId) {
    if ( cycleCount < badAnswers.length) {
	    document.getElementById('inputtest').innerHTML = badAnswers[cycleCount][0];
	    testNr=badAnswers[cycleCount];
	    const inputContent = document.getElementById(inputId).value;
	    document.getElementById(inputId).disabled=true;
	    if (testNr[1] === inputContent) {
		badAnswers.splice(cycleCount,1);
	        document.getElementById('outputcheck').innerHTML = 'Jó  válasz a kérdésre';
		document.getElementById('outputcheck').style.display = 'block';
		document.getElementById('outputcheck').style.color = 'green';
        } else {
	        document.getElementById('outputcheck').innerHTML = 'Rossz válasz: ['+testNr[1]+'] a  kérdésre';
		document.getElementById('outputcheck').style.display = 'block';
		document.getElementById('outputcheck').style.color = 'red';
	}
	resetCode();
	cycleCount++;
	document.getElementById('repeatbutton').disabled=true;
	if ( cycleCount < badAnswers.length) {
	    document.getElementById('inputtest').innerHTML = badAnswers[cycleCount][0];
	}
	else {
	    if ( badAnswers.length > 0 ) {
		cycleCount=0;
	        document.getElementById('inputtest').innerHTML = badAnswers[cycleCount][0];
	    } else {
		document.getElementById('inputtest').innerHTML = 'Done!';
		document.getElementById('repeatbutton').style.display = 'none';
		document.getElementById('myInputTest').style.display = 'none';
	    }
	}
    }
}


function resetCode() {
     setTimeout(() => {
	document.getElementById('outputcheck').style.display = 'none'; 
	document.getElementById('outputcheck').innerHTML = '';
	document.getElementById('myInputTest').value = '';
	document.getElementById('mainbutton').disabled=false;
	document.getElementById('repeatbutton').disabled=false;
        document.getElementById('myInputTest').disabled=false;
        document.getElementById('myInputTest').focus();
    }, 3500); 
}

function start(result, maxCount) {
    for (let i=1;i<=maxCount;i++) {
	randNr=Math.floor(Math.random() * (listArray.length));
	testArray.push(listArray[randNr]);
	listArray.splice(randNr,1);
    }
	document.getElementById('startbutton').style.display = 'none';
        document.getElementById('mainbutton').style.display = 'block';
        document.getElementById('myInputTest').style.display = 'block';
        document.getElementById('inputtest').innerHTML = result[testArray[0]][2];
}

loadCSV(fLists[0]).then(result => {
    for (let i=0;i<(result.length-1);i++) {
	listArray.push(i);
    }
    document.getElementById('mainbutton').style.display = 'none';
    document.getElementById('repeatbutton').style.display = 'none';
    document.getElementById('myInputTest').style.display = 'none';
    document.getElementById('startbutton').onclick = () => { start(result, 10) };
    document.getElementById('repeatbutton').onclick = () => { repeater(badAnswers,'myInputTest') };
    maxPoint=maxPoint+10;
    document.getElementById('mainbutton').onclick = () => { checkInput(result, 'myInputTest') };
}).catch(error => {
    console.error('Error during loading of CSV!!', error);
});

loadCSV("changelog-hunglish.txt").then(result => {
    chlogHtml = '<br><br><b>Auto-generated Changelog (last 5 changes): </b><br>';
    for (let i=0;i<result.length;i++) {
	chlogHtml=chlogHtml+result[i]+'<br>';
    }
    console.log(chlogHtml);
    document.getElementById('devops').innerHTML = chlogHtml;
}).catch(error => {
    console.error('Error during loading of devops changelog!!', error);
});
