//állapottér
let {sec, cog, cogPerClick, cogPerSec, skillList, employeeList, startTimestamp} = getInitialState();

const CHANGE_TYPE = {
    SKILL : "SKILL",
    EMPLOYEE : "EMPLOYEE",
    TIME : "TIME",
    COG : "COG",
    ALL : "ALL",
};

function getInitialState() {
    return {
        intervalID: setInterval(administrateTime, 200),
        startTimestamp: new Date().getTime(),
        sec:0,
        cog:0,
        cogPerClick:1,
        cogPerSec:0,
        skillList: [
        {
        skillName :"Futószalag",
        cogPerClickIncrement: 1,
        description: "Futószalag  a hatékonyabb gyártásért",
        amount: 0,
        price: 10,
        link: "./images/conveyor.png",
        },
        {
        skillName :"Fogaskerék gyártó gép",
        cogPerClickIncrement: 3,
        description: "még hatékonyabb gyártás gépesítéssel",
        amount: 0,
        price: 100,
        link: "./images/machine.png",
        },
        {
        skillName :"Robot kar",
        cogPerClickIncrement: 9,
        description: "Hidraulikus kar álltal nehezebb, erősebb fogaskerekeket készíthetünk",
        amount: 0,
        price: 250,
        link: "./images/robot_arm.png",
        },
        {
        skillName :"Droid",
        cogPerClickIncrement: 27,
        description: "Az emberi fizikum határai többé nem érvényesek",
        amount: 0,
        price: 750,
        link: "./images/droid.png",
        },
        {
        skillName :"Replikátor",
        cogPerClickIncrement: 84,
        description: "Öncélú reprodukció... más nem érdekli",
        amount: 0,
        price: 1500,
        link: "./images/replicator.png",
        },
        {
        skillName :"Robotika törvényei",
        cogPerClickIncrement: 341,
        description: "Beégetett törvények a biztonságunkért",
        amount: 0,
        price: 10000,
        link: "./images/law.png",
        },                  
        ],
        employeeList : [
            {
            employeeName: "Betanított munkás",
            cogPerSecIncrement: 1,
            employeeDescription: "Ne dolgozz. Dolgoztass!",
            amount: 0, 
            price: 20,
            employeeLink: "./images/worker.png",
            },
            {
            employeeName: "Manager",
            cogPerSecIncrement: 5,
            employeeDescription: "Összehangolva sokkal eredményesebb a munka",
            amount: 0, 
            price: 200,
            employeeLink: "./images/manager.png",
            },
            {
            employeeName: "Robot kar irányító",
            cogPerSecIncrement: 25,
            employeeDescription: "Hatékonyan működteti a legmodernebb eszközöket",
            amount: 0, 
            price: 500,
            employeeLink: "./images/Robot_arm_handler.png",
            },
            {
            employeeName: "Programozó",
            cogPerSecIncrement: 50,
            employeeDescription: "Végezzék a munkát a gépek, csak mondjuk meg nekik, hogyan",
            amount: 0, 
            price: 1500,
            employeeLink: "./images/programmer.png",
            },
            {
            employeeName: "Mesterséges intelinegcia",
            cogPerSecIncrement: 100,
            employeeDescription: "Hurrá! nem kell többet dolgoznunk!",
            amount: 0, 
            price: 3000,
            employeeLink: "./images/artificial_inteligence.png",
            },
            {
            employeeName: "Mastermind",
            cogPerSecIncrement: 666,
            employeeDescription: "A teljes világ minden gépe az irányítása alá kerül. Végünk?!",
            amount: 0, 
            price: 10000,
            employeeLink: "./images/Mastermind.png",
            },
        ],
}};

function updatePrice(price) {
    if (price < 1000) return price;
    let kValue = price/1000;
    return kValue +"K";
}

function getTimerAreaTemplate() {
    return `
    <p><strong>${ sec } másodperc</strong></p>
    `;
}

function getCogAreaTemplate() {
    return `
<p><strong>${ cog } fogaskerék</strong></p>
<p>${ cogPerClick } / klikk</p>
<p>${ cogPerSec } /másodperc</p>
    `;
}

function getSkill({ skillName, cogPerClickIncrement, description, amount, price, link }, index) {
    return `
        <tr>
           <td><p><strong>${ skillName } (${ cogPerClickIncrement } Fogaskerék/click)</strong></p>
                    <p>${ description }</p></td>
            <td class="upgrade-stats-cell">
                    <p>db ${ amount }</p>
                    <p>ár ${ updatePrice(price) }</p>
                </td>
            <td class="upgrade-icon-cell"><img src="${ link }" alt="${ skillName }" data-index="${index}" /></td>
        </tr>
        `;
}

