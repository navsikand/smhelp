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

function simulateTyping(textArea, text, button, delay = 100) {
  let index = 0;

  function typeCharacter() {
    if (index < text.length) {
      textArea.value += text[index];
      textArea.dispatchEvent(new Event("input"));
      index++;
      setTimeout(typeCharacter, delay);
    } else {
      setTimeout(() => {
        button.click();
        button.dispatchEvent(new Event("click"));
      }, 100);
    }
  }

  typeCharacter();
}

function executePart1() {
  return new Promise((resolve) => {
    const buttons = document.querySelectorAll(".show-answer-button");
    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.click();
        button.click();
        console.log(`Clicked button ${index + 1}`);
        if (index === buttons.length - 1) {
          resolve();
        }
      }, index * 1000);
    });
  });
}

async function executePart2() {
  const questions = Array.from(
    document.getElementsByClassName("short-answer-question"),
  );
  for (const question of questions) {
    await new Promise((resolve) => {
      setTimeout(() => {
        const qDiv = question.children[0];
        const textInp =
          qDiv.children[1].children[0].children[0].children[0].children[0];
        const answer = question.children[1].children[1].children[0].innerText;
        const check = qDiv.children[1].children[0].children[1].children[0];

        simulateTyping(textInp, answer, check, 100);

        setTimeout(() => resolve(), 500);
      }, 1000);
    });
  }
}

async function main() {
  await executePart1();
  await executePart2();
}

main();
