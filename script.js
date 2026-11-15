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
let maxBalls = 10;
let brokenBouncfinity = false;
let davenBalls = [];
let davenBallCost = 100;
let achievements = [false, false, false, false, false, false, false, false, false, false, false, 0];
const numberOfAchievements = 11;
const maxDavenBalls = 10;
const sizeMap = {
    "XS": "25px",
    "S": "32px",
    "M": "40px",
    "L": "48px",
    "XL": "56px",
    "2XL": "64px",
    "3XL": "72px"
};
const davenImageMap = {
    "normal": "normaldaven.png",
    "bronze": "bronzedaven.png",
    "silver": "silverdaven.png",
    "gold": "goldendaven.png",
    "shiny": "shinydaven.png",
    "royal": "royaldaven.png",
    "cosmic": "cosmicdaven.png"
};
const container = document.getElementById("ball-display");

function addBounces() {
    let allBlack = true;
    let all3XLs = true;
    for (let ball of balls) {
        bounces += Math.floor(ball[2] * βPbounceGain);
        if (ball[0] == "black" && allBlack) {
            allBlack = true;
        } else {
            allBlack = false;
        }
        if (ball[1] == "3XL" && all3XLs) {
            all3XLs = true;
        } else {
            all3XLs = false;
        }
    }
    if (balls.length >= 10) {
        achievements[1] = true;
        achievements[numberOfAchievements]++;
    }
    if (allBlack && balls.length >= 10) {
        achievements[5] = true;
        achievements[numberOfAchievements]++;
    }
    if (all3XLs && allBlack && balls.length >= 10) {
        achievements[9] = true;
        achievements[numberOfAchievements]++;
    }
    document.getElementById("bounces").innerText = bounces;
    document.getElementById("balls").innerText = balls.length;
    saveGame();
}

function addBall() {
    if (newBallCost <= bounces && balls.length < maxBalls) {
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
    if (localStorage.getItem('maxBalls') !== null) maxBalls = parseInt(localStorage.getItem('maxBalls'));
    if (localStorage.getItem('brokenBouncfinity') !== null) brokenBouncfinity = JSON.parse(localStorage.getItem('brokenBouncfinity'));
    if (localStorage.getItem('davenBalls') !== null) davenBalls = JSON.parse(localStorage.getItem('davenBalls'));
    if (localStorage.getItem('davenBallCost') !== null) davenBallCost = parseInt(localStorage.getItem('davenBallCost'));
    if (localStorage.getItem('achievements') !== null) achievements = JSON.parse(localStorage.getItem('achievements'));
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
    localStorage.setItem('maxBalls', maxBalls);
    localStorage.setItem('brokenBouncfinity', JSON.stringify(brokenBouncfinity));
    localStorage.setItem('davenBalls', JSON.stringify(davenBalls));
    localStorage.setItem('davenBallCost', JSON.stringify(davenBallCost));
    localStorage.setItem('maxDavenBalls', maxDavenBalls);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    updateAchievements();
}

function updateUI() {
    const bouncesEl = document.getElementById("bounces");
    const ballsEl = document.getElementById("balls");
    const bouncfinitiesEl = document.getElementById("bouncfinities");
    const betaPEl = document.getElementById("βp");
    if (bouncesEl) bouncesEl.innerText = bounces;
    if (ballsEl) ballsEl.innerText = balls.length;
    if (bouncfinitiesEl) bouncfinitiesEl.innerText = numberOfBouncfinities;
    if (betaPEl) betaPEl.innerText = βP;
}

function upgradeBallColor() {
    let input = prompt(`Enter ball number to upgrade color (1 to ${balls.length}):`);
    if (input === null) return;
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
        if (newColor == "yellow" && !achievements[0]) {
            achievements[0] = true;
            achievements[numberOfAchievements]++;
        } else if (newColor == "blue" && !achievements[2]) {
            achievements[2] = true;
            achievements[numberOfAchievements]++;
        } else if (newColor == "white" && !achievements[3]) {
            achievements[3] = true;
            achievements[numberOfAchievements]++;
        } else if (newColor == "black" && !achievements[4]) {
           achievements[4] = true;
           achievements[numberOfAchievements]++;
        }
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
        if (newSize == "L" && !achievements[6]) {
            achievements[6] = true;
            achievements[numberOfAchievements]++;
        } else if (newSize == "XL" && !achievements[7]) {
            achievements[7] = true;
            achievements[numberOfAchievements]++;
        } else if (newSize == "3XL" && !achievements[8]) {
            achievements[8] = true;
            achievements[numberOfAchievements]++;
        }
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        renderBalls();
    }
    saveGame();
}

