"use strict";

// global variable section

let mainresize;
let sudoku = [];
let dencol = [ [], [], [], [], [] , [], [], [], [] ];
let densqr = [ [] , [], [] ];
let denrow = [];
let nextnum;
let denied = [];
let crashpos = 0;
let resetneed = false;
let staticlist = [];

let taxbase=0;
let maxtime=60*60*30;
let cheatercount = 0;
let starttime;
let gamescore;
let lastgoodtime;
const goodtimegen=Math.floor(Math.random()*3000)+3700;
let newgoodtime;
const chargedgen=Math.floor(Math.random()*180000)+120000;
let chargedtime;

let myfocus=[];

let mycheatmode=false;


// sudoku section

// first row

function maingen() {
            let rowone = [];
            let generator=[1, 2, 3, 4, 5, 6, 7, 8, 9];
            do {
                rowone.push(generator[Math.floor(Math.random()*(generator.length))])
                   for (let i=0;i<generator.length;i++) {                                    
                       if ( rowone[(rowone.length-1)] == generator[i] ) generator.splice(i , 1);
                   };
            }
            while ( generator.length > 0 );
            return rowone;
};

// random number generator except forbidden numbers

function rownumber(forbidden) {
            let rowone;
            let generator=[1, 2, 3, 4, 5, 6, 7, 8, 9];
                for (let i=0;i<forbidden.length;i++) {                        
                    for (let j=0;j<generator.length;j++) {
                        if  ( forbidden[i] == generator[j] ) generator.splice(j , 1);
                    }
                };
            rowone=generator[Math.floor(Math.random()*(generator.length))];
            return rowone;    
};

// creating list of forbidden numbers in a column

function dencolgen(rownum) {
    for (let i=0;i<9;i++) {
        dencol[i].push(sudoku[rownum-1][i]);
    }
};

// creating list of forbidden numbers in a square / 3*3 /

function densqrgen(rownum) {
    if ( rownum % 3 == 0 ) densqr = [ [] , [], [] ]; else {
            for (let j=0;j<3;j++) {
                for (let i=0;i<3;i++) {
                    densqr[j].push(sudoku[rownum-1][j*3+i]);
                };
            }
        };
};

// creating forbidden numbers' list

function denygen(rownum, colnum) {
    denied = [];
    for (let i=0;i<rownum;i++) {
        denied.push(dencol[colnum][i]);
    };
    if ( rownum % 3 > 0 ) { 
        for (let i=0;i<densqr[(rownum % 3)-1].length;i++) {
            denied.push(densqr[Math.floor(colnum / 3)][i]);
        }
    };
    for (let i=0;i<denrow.length;i++) {
        denied.push(denrow[i]);
    }
};

// remaining numbers in the last row

function lastnumber(colnum) {
    let generator=[ 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i=0;i<8;i++) {
        for (let j=0;j<generator.length;j++) {
           if  ( dencol[colnum][i] == generator[j] ) generator.splice(j , 1);
        };
    };
    return generator[0];
};

// preparing sudoku-reset

function resetgen() {
    dencol = [ [], [], [], [], [] , [], [], [], [] ];
    densqr = [ [] , [], [] ];
    denrow = [];
    nextnum;
    denied = [];
    crashpos = 0;
    sudoku = [];
}

// avoid endless cycle in random number generator -> max. tries in a row: 77.

function integritychecker(colnum) {
    colnum = 0;
    denrow = [];
    crashpos++;
    if (crashpos == 77) {
        resetneed = true;
        colnum = 9;
    };
    return colnum;
}

// create full sudoku table

function sudokucreate() {
    sudoku.push(maingen());
    for (let rownum=1;rownum<8;rownum++) {
        denrow = [];
        dencolgen(rownum);
        densqrgen(rownum);
        let colnum = 0;
        do  {
            denygen(rownum,colnum);
            nextnum=rownumber(denied);
            if (nextnum) { colnum++;denrow.push(nextnum)} else { colnum = integritychecker(colnum) };                       
        }
            while (colnum < 9 );
            sudoku.push(denrow);
    };
        dencolgen(8);
        denrow = [];       
        for ( let lastrow=0;lastrow<9;lastrow++ ) {
        denrow.push(lastnumber(lastrow))
        }
    sudoku.push(denrow);
    return sudoku    
}