function getEmployee({ employeeName, cogPerSecIncrement, employeeDescription, amount, price, employeeLink }, index) {
    return ` 
        <tr>
            <td class="upgrade-icon-cell"><img src="${ employeeLink }" alt="${ employeeName }" data-index="${index}"></td>
            <td class="upgrade-stats-cell">
                <p>db ${ amount }</p>
                <p>ár ${ updatePrice(price) }</p>
            </td>
            <td><p><strong>${ employeeName } (${ cogPerSecIncrement } arany/mp)</strong></p>
                <p>${ employeeDescription }</p></td>
        </tr>
        `;
}

// Clicked event listeners

function handleCogClicked(event) {
    if (event.target.dataset.enable_click === "true") {
        cog += cogPerClick;
        render(CHANGE_TYPE.COG);
}}

function handleSkillClicked(event) {
    let clickIndex = event.target.dataset.index;
    console.log(event.target);
    if (typeof clickIndex !== 'undefined') {
        let clickedskill = skillList[clickIndex];
        if (cog >= clickedskill.price) {
        cog -= clickedskill.price;
        cogPerClick += clickedskill.cogPerClickIncrement;
        clickedskill.amount += 1;
        clickedskill.price *= 2;
        render(CHANGE_TYPE.SKILL);
}
}}

function handleEmployeeClicked(event) {
    let businessIndex = event.target.dataset.index;
    console.log(businessIndex);
    if (typeof businessIndex !== 'undefined') {
        let clickedEmployee = employeeList[businessIndex];
        if (cog >= clickedEmployee.price) {
        cog -= clickedEmployee.price;
        cogPerSec += clickedEmployee.cogPerSecIncrement;
        clickedEmployee.amount += 1;
        clickedEmployee.price *= 2;
        render(CHANGE_TYPE.EMPLOYEE);
} 
}}

let skillTemplate=document.querySelector(".js-skills-tbody");
let employeeTemplate=document.querySelector(".js-employee-tbody");
let timerAreaNode=document.querySelector(".js-timer-area");
let cogAreaNode=document.querySelector(".js-cog-area");
let clickingTemplate=document.querySelector(".js-clicking-area-container");


function getListTemplate(list, getItemTemplate) {
    let html = "" ;
    
    let i = 0;
    let hideRemainingItems = false;
    do {
        let item = list[i];
        html += getItemTemplate(item, i);
        if (item.amount === 0) {
            hideRemainingItems = true;
        }
        i += 1;
    } while (i < list.length && !hideRemainingItems);
    
    return html;
}

function render(changeType = CHANGE_TYPE.ALL) {
    if (changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.TIME){
    timerAreaNode.innerHTML = getTimerAreaTemplate();
    }
    if (changeType === CHANGE_TYPE.EMPLOYEE || changeType === CHANGE_TYPE.ALL){
    document.querySelector(".js-employee-tbody").innerHTML = getListTemplate(employeeList, getEmployee);
    }
    if (changeType === CHANGE_TYPE.SKILL || changeType === CHANGE_TYPE.ALL) {
    document.querySelector(".js-skills-tbody").innerHTML = getListTemplate(skillList, getSkill);
    }
    cogAreaNode.innerHTML = getCogAreaTemplate();
    disableImageDragDrop();
}

function administrateTime() {
    let currentTimestamp = new Date().getTime();
    let elapsedTime = Math.floor((currentTimestamp - startTimestamp) / 1000);
    let rewardSeconds = elapsedTime -sec;
    if (rewardSeconds > 0) {
        cog += cogPerSec * rewardSeconds;
        sec = elapsedTime;
        render(CHANGE_TYPE.TIME);
    }
}

function disableImageDragDrop () {
    const imgList = document.querySelectorAll('img');

    for (let img of imgList) {
        img.ondragstart = () => false;
}
}

function initialize () {
    let data = getInitialState();
    sec = data.sec;
    cog = data.cog;
    cogPerClick = data.cogPerClick;
    cogPerSec = data.cogPerSec;

    clickingTemplate.addEventListener('click' , handleCogClicked);
    skillTemplate.addEventListener('click', handleSkillClicked);
    employeeTemplate.addEventListener('click', handleEmployeeClicked);
    render(CHANGE_TYPE.ALL);
}

initialize ();