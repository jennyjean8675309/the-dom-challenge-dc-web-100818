document.addEventListener("DOMContentLoaded", incrementTimer)

const counter = document.querySelector('#counter');

down = document.querySelectorAll('button')[0];
down.addEventListener('click', userDecrement);

up = document.querySelectorAll('button')[1];
up.addEventListener('click', userIncrement);

like = document.querySelectorAll('button')[2];
like.addEventListener('click', addLikes);

pause = document.querySelector('#pause');
pause.addEventListener('click', pauseGame);

comment = document.querySelectorAll('button')[4];
comment.addEventListener('click', leaveAComment);

let setTimer = setInterval(incrementTimer, 1000);

function incrementTimer() {
  let timer = Number(counter.innerText);
  counter.innerText = `${timer += 1}`
}

function userDecrement() {
  let timer = Number(counter.innerText);
  counter.innerText = `${timer - 1}`;
}

function userIncrement() {
  let timer = Number(counter.innerText);
  counter.innerText = `${timer + 1}`;
}

let likedNums = [];

function addLikes(event){
  // Use the event to grab the target, and its parents, until you reach the parent node that contains the number that is liked
  currentNum = event.target.parentElement.querySelector('#counter').innerText;
  // Create an array to store liked numbers -- this array needs to be outside of the addLikes function (which is called with an EventListener, b/c if it is not, everytime an event gets triggered, it will reset the array to [])
  if (likedNums.includes(`${currentNum}`) === false) {
    likedNums.push(currentNum);
    allLikes = document.querySelector('ul');
    likeItem = document.createElement('li');
    allLikes.appendChild(likeItem);
    likeItem.id = `num-${currentNum}`;
    likeItem.innerText = `${currentNum} has 1 like`;
  } else {
    //Now I need to increment the number of likes for this number, using it's li tag and inner HTML
    alreadyLikedNum = document.querySelector(`#num-${currentNum}`);
    currentLikes = alreadyLikedNum.innerText.split(" ")[2];
    currentLikesNum = Number(currentLikes);
    alreadyLikedNum.innerText = `${currentNum} has ${currentLikesNum += 1} likes`;
    // likesCount += 1;
  }
}

function pauseGame(event) {
  down.removeEventListener('click', userDecrement);
  up.removeEventListener('click', userIncrement);
  like.removeEventListener('click', addLikes);
  clearInterval(setTimer);
  pause.innerText = 'resume';
  pause.id = 'resume';

  resume = document.querySelector('#resume');
  resume.addEventListener('click', resumeGame);
}

function resumeGame() {
  down.addEventListener('click', userDecrement);
  up.addEventListener('click', userIncrement);
  like.addEventListener('click', addLikes);
  pause.innerText = 'pause';
  pause.id = 'pause';
  // When a user clicks pause once, everything works as expected, but when they click pause a second time, the timer increments even faster - I think this is because setInterval is then being called twice - not sure where to move it
  setInterval(incrementTimer, 1000);
}

function leaveAComment(event) {
  event.preventDefault();
  commentsDiv = document.querySelector('#list');
  newCommentNode = document.createElement('p');
  commentsDiv.appendChild(newCommentNode);
  comment = event.target.parentElement.querySelector("#comment-box");
  newCommentNode.innerText = `${comment.value}`
}