// sudoku section end

// html section begin 

function myquery(selected,element) {
    return document.querySelector(`${selected}[data-name=${element}]`);
}

// html sudoku tables begin

function sudokutable(tablename,rowname,cellname,result) {
    let mission=document.querySelector(`#${tablename}`);
    let cellmission;
    let tr;
    let td=document.createElement("td");
    let rownum;
    let cellnum;
    for (let i=0;i<9;i++) {       
        rownum=`${rowname}`+i;
        tr=document.createElement("tr");
        tr.id=rownum;
        if (i % 3 == 0) tr.classList.add("toprow");
        mission.appendChild(tr);    
        for (let j=0;j<9;j++){
            cellmission=document.querySelector(`#${rownum}`)
            td=document.createElement("td");
            cellnum=`${cellname}`+(i*9+j);
            td.id=cellnum;
            if (window.innerWidth < 700 ) { td.classList.add("smallfont");mainresize = "smallfont" } else { td.classList.add("bigfont"); mainresize = "bigfont" };
            if (j % 3 == 0) td.classList.add("rightcol");
            cellmission.appendChild(td);
            if (result == true) {                
                td.innerHTML=`<span data-name=${td.id}></span>`;
                myquery("span", cellnum).innerHTML=sudoku[i][j];
            };
        };
    }
    if (result == true ) mission.parentElement.style.display="none";
};    

function fillstaticnumber() {
        let mainversion= [];
        let x = Math.floor(Math.random()*2);
        ( x == 1) ? mainversion = [3, 4, 3, 4, 3, 4, 3, 4, 3] : mainversion = [ 4, 3, 4, 3, 4, 3, 4, 3, 4 ];
        let generator = [];
        for (let i=0;i<9;i++) {
            generator = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ];
            for (let j=0;j<mainversion[i];j++) {
                    x = Math.floor(Math.random()*(generator.length));
                    staticlist.push(i*9+generator[x]);
                    generator.splice(x,1);
            }
        }
        let statics;
        let results;
        for (let k=0;k<staticlist.length;k++) {
            statics="mycell"+staticlist[k];
            results="missioncell"+staticlist[k];
            document.querySelector(`#${statics}`).innerHTML=`<span data-name=${statics}></span>`;
            myquery("span", statics).innerHTML=myquery("span",results).innerHTML;
            document.querySelector(`#${statics}`).style.visibility="visible";
            document.querySelector(`#${statics}`).classList.add("staticcell");
        }
}

function functionfill() {
        let generator= [];
        let mycell;
        let td;
        let staticfalse=true;
        for (let i=0;i<81;i++) {
                mycell="mycell";
                mycell+=i;
                td=document.querySelector(`#${mycell}`);
                generator=td.classList;
                staticfalse=true;
                for (let j=0;j<generator.length;j++) {
                    if ( generator[j] == "staticcell" ) staticfalse=false;
                };
                if (staticfalse == true) {
                    td.innerHTML=`<select data-name=${td.id} onchange="selectedcell()"></select><span data-name=${td.id}>0</span>`;
                    td.addEventListener("click", addclickevents );
                    myquery("span", td.id).style.visibility="hidden";                  
                    universelect(myquery("select", td.id))                                      
                }
        }
}

function universelect(element) {
    optionadd(element, "üres");
    for (let i=1;i<10;i++) {
        optionadd(element, i);
    };
    element.style.display="none";
}


function optionadd(selected, mynum) {
    let x = document.createElement("option");  
    (mynum == "üres") ? x.text = "üres" : x.text=mynum;
    (mynum == "üres") ? x.value = 0 : x.value=mynum;
    selected.appendChild(x);
}

// html sudoku tables end

// calculating score begin

