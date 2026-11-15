let bounces = 0;
let newBallCost = 10;
let balls = [["red", "XS", 1]];
let numberOfBouncfinities = 0;
let βP = 0;
let βPperβ = 1;
let βPupgradecost = [1, 3, 5];
let βPbounceGain = 1;
let βPbounceSpeed = 1;
let βPchallenges = ["NS", "NS", "NS"]
let βPchallenge1 = 1;
let βPchallenge2 = false;
let βPchallenge3 = false;
const sizeMap = {
    "XS": "25px",
    "S": "32px",
    "M": "40px",
    "L": "48px",
    "XL": "56px",
    "2XL": "64px",
    "3XL": "72px"
};
const container = document.getElementById("ball-display");

function addBounces() {
    for (let ball of balls) {
        bounces += Math.floor(ball[2] * βPbounceGain);
    }
    document.getElementById("bounces").innerText = bounces;
    document.getElementById("balls").innerText = balls.length;
    saveGame();
}

function addBall() {
    if (newBallCost <= bounces && balls.length < 10) {
        bounces -= newBallCost;
        balls.push(["red", "XS", 1]);
        newBallCost = Math.floor((newBallCost + 10) * 1.25);
    }
    document.getElementById("bounces").innerText = bounces;
    document.getElementById("balls").innerText = balls.length;
    renderBalls();
    saveGame();
}

function loadGame() {
    if (localStorage.getItem('bounces') !== null) bounces = parseInt(localStorage.getItem('bounces'));
    if (localStorage.getItem('newBallCost') !== null) newBallCost = parseInt(localStorage.getItem('newBallCost'));
    if (localStorage.getItem('balls') !== null) balls = JSON.parse(localStorage.getItem('balls'));
    if (localStorage.getItem('numberOfBouncfinities') !== null) numberOfBouncfinities = parseInt(localStorage.getItem('numberOfBouncfinities'));
    if (localStorage.getItem('βP') !== null) βP = parseInt(localStorage.getItem('βP'));
    if (localStorage.getItem('βPperβ') !== null) βPperβ = parseInt(localStorage.getItem('βPperβ'));
    if (localStorage.getItem('βPupgradecost') !== null) βPupgradecost = JSON.parse(localStorage.getItem('βPupgradecost'));
    if (localStorage.getItem('βPbounceGain') !== null) βPbounceGain = parseFloat(localStorage.getItem('βPbounceGain'));
    if (localStorage.getItem('βPbounceSpeed') !== null) βPbounceSpeed = parseFloat(localStorage.getItem('βPbounceSpeed'));
    if (localStorage.getItem('βPchallenges') !== null) βPchallenges = JSON.parse(localStorage.getItem('βPchallenges'));
    if (localStorage.getItem('βPchallenge1') !== null) βPchallenge1 = parseInt(localStorage.getItem('βPchallenge1'));
    if (localStorage.getItem('βPchallenge2') !== null) βPchallenge2 = JSON.parse(localStorage.getItem('βPchallenge2'));
    if (localStorage.getItem('βPchallenge3') !== null) βPchallenge3 = JSON.parse(localStorage.getItem('βPchallenge3'));
}

function saveGame() {
    localStorage.setItem('bounces', bounces);
    localStorage.setItem('newBallCost', newBallCost);
    localStorage.setItem('balls', JSON.stringify(balls));
    localStorage.setItem('numberOfBouncfinities', numberOfBouncfinities);
    localStorage.setItem('βP', βP);
    localStorage.setItem('βPperβ', βPperβ);
    localStorage.setItem('βPupgradecost', JSON.stringify(βPupgradecost));
    localStorage.setItem('βPbounceGain', βPbounceGain);
    localStorage.setItem('βPbounceSpeed', βPbounceSpeed);
    localStorage.setItem('βPchallenges', JSON.stringify(βPchallenges));
    localStorage.setItem('βPchallenge1', βPchallenge1);
    localStorage.setItem('βPchallenge2', βPchallenge2);
    localStorage.setItem('βPchallenge3', βPchallenge3);
}

function updateUI() {
    const bouncesEl = document.getElementById("bounces");
    const ballsEl = document.getElementById("balls");
    const bouncfinitiesEl = document.getElementById("bouncfinities");
    const betaPEl = document.getElementById("βp");0
    if (bouncesEl) bouncesEl.innerText = bounces;
    if (ballsEl) ballsEl.innerText = balls.length;
    if (bouncfinitiesEl) bouncfinitiesEl.innerText = numberOfBouncfinities;
    if (betaPEl) betaPEl.innerText = βP;
}

