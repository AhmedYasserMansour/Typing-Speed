let lvl = document.querySelector('.lvl');
let numberofseconds = document.querySelector('.numberofseconds');
let btn = document.querySelector('button');
let word = document.querySelector('.word');
let words = document.querySelector('.words');
let seconds = document.querySelector('.seconds');
let score = document.querySelector('.score');
let inputs = document.querySelector('.inputs');
let inputWords = document.querySelector('.inputwords');
let writeSeconds = document.querySelector('.writeseconds');
let add = document.querySelector('.add');
let controls = document.querySelector('.controls')
let nunbers = document.querySelector('.nunbers');
let normal = document.querySelector('.normal');
let deleteAll = document.querySelector('.delete-all');
let start = document.querySelector('.start');
let myWords = document.querySelector('.my-words');
let lvlSeconds = document.querySelector('.lvl-seconds');

    
let AllWords= [];
let timeLeft;
let chose;
let userWords;
let random;

const normalWords = [
    "Hello",
    "Key",
    "Computer",
    "Screen",
    "Office",
    "Television",
    "Book",
    "Magazine",
    "Picnic",
    "Restaurant",
    "Coffe",
    "Friends",
    "Party",
    "Holiday",
    "Visit",
    "Shopping",
    "Doctor",
    "Medicine",
    "Person",
    "Date",
    "Time",
    "Vacation",
    "Music",
    "Movie",
    "Sport",
    "Expenses",
    "Salary",
    "Training",
    "Airport",
    "Leave"
  ];


 function addWords() {
    userWords = inputWords.value.trim().split(' ');
    if(inputWords.value !== '') {
        if(window.localStorage.getItem('words')) {
            AllWords = [...JSON.parse(window.localStorage.getItem('words'))];
            AllWords = [...AllWords,...userWords];
            
          }else {
              AllWords = [...AllWords,...userWords];
          }
    }
    addLocal(AllWords);
 }
 if(window.localStorage.getItem('words') && JSON.parse(window.localStorage.getItem('words')).length > 0) {
    myWords.style.display = 'block';
  }
 start.addEventListener('click', ()=> {
    (document.querySelectorAll('.words div .delete')).forEach(word=>{
        word.style.display = 'none'
    });  
    inputWords.placeholder = 'Write The Word';
     startPlay();
    inputWords.style.pointerEvents= 'normal';
    start.style.display = 'none';
 })
 let checkStart = false;
 let check = false;
    controls.addEventListener('click', e =>{
            if(e.target.classList.contains('add')){
                lvlSeconds.innerHTML = 'Add Your Words'
                word.style.display = 'none';
                myWords.style.display = 'none';
                writeSeconds.style.display = 'block';
                inputWords.placeholder = 'Add Your Words';
                if(checkStart) {
                    addWords();
                    add.style.display = 'none';
                    myWords.style.display = 'block'
                    words.style.display = 'none';
                    writeSeconds.style.display = 'none';
                    inputWords.style.width = '100%';
                    lvlSeconds.style.display = 'none';
                    inputWords.placeholder = 'Press My Words';
                    timeLeft = +(writeSeconds.value)
                    window.localStorage.setItem('seconds',timeLeft);
                    seconds.innerHTML = timeLeft;
                    inputWords.value = '';
                    writeSeconds.value = '';
                }
                inputWords.focus();
                add.style.cursor= 'no-drop';
                add.setAttribute('disabled', true);
                inputs.addEventListener('input', e => {
                   if(e.target.classList.contains('inputwords') || e.target.classList.contains('writeseconds')) {
                    if(inputWords.value !== '' && writeSeconds.value !== '') {
                        checkStart = true;
                        add.style.cursor= 'pointer';
                        add.removeAttribute('disabled')
                    }else {
                        add.style.cursor= 'no-drop';
                        checkStart = false;
                        add.setAttribute('disabled', true);
                    }
                   }
                });
                normal.style.display = 'none';
                generateWords();
            }
       else if (e.target.classList.contains('my-words')) {
        if(window.localStorage.getItem('seconds')) {
            seconds.innerHTML = JSON.parse(window.localStorage.getItem('seconds'));
            timeLeft = JSON.parse(window.localStorage.getItem('seconds'));
        }
        writeSeconds.style.display = 'none';
        inputWords.style.width = '100%';
        lvlSeconds.style.display = 'block'
        lvlSeconds.innerHTML = `You have <span class="numberofseconds">${timeLeft}</span> Seconds per word`        
        word.style.display = 'block';
        words.style.display = 'flex';
        if(window.localStorage.getItem('words')) {
            deleteWord();
            AllWords = [...JSON.parse(window.localStorage.getItem('words'))];
            words.innerHTML = '';  
            nunbers.innerHTML = AllWords.length;
            deleteAll.style.display = 'block';
          }
                start.style.display = 'block';
                inputWords.placeholder = 'Press Start';
                add.style.display = 'none';
                myWords.style.display = 'none';
                normal.style.display = 'none';
                generateWords();
                (document.querySelectorAll('.words div .delete')).forEach(word=>{
                    word.style.display = 'block'
                }); 
        }
        if(e.target.classList.contains('normal')) {
            check = false;
            timeLeft = 3;
            seconds.innerHTML = timeLeft;
            lvlSeconds.innerHTML = `You have <span class="numberofseconds">${timeLeft}</span> Seconds per word`
            inputWords.placeholder = 'Press Start';
            start.style.display = 'block';
            inputWords.style.pointerEvents= 'none';
            lvlSeconds.style.display = 'block';
            writeSeconds.style.display = 'none';
            inputWords.style.width = '100%';
            normal.style.display = 'none';
            add.style.display = 'none';
            myWords.style.display = 'none';
            deleteAll.style.display = 'none';
            word.style.display = 'block';
            word.style.color = '#03A9F4'
            AllWords = [...normalWords]
            nunbers.innerHTML = AllWords.length;
            generateWords();
            (document.querySelectorAll('.words div .delete')).forEach(word=>{
                word.style.display = 'none'
            }); 
        }
      });
      