function myend() {
    document.querySelector("#chargerbutton").disabled = true;
    myfocus.push("end");
    let goodgame=true;
    for (let i=0;i<81;i++) {
        if ( myquery("span", "mycell"+i).innerHTML != myquery("span", "missioncell"+i).innerHTML ) {
            myquery("span", "mycell"+i).parentElement.style.backgroundColor="yellow";
            goodgame = false;
        };
    }
    if (goodgame == false) { 
        alert("A játék sajnos nem sikerült, a megoldás hibás!\nA program megjeleníti a helyes megfejtést, és sárgával jelöli a Játékos tippjében a hibás vagy kitöltetlen mezőket");
        document.querySelector("#mission").parentElement.style.display="";
    } else myscore();
}

function myscore() {
    let mytime = Date.now()/1000;
    ( mytime > maxtime ) ? gamescore = 0 : gamescore = Math.round(108000-(mytime - starttime));
    for (let i=0;i<cheatercount;i++) cheaterscore() ;
    document.querySelector("#gameresult").innerHTML = Math.round(gamescore);
    document.querySelector("#resultgame").style.display = "initial";
    document.querySelector("#potcount").innerHTML = cheatercount;
    if (taxbase > 0) {
        taxset();
        for (let j=0;j<document.querySelectorAll(".brutto").length;j++) {
            document.querySelectorAll(".brutto")[j].style.display="initial";
        };
    };
    let x = Math.floor(Math.random()*18);
    if ( cheatercount == 0  && gamescore > 0 ) {
        if ( x == 17 ) { alert("Gratulálunk a kedves Játékosnak a Jó eredményért!\nJutalma most egy kis zenés video"); document.querySelector('body').innerHTML=(awardmsg[x]) } else 
                alert("Gratulálunk a kedves Játékosnak a Jó eredményért!\nJutalma egy véletlenszerű kis bölcsességféle\n\n"+awardmsg[x]); 
    };
}

function cheaterscore() {
    taxbase += gamescore*0.1;
    gamescore *= 0.9;   
};


function taxset() {
    let mytax = [ Math.round((taxbase*1.18)*0.175), Math.round((taxbase*1.18)*0.015) , Math.round(taxbase*0.15) , Math.round(taxbase*0.185) ];
    document.querySelector("#szocho").innerHTML = mytax[0];
    document.querySelector("#szakho").innerHTML = mytax[1];
    document.querySelector("#szja").innerHTML = mytax[2];
    document.querySelector("#tbjar").innerHTML = mytax[3];
    let nettoscore = gamescore - mytax[0] - mytax[1] - mytax[2] - mytax[3];
    document.querySelector("#netto2").innerHTML = Math.round(nettoscore);
}

// calculating score end

// html element section end


// section of unusual functions begin

function toosmart() {
        let smartcounter = Math.floor(Math.random()*3)+1;
        if (smartcounter < (staticlist.length-7)) {
            let myimg;
            let mytd;
            let x;
            for (let i=0;i<smartcounter;i++) {                
                x = Math.floor(Math.random()*(staticlist.length));
                mytd=myquery("span", "mycell"+staticlist[x]).parentElement;
                myimg = document.createElement("img");
                myimg.src="img/fy.png";
                myquery("span", "mycell"+staticlist[x]).style.display="none";
                mytd.appendChild(myimg);
                staticlist.splice(x , 1 );
            }
            alert("Figyelem!\nSzabályváltozás!!. A program önhatalmúlag ügy döntött, hogy menet közben szabályt módosít.\n A program úgy ítélte meg, hogy a Játékos emelt szinten műveli a sudoku tudományát, ezért az előre beírt számok közül egy vagy több most eltűnt.\nA program köszöni a Játékos megértését, és további sok sikert kíván!\nA program reméli, hogy a Játékos kiváló memóriával rendelkezik, és emlékszik a korábban beírt számra, vagy számokra, vagy rendelkezik biztonsági mentéssel, képernyőfotóval a korábbi állapotról!\nA program az esetlegesen eltávolított számokat nem tudja visszaállítani, a fejlesztő ugyanis elfelejtette leprogramozni a szükséges kódokat!");
        }
}

