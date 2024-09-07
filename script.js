let points = 0; // set points starting at 0
let pointsPerInterval = 1; // Points added each interval
let intervalTime = 1000; // Time in milliseconds (1000 ms = 1 second)



// Function to update points
function updatePoints() {
    points++;
    document.getElementById('points').textContent = points;
}

// on button click, run updatePoints to add 1
// Add event listener to the button
document.getElementById('clickButton').addEventListener('click', updatePoints);


// Function to update points
function addPointsContinuously() {
    points += pointsPerInterval; // Add pointsPerInterval to points
    document.getElementById('points').textContent = points; // Update the displayed points

}
// Start adding points every intervalTime milliseconds
setInterval(addPointsContinuously, intervalTime);

//FACTORY EXAMPLE
let factoryCost = 5; //set cost
let factoryProfit = 2; //profit per interval
let factoryCount = 0; //base factory count

function buyFactory() {
    if (points >= factoryCost) {
    points -= factoryCost; //pay for factory
    factoryCount++ //add factory
        document.getElementById('points').textContent = points;
        document.getElementById('factoryCount').textContent = factoryCount; // Update displayed factory count
    } else {
        alert('Poor!');
    }
}

function factoryProfiting() {
    points += factoryCount * factoryProfit;
    document.getElementById('points').textContent = points;
}

setInterval(factoryProfiting, intervalTime);
document.getElementById('buyFactory').addEventListener('click', buyFactory);

// LUMBER MILL
// Resources defined
let lumberCount = 0;

let lumberMillCost = 50; //set cost
let lumberMillWoodPU = 2; //lumber gain per unit collected
let lumberMillCostToCollect = 5; //cost per unit to collect
let lumberMillCount = 0; //base mill count
let lumberMillUnitPS = 1; //units added per interval upto cap
let lumberMillCap = 10; // sets lumbermillunitcap
let lumberMillPot = 0; // base mill units, goes until cap

function buyMill() {
    if (points >= lumberMillCost) {
    points -= lumberMillCost; //pay for mill
    lumberMillCount++ //add mill
        document.getElementById('points').textContent = points;
        document.getElementById('lumberMillCount').textContent = lumberMillCount; // Update displayed lumberMill count
    } else {
        alert('Poor!');
    }
}

document.getElementById('buyMill').addEventListener('click', buyMill);

function lumberMillUnitGain() {
    if (lumberMillPot <= lumberMillCap) {
        lumberMillPot += lumberMillUnitPS * lumberMillCount;
    }   
    document.getElementById('lumberMillPot').textContent = lumberMillPot;
}


setInterval(lumberMillUnitGain, intervalTime);

function collectLumber() {
    if (lumberMillPot > 0 && points >= lumberMillCostToCollect * lumberMillPot) {
        lumberCount += lumberMillPot * lumberMillWoodPU;
        points -= lumberMillPot * lumberMillCostToCollect;
        lumberMillPot = 0;
        document.getElementById('points').textContent = points;
        document.getElementById('lumberMillPot').textContent = lumberMillPot;
        document.getElementById('lumberCount').textContent = lumberCount;
    } else {
        alert('None to Collect!');
    }
}
document.getElementById('collectLumber').addEventListener('click', collectLumber);



//document.getElementById('buyFactory').addEventListener('click', buyFactory);



//SAVING -- LOADING

// Save to localStorage -- runs on window unload
function saveGame() {
    localStorage.setItem('points', points);
    localStorage.setItem('factoryCount', factoryCount);
    localStorage.setItem('lumberMillCount', lumberMillCount);
    localStorage.setItem('lumberCount', lumberCount);
    localStorage.setItem('lumberMillPot', lumberMillPot);
}

// Load from localStorage s-- runs on window load, deterims save state
// and calls save to set variable
function loadGame() {
    const savedPoints = localStorage.getItem('points');
    if (savedPoints) {
        points = parseInt(savedPoints, 10);
        document.getElementById('points').textContent = points;
    }

    const savedFactories = localStorage.getItem('factoryCount');
    if (savedFactories) {
        factoryCount = parseInt(savedFactories, 10);
        document.getElementById('factoryCount').textContent = factoryCount;
    }

    const savedMills = localStorage.getItem('lumberMillCount');
    if (savedMills) {
        lumberMillCount = parseInt(savedMills, 10);
        document.getElementById('lumberMillCount').textContent = lumberMillCount;
    }

    const savedLumberCount = localStorage.getItem('lumberCount');
    if (savedLumberCount) {
        lumberCount = parseInt(savedLumberCount, 10); // Corrected parsing of savedLumberCount
        document.getElementById('lumberCount').textContent = lumberCount;
    }

    const savedLumberMillPot = localStorage.getItem('lumberMillPot');
    if (savedLumberMillPot) {
        lumberMillPot = parseInt(savedLumberMillPot, 10);
        document.getElementById('lumberMillPot').textContent = lumberMillPot;
    }
}
// Call loadGame when the page loads
window.onload = loadGame;

// Save game when the user closes the tab or refreshes
window.onbeforeunload = saveGame;