function generateWords() {
    if(check) {
        seconds.innerHTML = timeLeft;
    }
    checkStart = true;
    inputWords.onpaste = function () {
        return false;
      }
    random = AllWords[Math.floor(Math.random() * AllWords.length)];
    let index = AllWords.indexOf(random);
    AllWords.splice(index, 1);
    word.innerHTML = random;
    words.innerHTML = ''
    for (let i = 0; i < AllWords.length; i++) {
        let div = document.createElement('div');
        div.innerHTML = AllWords[i];
        let span = document.createElement('span');
        span.innerHTML = 'x'
        span.className = 'delete'
        span.title = 'delete The Word'
        div.appendChild(span)
        words.appendChild(div)
    }
    if(check) {
        startPlay();
    }
  }
  let counter;
 function startPlay() {
    check = true;
    inputWords.focus()
     counter = setInterval(()=>{
        seconds.innerHTML -= 1
        if(seconds.innerHTML === '0') {
            clearInterval(counter);
            if(inputWords.value.toLowerCase() === random.toLowerCase()) {
                inputWords.value = '';
                score.innerHTML++
            }
            if(AllWords.length > 0) {
                generateWords(AllWords);
            } else {
                if(score.innerHTML === nunbers.innerHTML) {
                    word.innerHTML = 'Good';
                    word.style.color = '#009688'
                }else {
                    word.innerHTML = 'Game Over';
                    word.style.color = 'red';
                    normal.style.display = 'block';
                }
                inputWords.style.pointerEvents = 'none';
                inputWords.placeholder = 'Finish'
            }
          }
        },1000);
    
 }
function addLocal(AllWords) {
    window.localStorage.setItem('words', JSON.stringify(AllWords));
}
 deleteAll.onclick = remove
function remove() {
    clearInterval(counter);
    nunbers.innerHTML = '';
    window.localStorage.removeItem('words');
    window.localStorage.removeItem('seconds');
    AllWords.length = 0;
    words.innerHTML = '';
    normal.style.display = 'block';
    myWords.style.display = 'none';
    start.style.display = 'none';
    word.style.display = 'none';
    deleteAll.style.display = 'none';
    lvlSeconds.style.display = 'none';
}

function deleteWord() {
    words.addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            let index = parseInt(e.target.parentElement.getAttribute('id'));
            AllWords.splice(index, 1);
            words.innerHTML = '';
            AllWords.forEach((word) => {
                let div = document.createElement('div');
                let span = document.createElement('span');
                span.innerHTML = 'x';
                span.className = 'delete';
                div.textContent = word;
                div.appendChild(span);
                words.appendChild(div);
            });
            addLocal(AllWords);
            nunbers.innerHTML = AllWords.length;
            if(AllWords.length === 0) {
                window.localStorage.removeItem('words');
                window.localStorage.removeItem('seconds');
                start.style.display = 'none'
                word.style.display = 'none'
                lvlSeconds.style.display = 'none';
                seconds.innerHTML = ' ... '
                normal.style.display = 'block';
                inputWords.placeholder = 'Press Normal';
            }
        } 
    });
}

   