function potusable() {
    let mytime=Date.now();
    let remaintime=chargedtime-mytime;
    let chargedpos;
    ( remaintime <= 0 ) ? chargedpos = true : chargedpos = false;
    return chargedpos;
};

function charger() {
    let mytime=Date.now();
    let remaintime=Math.round((chargedtime-mytime)/1000);
    ( potusable() == false ) ? alert("POT feltöltésig hátralevő idő: " + remaintime + " másodperc!") : alert ("POT feltöltött, használható!");
}

function cheatmode() {
    document.querySelector("#potresult").style.display="initial";
    myquery("span", "potresult").innerHTML="";
    cheatercount++;
    if ( potusable() == false ) myquery("span", "potresult").innerHTML="A POT MÉG NEM TÖLTÖTT FEL !"; else {
        let x=Math.floor(Math.random()*2);
        ( x == 0 ) ? myquery("span", "potresult").innerHTML='<img src=img/fy.png>' : mycheatmode = true;
    };
    ( mycheatmode == false) ? showcheat() : alert("Játékos! Puskázási lehetőség, kattintson a puskázni kívánt mezőre!!");
}

function showcheat() {   
    mycheatmode = false;
    const myPromise = new Promise( ( resolve, reject ) => {
        setTimeout( () => {
            resolve();
        }, 7000);
    });
    myPromise.then(
        data => {document.querySelector("#potresult").style.display="none";document.querySelector("#okbutton").disabled = false;},
        err => console.log(err)
    );
}

