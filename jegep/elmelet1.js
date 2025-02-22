let fLists=[ "./jedefs.txt" ];
let listArray=[];
let testArray=[];
let defArray=[];
let solutionArray=[];
let orderdef=[];
let ordersol=[];
let numbers = [ 0, 1, 2, 3, 4 ];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function loadCSV(fName) {
    const response = await fetch(fName);
    const data = await response.text();

    const rows = data.split('\n');
    result = rows.map(row => row.split(':'));

    return result;
}

function fillOption(mainselect,mainArray,orderArray) {
     let selectElement = document.getElementById(mainselect);
     for (let i = 0; i < testArray.length; i++) {
        let option = document.createElement("option");
        option.value = orderArray[i];
        option.textContent = mainArray[orderArray[i]];
        selectElement.appendChild(option);
    }
}

loadCSV(fLists[0]).then(result => {
    for (let i=0;i<(result.length-1);i++) {
        listArray.push(i);
    }
    for (let i=0;i<5;i++) {
        randNr=Math.floor(Math.random() * listArray.length);
        testArray.push(listArray[randNr]);
        listArray.splice(randNr,1);
    }
    orderdef=shuffleArray(numbers.slice());
    ordersol=shuffleArray(numbers.slice());
    for (let i=0;i<(testArray.length);i++) {
        defArray.push(result[testArray[i]][0]);
        solutionArray.push(result[testArray[i]][1]);
    }
    fillOption("deflist",defArray,orderdef);
    fillOption("sollist",solutionArray,ordersol);
    document.querySelector('span[data-name="result"]').style.fontSize = '30px';
    document.querySelector('span[data-name="result"]').style.fontWeight = 'bold';
    document.getElementById('okbutton').onclick = () => { checkInput() };
}).catch(error => {
    console.error('Error during loading of CSV!!', error);
});

function checkInput() {
    if ( deflist.value == sollist.value ) {
        resetCode();
        document.querySelector('span[data-name="result"]').style.color = 'green';
        document.querySelector('span[data-name="result"]').textContent="\u2713";
        let selectElement = document.getElementById("deflist");
        let defElement = document.getElementById("sollist");
        let options = selectElement.options;
        let defOptions = defElement.options;
        for (let i = 0; i < options.length; i++) {
        if ( options[i].value === deflist.value ) {
            selectElement.removeChild(options[i]);
            break;
            }
        }
        for (let i = 0; i < defOptions.length; i++) {
        if ( defOptions[i].value === sollist.value ) {
            defElement.removeChild(defOptions[i]);
            break;
            }
        }
    }
    else {
        resetCode();
        document.querySelector('span[data-name="result"]').style.color = 'red';
        document.querySelector('span[data-name="result"]').textContent="X";        
    }
}

function resetCode() {
     setTimeout(() => {
	document.querySelector('span[data-name="result"]').style.color = 'black';
	document.querySelector('span[data-name="result"]').textContent="";
    }, 2200); 
}
