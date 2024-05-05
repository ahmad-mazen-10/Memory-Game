let startGame = document.querySelector('.start-screen span');

startGame.onclick = () => {
    let name = prompt('What your Name');
    if (name == null || name == "") {
        alert('Write your Name متبقاش رخم ')
        let name = prompt('What your Name');
        if (name == null || name == "") {
            alert('😏 ده انت رخم');
            document.querySelector('.name span').innerHTML = 'الرخم';
        } else {
            document.querySelector('.name span').innerHTML = name;
            document.querySelector('.start-screen').remove();
        }
    } else {
        document.querySelector('.name span').innerHTML = name;
        document.querySelector('.start-screen').remove();
    }
}


let duration = 1000;
let gameBlocks = document.querySelector('.game');
let block = Array.from(gameBlocks.children);
let orderRange = Array.from(Array(block.length).keys());        //let orderRange = [...Array(block.length).keys()];

shuffle(orderRange);

block.forEach((oneBlock,index) => {
    oneBlock.style.order = orderRange[index];

    oneBlock.addEventListener('click', function () {
        flip(oneBlock);

    })
})

// shuffle function
function shuffle (array){
    let current = array.length,
        temp,
        random;
    
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        // 1- save current element in stash
        temp = array[current];

        // 2- current element = random element
        array[current] = array[random];
    
        // 3- random element = get element from stash
        array[random] = temp;
    }
    return array;
}


flip = (seletedBlock) => {
    seletedBlock.classList.add('is-flipped');
    let allFlipped = block.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if (allFlipped.length === 2) { 

        stopClicking();
        checkMatched(allFlipped[0], allFlipped[1]);
        
        allFlipped[0].querySelector('.face').classList.add('is-flipped');
        allFlipped[1].querySelector('.face').classList.add('is-flipped');
    }
}

//function stop clicking
stopClicking = () => {
    gameBlocks.classList.add('no-clicking');
    setTimeout(() => {
        gameBlocks.classList.remove('no-clicking');
    }, duration);
}

//check matched block
checkMatched = (fristBlock, secondBlock) => {
    let triesElement = document.querySelector('.tries span');

    if (fristBlock.dataset.technology === secondBlock.dataset.technology) {
        fristBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        fristBlock.classList.add('matched');
        secondBlock.classList.add('matched');

        document.getElementById('win').play();
    } else {
        triesElement.innerHTML = +triesElement.innerHTML + 1;

        setTimeout(() => {
            fristBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');         
        }, duration)
        
        document.getElementById('game-over').play();
    }
}