const alertcharger = [
    "Sorry. Out of Service",
    "undefined",
    "Az Operatív Törzs sajnálattal tájékoztatja a Játékost, hogy a Töltésjelző sajnos COVID-19 fertőzés következtében elhunyt.\nA következő alapbetegségben szenvedett: fejlesztői inkompetencia",
    "Üdvözli Önt a Töltésjelző 2000 MAGYAR nyelvű telepítőprogramja\n\nA Töltésjelző 2000 megvizsgálta rendszerét, és minden tekintetben kompatiblisnek találta\n\nA Töltésjelző telepítése megkezdődik...\nTelepítés...\n\ 0%...\nHARDWARE FAILURE\n\nContact your system administrator or technical support group.",
    "0E Végzetes kivitel történt a következő címen: <ismeretlen>",
    "Alkalmazáshiba.\nTöltésjelző.exe hibát okozott a következő modulban: <ismeretlen>",
    "./Töltésjelző\nPermission denied.\nSegmentation fault.\n#.",
    "A Töltésjelző készítését ellenőrző hivatal Töltésjelző iránti igényét tudomásul vette, iktatta.\nKérésére a törvényben előírt 30 napos határidő leteltével a hivatal válaszol\nKöszönjük kérését!\n",
    "Function is not implemented",
    "A Töltésjelző alkalmazása miatt a program ellen eljárást indítottak szerzői jogok meg nem sértése miatt. Az eljárás ideje alatt a Töltésjelző működése szünetel",
    "A Töltésjelző a fejlesztő koffeinhiánya miatt jelenleg üzemképtelen. A fejlesztő nem kér elnézést a történtek miatt, inkább kávét!",
    "A Töltésjelző felújítás miatt jelenleg nem elérhető.",
    "A Töltésjelző forgalomba helyezését a hatóság Töltésjelző-terjesztésért felelős hivatala megtiltotta.",
    "13!",
    "A Töltésjelző COVID-19 tesztje pozitívnak bizonyult, így 2 hetes hatósági karanténba kényszerült. A karantén ideje alatt sajnos nem használható.",
    "Töltésjelző is not defined.",
    'Load"Töltésjelző",8,1\n\n?Syntax Error\nReady.\n.',
    "BUG: unable to handle kernel NULL pointer dereference at (nil)\n\nOops: 0000 [#1] SMP \n\nKERNEL PANIC",
    "Üdvözli önt a Töltésjelző Ügyfélszolgálata!\n\nJelenleg minden Ügyintézőnk foglalt, kérjük ismételje meg a Töltésjelző indítását később\nKöszönjük érdeklődését, Ön fontos számunkra.",
    "A Töltésjelző hatósági intézkedés miatt zárva.",
    "Töltésjelző!! HA!\nNe b*ssz* meg az árva l*f*sz!!!\nTöltésjelző DOSZT!",
    "Töltésjelző...persze...hóggyisne!!!\nKis f*sz*m nem kéne???",
    "A Töltésjelző szavatossági ideje lejárt",
    "Design Error.",
    "Unknown Error.",
    "Javascript Error.",
    "A Töltésjelző nem felel meg a legújabb szabványnak, így nem forgalmazható",
    "Tájékoztatjuk kedves Játékosunkat, hogy a Töltésjelző bizonytalan ideig, de legalább 120 percig nem közlekedik ezen a digitális útvonalon.\nA késésért szíves türelmét és megértését kérjük.",
    "Network Error",
    "A Töltésjelző illesztőprogramja nem kompatiblis a rendszerrel, kérjük frissítse.",
    "A Töltésjelző ideológiailag nem elég képzett a működéshez.",
    'A Töltésjelző indításához szükséges jelszót a fejlesztő elfelejtette.',
    "FIGYELEM!\nA Töltésjelző KAPCAVICC számítógépvírussal fertőzött.\nEz azt jelenti, hogy most KAPCAPOFÁDRA!\nA művelet eredményeképpen a sudoku tábla megszédült, és körbeforgott.Kedves Játékos most Így Jártál!",
    "A Töltésjelző IQ teszten negatív besorolást szerzett, így nem használható",
    "Töltésjelző not found",
    'A Töltésjelzőt ellopták, kérjük a szerencsés megtaláló mielőbb dobja ki a legközelebbi lomtárba, vagy /dev/null eszközbe',
    "A Töltésjelzőt jelenleg pszichiátrián kezelik kóros elmezavarral, így most nem használható",
    "Töltésjelző ist untauglich",
    "A Töltésjelzőt a vírusírtó eltávolította.",
    "A Töltésjelző szabálytalan műveletet hajtott végre és kilépett a rendszerből.",
    "A Töltésjelző indításához illetékbélyeg szükséges, kérjük pótolja, ragasszon a töltésjelzőre 0,1 bitcoin értékű illetékbélyeget, és futtassa újra a programot.",
    "A Töltésjelző részt vesz az irodai testnevelés programban!\nA következő tornagyakorlatot kell elvégeznie:\n\nÁlljon egy tükör elé, lehetőleg egyenesen, az egyik kezét a testére merőlegesen nyújtsa ki egyenesen\n(lehetőleg ne törje össze a tükröt, álljon egy kicsit hátrébb, ha nem tud kiegyenesedni, vagy a kezét nem tudja használni, nem használhatja a töltésjelzőt sem)\nA tenyerét fordítsa felfelé\nA csuklóját próbálja behajlítani maga felé ( ha az erőlködéstől remeg a keze az nem baj)\nHajlítsa be a kisújját\nHajlítsa be a mutatóújját is\nHajlítsa be a hüvelykujját is\nÉs végül a gyűrűsujját is\nNézzen a tükörbe, majd üljön vissza a gép elé, és nyomja meg az OK gombot.",
    'A Töltésjelző használatához ki kell töltenie a Töltésjelző igénylése magánszemély részére nevű formanyomtatványt, és fel kell töltenie a /dev/null eszközre',
    "A Töltésjelző a fejlesztő által kijelölt Munkaközi Szünetét tölti, melytől a törvény értelmében nem lehet eltérni",
    "Ebédidő miatt zárva",
    "Szabadság miatt zárva",
    "A Töltésjelző felszámolási eljárás alatt áll.",
    "A Töltésjelző kerékpáros közlekedés közben balesetet szenvedett, így most nem elérhető.",
    "A Töltésjelzőt nem lehet kivinni a sok gyökérnek közlekedési dugó miatt.",
    "A Töltésjelző alkoholos befolyásoltság miatt üzemképtelen",
    "A Töltésjelző készlethiány miatt nem elérhető.",
    "A Töltésjelzőt graffitivel összefestették.",
    "Nincs jel!\n\nNincs jel.Ellenőrizze a Mediabox hátoldalán, hogy a csatlakozók helyesen vannak-e beillesztve.",
    "POS kommunikációs hiba.\nHibakód -1004.\nEgyeztetés szükséges",
    "A Töltésjelző üzemben tartásáért felelős szervezet a Töltésjelző összes funkcióját visszavonta a számos helyesírási hiba miatt.",
    "A Töltésjelzőt a spanyol inkvizíció betiltotta",
    "A Töltésjelző ellen végrehajtás indult, mert nem tudott elszámolni a rendszer felé a felhasznált CPU használattal",
    "A Töltésjelző áruátvétel miatt zárva",
    "A Töltésjelző hamarosan zár, kérjük fáradjon másik kasszához!",
    "A Töltésjelző a törvény szerinti pihenőidejét tölti, így nem zavarható",
    "A Töltésjelző COVID-19 válság miatt részmunkaidőben dolgozik, próbálja holnap",
    "A Töltésjelző nagy ívben sz*rik a játékosra, és b*szik működni!",
    "Ha nincs kávé, nincs töltésjelző sem, ez van.",
    "A Töltésjelzőt munkaszolgálatra vezényelték.",
];

