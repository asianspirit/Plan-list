
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const add = document.querySelector('form.add'),
        addInput = add.querySelector('.add__input'),
        resetBtn = document.querySelector('.add-reset'),
        planList = document.querySelector('.plan-list');



    const wordDb = {
        wordsAll: []
    };

    // create a callback function to get new words in the list through the form
    add.addEventListener('submit', (event) => {
        event.preventDefault();

        let newWord = addInput.value;

        if (newWord){

            if (newWord.length > 11) {
                
                newWord = `${newWord.substring(0, 12)}...`;
            }
            
            wordDb.wordsAll.push(newWord);
            createWordList(wordDb.wordsAll, planList);
        }
        
     
        event.target.reset();
    });


    // create a function for dynamically building a list on an html page 
function createWordList(words, parent) {
    parent.innerHTML = '';

    words.forEach((word, i) => {
        parent.innerHTML += `
    <li class="plan-list__item">
        <p class="checkbox__label">
        ${i + 1} ${word}
        </p> 
    <div class="trash">
        <img class="trash__img" src="images/icons/delete.svg" alt="trash-bin">
    </div>
</li>
     `;
    });


    
// create a function to delete a list item by clicking on the cross 
    document.querySelectorAll('.trash__img').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            wordDb.wordsAll.splice(i, 1); 
            createWordList(words, parent);
            
        });
    });

    // create a function to delete all items in the list by clicking on the button 
    resetBtn.addEventListener('click', () => {
        wordDb.wordsAll.length = 0;
        createWordList(words, parent);

    });

    // create a function to mark a list item 
    document.querySelectorAll('.checkbox__label').forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

}



createWordList(wordDb.wordsAll, planList);

});
