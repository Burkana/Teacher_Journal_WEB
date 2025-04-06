document.addEventListener('input', function (event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'number') {
        const enteredValue = parseFloat(event.target.value);
        if (isNaN(enteredValue) || enteredValue < 2 || enteredValue > 6) {
            event.target.value = '';
            return;
        }

        calculateAndDisplayAverages();
        saveToLocalStorage(event.target.id, enteredValue);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    for (let i = 1; i <= 60; i++) {
        for (let j = 0; j <= 59; j++) {
            const inputElement = document.getElementById(`row${i}_number${j}`);
            const savedValue = loadFromLocalStorage(`row${i}_number${j}`);

            if (inputElement && savedValue !== null) {
                inputElement.value = savedValue;
            }
        }
    }

    calculateAndDisplayAverages();
});

function calculateAndDisplayAverages() {
    for (let i = 1; i <= 59; i++) {
        const averages = [
            calculateAverage(i, 0, 29), 
            calculateAverage(i, 30, 59), 
            calculateAverage(i, 0, 59),  
        ];


        const average1Element = document.getElementById(`row${i}_Average1`);
        const average2Element = document.getElementById(`row${i}_Average2`);
        const average3Element = document.getElementById(`row${i}_Average3`);
        

        if (average1Element && average2Element && average3Element) {
            average1Element.value = averages[0].toFixed(2);
            average2Element.value = averages[1].toFixed(2);
            average3Element.value = averages[2].toFixed(2);
        } 
      
    }

    calculateOverallAverage();
}

function calculateAverage(row, startIndex, endIndex) {
    let sum = 0;
    let count = 0;

    for (let i = startIndex; i <= endIndex; i++) {
        const inputElement = document.getElementById(`row${row}_number${i}`);

        if (inputElement) {
            const inputValue = parseFloat(inputElement.value);

            if (!isNaN(inputValue)) {
                sum += inputValue;
                count++;
            }
        }
    }

    return count === 0 ? 0 : sum / count;
}

function calculateOverallAverage() {
    const overallAverageInputs = document.querySelectorAll('[id$="_Average3"]');

    let totalSum = 0;
    let totalCount = 0;

    overallAverageInputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            totalSum += value;
            totalCount++;
        }
    });

    const overallAverageInput = document.getElementById('OverallAverage');
    overallAverageInput.value = totalCount > 0 ? (totalSum / totalCount).toFixed(2) : 0;
}

var currentVisible = 'PredmetM';  // Default visible subject

function toggleVisibilityP(subject) {
    document.getElementById('currentSubject').innerText = subject;

    var showId, hideId;

    switch (subject) {
        case 'Математика':
            showId = ['PredmetM', 'Predmet'];
            hideId = ['PredmetBg', 'PredmetPp', 'PredmetEp', 'PredmetNe', 'PredmetGo', 'PredmetSr'];
            break;

        case 'Български език и литература':
            showId = ['PredmetBg', 'Predmet'];
            hideId = ['PredmetM', 'PredmetPp', 'PredmetEp', 'PredmetNe', 'PredmetGo', 'PredmetSr'];
            break;

        case 'Немски език':
            showId = ['PredmetNe', 'Predmet'];
            hideId = ['PredmetBg', 'PredmetPp', 'PredmetEp', 'PredmetM', 'PredmetGo', 'PredmetSr'];
            break;

        case 'Чужд език по професия':
            showId = ['PredmetEp', 'Predmet'];
            hideId = ['PredmetBg', 'PredmetPp', 'PredmetM', 'PredmetNe', 'PredmetGo', 'PredmetSr'];
            break;

        case 'Гражданско образование':
            showId = ['PredmetGo', 'Predmet'];
            hideId = ['PredmetBg', 'PredmetPp', 'PredmetEp', 'PredmetNe', 'PredmetM', 'PredmetSr'];
            break;

        case 'Производствена практика':
            showId = ['PredmetPp', 'Predmet'];
            hideId = ['PredmetBg', 'PredmetM', 'PredmetEp', 'PredmetNe', 'PredmetGo', 'PredmetSr'];
            break;
       
    

    }

   showId.forEach(function (showId){
    var showElements = document.querySelectorAll('#' + showId);
    showElements.forEach(function (element) {
        element.style.display = 'table-cell';
    });
   });

    hideId.forEach(function (hideId) {
        var hideElements = document.querySelectorAll('#' + hideId);
        hideElements.forEach(function (element) {
            element.style.display = 'none';
        });
    });
}
function restart() {
    for (let i = 1; i <= 60; i++) {
        for (let j = 0; j <= 59; j++) {
            const defaultValue = ''; // Set your default value here
            const inputElement = document.getElementById(`row${i}_number${j}`);
            
            if (inputElement) {
                inputElement.value = defaultValue;
                saveToLocalStorage(`row${i}_number${j}`, defaultValue);
            }
        }
    }

    calculateAndDisplayAverages();
}

function saveToLocalStorage(id, value) {
    localStorage.setItem(id, value);
}

function loadFromLocalStorage(id) {
    return parseFloat(localStorage.getItem(id)) || null;
}