function checkForBouncfinity() {
    breakBouncfinity();
    if (bounces >= 2 ** 37 && !brokenBouncfinity) {
        numberOfBouncfinities++;
        bounces = 0;
        balls = [["red", "XS", 1]];
        newBallCost = 10;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        renderBalls()
        βP += βPperβ;
        if (βPchallenges[0] == "IP") {
            βPchallenges[0] = "F";
        } else if (βPchallenges[1] == "IP") {
            βPchallenges[1] = "F";
        } else if (βPchallenges[2] == "IP") {
            βPchallenges[2] = "F";
        }
        if (!achievements[10]) {
            achievements[10] = true;
        }
    } else if (bounces >= 2 ** 37 && brokenBouncfinity) {
        numberOfBouncfinities++;
        let x = Math.floor(Math.log2(bounces) - 37);
        if (x < 0) {
            x = 0;
        }
        bounces = 0;
        balls = [["red", "XS", 1]];
        newBallCost = 10;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
        renderBalls()
        βP += (βPperβ * (2**x));
        if (βPchallenges[0] == "IP") {
            βPchallenges[0] = "F";
        } else if (βPchallenges[1] == "IP") {
            βPchallenges[1] = "F";
        } else if (βPchallenges[2] == "IP") {
            βPchallenges[2] = "F";
        }
        if (!achievements[10]) {
            achievements[10] = true;
        }
    }
    updateUI();
    saveGame();
}

function βPupgrade(upgradeNum) {
    if (upgradeNum == 0 && βPupgradecost[0] <= βp) {
        βp -= βPupgradecost[0];
        βPbounceGain += 0.1;
        βPupgradecost[0] = (βPupgradecost[0] * 3) - 1;
    } else if (upgradeNum == 1 && βPupgradecost[1] <= βp) {
        βp -= βPupgradecost[1];
        βPbounceSpeed += 0.1;
        βPupgradecost[1] = (βPupgradecost[1] * 3) - 1;
    } else if (upgradeNum == 2 && βPupgradecost[2] <= βp) {
        βp -= βPupgradecost[2];
        βPperβ += 1;
        βPupgradecost[2] = (βPupgradecost[2] * 3) - 1;
    }
    saveGame();
}

function renderBalls() {
    const container = document.getElementById("ball-display");
    if (!container) return;
    container.innerHTML = "";
    balls.forEach((ball, index) => {
        const li = document.createElement("li");
        li.style.backgroundColor = ball[0];
        li.style.width = sizeMap[ball[1]];
        li.style.height = sizeMap[ball[1]];
        li.style.animationDelay = `${index * 0.2}s`;
        container.appendChild(li);
    });
    saveGame();
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

function breakBouncfinity() {
    if (βP >= 1000000 && βPchallenges[0] === "F" && βPchallenges[1] === "F" && βPchallenges[2] === "F") {
        maxBalls = 12;
        brokenBouncfinity = true;
    }
    renderBalls();
}

function buyDavenBall() {
    if (βP >= davenBallCost && davenBalls.length < maxDavenBalls) {
        βP -= davenBallCost;
        davenBalls.push({"normal", 1}); 
        davenBallCost = Math.floor(davenBallCost * 2.5);
        updateUI();
        renderDavenBalls();
        saveGame();
    }
}

function updateAchievements() {
    if (achievements[0]) {
        document.getElementById("achievement1").innerText = "✓";
    }
    if (achievements[1]) {
        document.getElementById("achievement2").innerText = "✓";
    }
    if (achievements[2]) {
        document.getElementById("achievement3").innerText = "✓";
    }
    if (achievements[3]) {
        document.getElementById("achievement4").innerText = "✓";
    }
    if (achievements[4]) {
        document.getElementById("achievement5").innerText = "✓";
    }
    if (achievements[5]) {
        document.getElementById("achievement6").innerText = "✓";
    }
    if (achievements[6]) {
        document.getElementById("achievement7").innerText = "✓";
    }
    if (achievements[7]) {
        document.getElementById("achievement8").innerText = "✓";
    }
    if (achievements[8]) {
        document.getElementById("achievement9").innerText = "✓";
    }
    if (achievements[9]) {
        document.getElementById("achievement10").innerText = "✓";
    }
    if (achievements[10]) {
        document.getElementById("achievement11").innerText = "✓";
    }
    document.getElementById("achievementsDone").innerText = achievements[numberOfAchievements]
    updateUI();
    renderBalls();
    saveGame();
}

function resetProgress() {
    let input = prompt(`Enter "I understand" if you agree to reset your progress:`);
    if (input == "I understand") {
        localStorage.clear();
        loadGame();
    } else {
        return;
    }
}

function renderDavenBalls() {
    const container = document.getElementById("daven-ball-display");
    const countEl = document.getElementById("daven-balls");
    if (countEl) countEl.innerText = davenBalls.length;
    if (!container) return;
    container.innerHTML = "";
    davenBalls.forEach((daven, index) => {
        const li = document.createElement("li");
        li.style.backgroundImage = `url('${davenImageMap[daven.rank]}')`;
        li.style.backgroundSize = "cover";
        li.style.backgroundPosition = "center";
        li.style.width = "50px";
        li.style.height = "50px";
        li.style.borderRadius = "50%";
        li.style.animationDelay = `${index * 0.2}s`;
        container.appendChild(li);
    });
}

loadGame();
updateUI();
renderBalls();
renderDavenBalls();
addBounces();
setInterval(addBounces, 1000 * βPchallenge1 / βPbounceSpeed);