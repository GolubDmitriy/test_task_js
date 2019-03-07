window.onload = function() {
    const choice = document.getElementsByClassName('choice');
    
    const btn = document.getElementById('btn');

    const help = document.getElementById('help');

    let totalChoiceActive = 0;

    let answers = {answer1: false, answer2: false, answer3: false, answer4: false};

    for (let elem of choice) {
        elem.addEventListener('click', choiceFunc);
    }

    function choiceFunc() {

        const elem = event.target;
        
        if (!~elem.classList.value.indexOf('active-choice')) {
            elem.classList.add('active-choice');
            btn.classList.add('active-btn');
            btn.addEventListener('click', check);
            answers[elem.id] = true;
            ++totalChoiceActive;
        } else {
            elem.classList.remove('active-choice');
            answers[elem.id] = false;
            if (!--totalChoiceActive) {
                btn.classList.remove('active-btn');
                btn.removeEventListener('click', check);
            }
        }
    }

    function check() {
        if (answers.answer1 === true &&
            answers.answer3 === true &&
            answers.answer4 === false && 
            answers.answer2 === false) {
                    
            btn.classList.add('correctly-btn');
            removeAllListener();
            hiddenHelp();
            setTimeout(completeClear, 1500);

        } else if (answers.answer2 === true && answers.answer4 === true) {
            reload(2, 4);
        } else if (answers.answer2 === true) {
            reload(2);
        } else if (answers.answer4 === true) {
            reload(4);
        } else if (answers.answer1 === true) {
            reload();
        } else {
            reload();
        }
    }
          
    function completeClear() {
        const main = document.getElementById('main');
        main.classList.add('complete-clear');
    }

    function wrongAnswer(number) {
        if (number) {
            const answer = 'answer' + number;
            document.getElementById(answer).classList.add('error');
        }
        btn.classList.add('error');
    } 

    function removeAllListener() {
        hiddenHelp();
        btn.removeEventListener('click', check);
        for (let elem of choice) {
            elem.removeEventListener('click', choiceFunc);
        }
    }

    function refresh() {
        changeHelp();
        totalChoiceActive = 0;
        answers = {answer1: false, answer2: false, answer3: false, answer4: false};
        btn.classList.remove('error');
        btn.classList.remove('active-btn');
        for (let elem of choice) {
            elem.classList.remove('error');
            elem.classList.remove('active-choice');
            elem.addEventListener('click', choiceFunc);
        }
    }

    function changeHelp() {
        if (answers.answer2 === true || answers.answer4 === true) {
            help.innerHTML = 'Вычисли Х';
        } else {
            help.innerHTML = 'Это не все правильные ответы';
        }
        help.style.visibility = 'visible';
    }

    function hiddenHelp() {
        help.style.visibility = 'hidden';
    }

    function reload(num1, num2) {
        if (num2) {
            wrongAnswer(num2);
        }
        wrongAnswer(num1);
        removeAllListener();
        setTimeout(refresh, 1000);
    }
}
