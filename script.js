let bounces = 0;
let newBallCost = 10;
let balls = [["red", "XS", 1]];

function addBounces() {
    for (let ball of balls) {
        bounces += Math.floor(ball[2]);
    }
    document.getElementById("bounces").innerText = bounces;
    document.getElementById("balls").innerText = balls.length;
}

function addBall() {
    if (newBallCost <= bounces && balls.length < 10) {
        bounces -= newBallCost;
        balls.push(["red", "XS", 1]);
        newBallCost = Math.floor((newBallCost + 10) * 1.25);
    }
    document.getElementById("bounces").innerText = bounces;
    document.getElementById("balls").innerText = balls.length;
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
    if (ball[0] != "black" && bounces >= upgradeCost) {
        bounces -= upgradeCost;
        ball[0] = newColor;
        ball[2] = ball[2] * multiplier;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
    }
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
    if (ball[1] != "3XL" && bounces >= upgradeCost) {
        bounces -= upgradeCost;
        ball[1] = newSize;
        ball[2] = ball[2] * multiplier;
        document.getElementById("bounces").innerText = bounces;
        document.getElementById("balls").innerText = balls.length;
    }
}

addBounces();
setInterval(addBounces, 1000);