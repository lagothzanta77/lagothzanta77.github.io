"use strict";

function bigresize() {
    if ( mainresize ) {
            let myelement=document.querySelectorAll("td");
            for (let i=0;i<myelement.length;i++) {
                if ( window.innerWidth > 700 && mainresize == "smallfont" ) {
                    myelement[i].classList.remove("smallfont");
                    myelement[i].classList.add("bigfont");
                };
                if ( window.innerWidth < 700 && mainresize == "bigfont" ) {
                    myelement[i].classList.remove("bigfont");
                    myelement[i].classList.add("smallfont");
                };
            }
            ( window.innerWidth > 700 ) ? mainresize="bigfont" : mainresize="smallfont";
    };
}

function bigfriendlybutton() {
    sudokucreate();
    while (resetneed == true) {
        resetneed = false;
        resetgen();
        sudokucreate();
    }
    console.log('%c Ha mindenáron csalni szeretnél, használd a console.table(sudoku) parancsot, ha ennyire nem bírsz magaddal !!', 'color: grey; font-size:200%');
    sudokutable("mytable","myrow","mycell",false);
    sudokutable("mission","missionrow","missioncell",true);
    document.querySelector("#welcome").style.display = "none";
    document.querySelector("#potselect").style.display = "initial";
    starttime = Date.now()/1000;
    lastgoodtime = Date.now();
    newgoodtime = goodtimegen+lastgoodtime;
    maxtime += starttime;
    chargedtime = Date.now()+chargedgen;
    fillstaticnumber();
    functionfill();
};

function addclickevents() {
    if (myfocus.length == 0)  { 
        myfocus.push(this);
        myquery("select", myfocus[0].id).style.display="initial";
        myquery("span", myfocus[0].id).style.display="none";
        document.querySelector("#okbutton").disabled = true;
        if ( mycheatmode == true ) {
            let focusname=myfocus[0].id;    
            let focuscode=focusname.replace("mycell", "");
            let mymsg = myquery("span", "missioncell"+focuscode).innerHTML;
            myquery("span", "potresult").innerHTML=mymsg;
            showcheat();
        }
    };
}


function selectedcell() {
    myquery("select", myfocus[0].id).parentElement.removeEventListener("click", addclickevents);
    let mycell=myquery("select", myfocus[0].id);
    myquery("span", myfocus[0].id).innerHTML=mycell.value;
    myquery("select", myfocus[0].id).style.display="none";
    myquery("span", myfocus[0].id).style.display="initial";
    let focusname=myfocus[0].id;
    let focuscode=focusname.replace("mycell", "");
    if ( myquery("span", myfocus[0].id).innerHTML == myquery("span", "missioncell"+focuscode).innerHTML ) {
        let mydate=Date.now();
            if (mydate < newgoodtime) toosmart() ;
            lastgoodtime = mydate;
            newgoodtime = goodtimegen+lastgoodtime;
    };
    ( mycell.value == 0 ) ? myquery("span", myfocus[0].id).style.visibility="hidden" : myquery("span", myfocus[0].id).style.visibility="visible" ;
    setTimeout(function() {myquery("select", myfocus[0].id).parentElement.addEventListener("click", addclickevents);myfocus.pop(); }, 777);
    document.querySelector("#okbutton").disabled = false;
}

function chargetest() {
    let x=Math.floor(Math.random()*64);
    switch (x) {
        case 13: 
            charger();
            break;
        case 32:
            document.querySelector('#mytable').style.transform = "rotate(180deg)";
        default:
            alert(alertcharger[x]);
    }
    document.querySelector("#chargerbutton").disabled = true;
}


function potbutton() {
    document.querySelector("#okbutton").disabled = true;
    let myselect=document.querySelector("#potselector").value;
    if ( myselect == "potrequest" ) cheatmode();
    if ( myselect == "gameend" ) myend();
}
