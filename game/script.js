let car = document.getElementById('car');  
let container = document.getElementById('game-container');  
let scoreElement = document.getElementById('score');  
let score = 0;  

document.addEventListener('keydown', (event) => {  
    let carLeft = parseInt(window.getComputedStyle(car).getPropertyValue("left"));  
    
    if (event.key === 'ArrowLeft' && carLeft > 0) {  
        car.style.left = (carLeft - 15) + 'px'; // Move left  
    } else if (event.key === 'ArrowRight' && carLeft < 350) {  
        car.style.left = (carLeft + 15) + 'px'; // Move right  
    }  
});  

function createObstacle() {  
    const obstacle = document.createElement('div');  
    obstacle.classList.add('obstacle');  
    obstacle.style.left = Math.floor(Math.random() * 350) + 'px'; // Random position  
    container.appendChild(obstacle);  
    moveObstacle(obstacle);  
}  

function moveObstacle(obstacle) {  
    let obstacleInterval = setInterval(() => {  
        let obstacleBottom = parseInt(window.getComputedStyle(obstacle).getPropertyValue("bottom"));  
        if (obstacleBottom < 0) {  
            clearInterval(obstacleInterval);  
            obstacle.remove();  
            score++;  
            scoreElement.innerText = 'Score: ' + score;  
        } else {  
            obstacle.style.bottom = (obstacleBottom + 5) + 'px';  
            checkCollision(obstacle, obstacleInterval);  
        }  
    }, 20);  
}  

function checkCollision(obstacle, obstacleInterval) {  
    let carRect = car.getBoundingClientRect();  
    let obstacleRect = obstacle.getBoundingClientRect();  

    if (  
        carRect.x < obstacleRect.x + obstacleRect.width &&  
        carRect.x + carRect.width > obstacleRect.x &&  
        carRect.y < obstacleRect.y + obstacleRect.height &&  
        carRect.y + carRect.height > obstacleRect.y  
    ) {  
        clearInterval(obstacleInterval);  
        alert('Game Over! Your score: ' + score);  
        document.location.reload(); // Restart the game  
    }  
}  

setInterval(createObstacle, 2000); // Create an obstacle every 2 seconds  