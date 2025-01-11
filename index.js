function simulateTyping(textArea, text, button, delay = 100) {
    let index = 0;

    function typeCharacter() {
        if (index < text.length) {
            textArea.value += text[index];
            textArea.dispatchEvent(new Event('input'));
            index++;
            setTimeout(typeCharacter, delay);
        } else {
            setTimeout(() => {
                button.click();
                button.dispatchEvent(new Event('click'));
            }, 100);
        }
    }

    typeCharacter();
}

const buttons = document.querySelectorAll(".show-answer-button");

buttons.forEach((button, index) => {
  setTimeout(() => {
    button.click();
    button.click();
    console.log(`Clicked button ${index + 1}`);
  }, index * 1000);
});

const radioButtons = document.querySelectorAll('input[type="radio"]');

function clickRadioButtonsWithDelay(index = 0) {
    if (index < radioButtons.length) {
        radioButtons[index].click();
        console.log(`Clicked radio button at index ${index}`);

        setTimeout(() => clickRadioButtonsWithDelay(index + 1), 1000);
    } else {
        console.log("All radio buttons have been clicked.");
    }
}

clickRadioButtonsWithDelay();

// --- Do the above then do htis one



const questions = Array.from(
  document.getElementsByClassName("short-answer-question"),
);
questions.forEach((question) => {
  setTimeout(() => {
    const qDiv = question.children[0];
    const textInp =
      qDiv.children[1].children[0].children[0].children[0].children[0];
    const answer = question.children[1].children[1].children[0].innerText;
    const check = qDiv.children[1].children[0].children[1].children[0];

    simulateTyping(textInp, answer, check ,100);

    setTimeout(() => {}, 500);
  }, 1000);
});
