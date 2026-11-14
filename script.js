let bounces = 0;
let newBallCost = 10;
let balls = [["red", "XS", 1]];

function addBounces() {
    for (let ball of balls) {
        bounces += ball[2];
    }
    document.getElementById("bounces").innerText = bounces;
}

function addBall() {
    if (newBallCost <= bounces) {
        bounces -= newBallCost;
        balls.push(["red", "XS", 1]);
        newBallCost = (newBallCost + 10) * 1.25;
    }
}

function upgradeBallColor(ballNum) {
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
        balls[ballNum[2]] = balls[ballNum[2]] * multiplier;
    }
}

function upgradeBallSize(ballNum) {
    let upgradeCost;
    let multiplier;
    let newSize;
    let ball = balls[ballNum];
    if (ball[1] == "XS") {
        upgradeCost = 100000;
        multipler = 1.5;
        newSize = "S";
    } else if (ball[1] == "S") {
        upgradeCost = 300000;
        multipler = 2;
        newSize = "M";
    } else if (ball[1] == "M") {
        upgradeCost = 900000;
        multipler = 2.5;
        newSize = "L";
    } else if (ball[1] == "L") {
        upgradeCost = 2700000;
        multipler = 3;
        newSize = "XL";
    } else if (ball[1] == "XL") {
        upgradeCost = 8100000;
        multipler = 4;
        newSize = "2XL";
    } else if (ball[1] == "2XL") {
        upgradeCost = 24300000;
        multipler = 5;
        newSize = "3XL";
    }
    if (ball[1] != "3XL" && bounces >= upgradeCost) {
        bounces -= upgradeCost;
        ball[1] = newSize;
        balls[ballNum[2]] = balls[ballNum[2]] * multiplier;
    }
}