const awardmsg = [
    "A kapitalizmus a pénz diktatúrája",
    "Második esélyben nincs - a fejlesztő mottója",
    "Ha nem lenne ott mindannyiunkban a gonosz, akkor nem is emberek volnánk, akkor mindenki angyal lenne - Angel c. sorozatból",
    "Inkább leveszem a szemüvegemet, homályosan sokkal szebb a világ - Polip c. sorozatból",
    "A demokráciában a korrupció azt a célt szolgálja, mint az olajozás a motornak, nem lehet meglenni nélküle - Polip c. sorozatból",
    "A korrupció az, amiből kihagynak - Hofi Géza",
    "Nálatok is üzemi demokrácia van. Egyszerre szartok be - Hofi Géza",
    "Nagymama, miért olyan nagy a füled? - Hogy jobban halljalak.\nNagymama, miért olyan nagy a szemed? - Hogy jobban lássalak!\n Nagymama, miért olyan nagy az arcod? - Mert Debiant használok. - régi debian vicc.",
    "Újra temetni már tudunk, újra élni még nem. - Hofi Géza",
    "Minél jobban ismerem az embereket, annál jobban szeretem az állatokat - ismeretlen forrás",
    "A bölcs embert gyakran látod egyedül, a gyenge mindig a tömeggel megy",
    "Egy elképzelés értéke a megvalósításban van - Thomas Alva Edison",
    "Aki a legkevesebbet fizeti az alkalmazottaknak, a legkevesebbet kapja tőlük is - Malcolm Forbes",
    "Ők azért nevetnek rajtam , mert más vagyok. Én azért nevetek rajtuk, mert mind ugyanolyanok - Kurt Cobain",
    "A fiatalok tudják a szabályokat, de az öregek ismerik a kivételeket. - ismeretlen forrás",
    "Az emberek többsége nem figyel oda, csak ha veszélyt, vagy jutalmat szimatol. - ismeretlen forrás",
    "There is nothing more useless then a lock with a voiceprint\n\n (szabad fordításban: Nincs használhatatlanabb dolog, mint egy hangmintával nyílódó zár) - forrás Doctor Who sorozat.\n Ez a mondat volt a hangminta a sorozatban egy ajtózárhoz",
    '<a href="https://youtu.be/spejZVk1f5k">Kattints ide, hogy lejátszd a videót!</a>'
];

// section of unusual functions end