function upgradeBallColor() {
    let input = prompt(`Enter ball number to upgrade color (1 to ${balls.length}):`);
    if (input === null) return; // Cancelled
    let ballNum = parseInt(input) - 1;
    if (isNaN(ballNum) || ballNum < 0 || ballNum >= balls.length) {
        alert("Invalid ball number!");
        return;
    }
    let upgradeCost;
    let multiplier;
    let newColor;
    let ball = balls[ballNum];
    if (ball[0] == "red") {
        upgradeCost = 10;
        multiplier = 2;
        newColor = "orange";
    } else if (ball[0] == "orange") {
        upgradeCost = 100;
        multiplier = 3;
        newColor = "yellow";
    } else if (ball[0] == "yellow") {
        upgradeCost = 1000;
        multiplier = 5;
        newColor = "green";
    } else if (ball[0] == "green") {
        upgradeCost = 5000;
        multiplier = 7;
        newColor = "blue";
    } else if (ball[0] == "blue") {
        upgradeCost = 10000;
        multiplier = 10;
        newColor = "purple";
    } else if (ball[0] == "purple") {
        upgradeCost = 25000;
        multiplier = 15;
        newColor = "white";
    } else {
        upgradeCost = 50000;
        multiplier = 20;
        newColor = "black";
    }
    if (ball[0] != "black" && bounces >= upgradeCost && (!βPchallenge2 || !(ball[0] == "purple" || ball[0] == "white"))) {
        bounces -= upgradeCost;
        ball[0] = newColor;
        ball[2] = ball[2] * multiplier;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        renderBalls();
    }
    saveGame();
}

function upgradeBallSize() {
    let input = prompt(`Enter ball number to upgrade size (1 to ${balls.length}):`);
    if (input === null) return; 
    let ballNum = parseInt(input) - 1; // Convert to 0-indexed array position
    if (isNaN(ballNum) || ballNum < 0 || ballNum >= balls.length) {
        alert("Invalid ball number!");
        return;
    }
    let upgradeCost;
    let multiplier;
    let newSize;
    let ball = balls[ballNum];
    if (ball[1] == "XS") {
        upgradeCost = 100000;
        multiplier = 1.5;
        newSize = "S";
    } else if (ball[1] == "S") {
        upgradeCost = 300000;
        multiplier = 2;
        newSize = "M";
    } else if (ball[1] == "M") {
        upgradeCost = 900000;
        multiplier = 2.5;
        newSize = "L";
    } else if (ball[1] == "L") {
        upgradeCost = 2700000;
        multiplier = 3;
        newSize = "XL";
    } else if (ball[1] == "XL") {
        upgradeCost = 8100000;
        multiplier = 4;
        newSize = "2XL";
    } else if (ball[1] == "2XL") {
        upgradeCost = 24300000;
        multiplier = 5;
        newSize = "3XL";
    } 
    if (ball[1] != "3XL" && bounces >= upgradeCost && (!βPchallenge2 || !(ball[1] == "2XL"))) {
        bounces -= upgradeCost;
        ball[1] = newSize;
        ball[2] = ball[2] * multiplier;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        renderBalls();
    }
    saveGame();
}

function checkForBouncfinity() {
    if (bounces >= 2 ** 37) {
        numberOfBouncfinities++;
        bounces = 0;
        balls = [["red", "XS", 1]];
        newBallCost = 10;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        βP += βPperβ
    }
    saveGame();
}

function βPupgrade(upgradeNum) {
    if (upgradeNum == 0 && βPupgradecost[0] <= βP) {
        βPbounceGain += 0.1;
        βPupgradecost[0] = (βPupgradecost[0] * 3) - 1;
    } else if (upgradeNum == 1 && βPupgradecost[1] <= βP) {
        βPbounceSpeed += 0.1;
        βPupgradecost[1] = (βPupgradecost[1] * 3) - 1;
    } else if (upgradeNum == 2 && βPupgradecost[2] <= βP) {
        βPperβ += 1;
        βPupgradecost[2] = (βPupgradecost[2] * 3) - 1;
    }
    saveGame();
}

function renderBalls() {
    const container = document.getElementById("ball-display");
    container.innerHTML = "";
    balls.forEach((ball, index) => {
        const li = document.createElement("li");
        li.style.backgroundColor = ball[0];
        li.style.width = sizeMap[ball[1]];
        li.style.height = sizeMap[ball[1]];
        li.style.animationDelay = `${index * 0.2}s`;
        container.appendChild(li);
    });
}

function doβchallenge() {
    if (βPchallenges[0] == "NS" && numberOfBouncfinities > 0) {
        βPchallenge1 = 2;
        βPchallenges[0] = "IP";
    } else if (βPchallenges[1] == "NS" && βPchallenges[0] == "F") {
        // Not finished working on
        βPchallenge2 = true;
        βPchallenges[1] = "IP";
    } else if (βPchallenges[2] == "NS" && βPchallenges[1] == "F") {
        // Not finished working on
        βPchallenge3 = true;
        βPchallenges[2] = "IP";
    }
    saveGame();
}

addBounces();
loadGame();
updateUI();
renderBalls();
setInterval(addBounces, 1000 * βPchallenge1);