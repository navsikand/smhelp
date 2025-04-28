(async () => {
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
  

  
  async function main() {
    await executePart1();
(async () => {
  // 1) Double-click each Show-Answer for short answers
  const saButtons = Array.from(
    document.querySelectorAll('.short-answer-question .show-answer-button')
  );
  saButtons.forEach((btn, i) =>
    setTimeout(() => {
      btn.click();
      btn.click();
      console.log(`Revealed SA #${i+1}`);
    }, i * 200)
  );

  // wait for answers to appear
  await new Promise(r => setTimeout(r, saButtons.length * 200 + 300));

  // 2) Fill & check each short-answer
  document.querySelectorAll('.short-answer-question').forEach((q, i) => {
    const input     = q.querySelector('.zb-input');
    const answerEl  = q.querySelector('.forfeit-answer');
    const checkBtn  = q.querySelector('.check-button');
    if (!input || !answerEl || !checkBtn) {
      console.warn(`Skipping SA #${i+1}: missing element`);
      return;
    }
    const ans = answerEl.innerText.trim();
    input.value = ans;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    console.log(`Filled SA #${i+1} → "${ans}"`);

    // small delay before clicking check
    setTimeout(() => {
      checkBtn.click();
      console.log(`Clicked Check on SA #${i+1}`);
    }, 100);
  });

  // 3) Auto-select & check each MCQ (where a check-button exists)
  document.querySelectorAll('.multiple-choice-question').forEach((q, i) => {
    const answerEl = q.querySelector('.forfeit-answer');
    const checkBtn = q.closest('.multiple-choice-content-resource')
                      ?.querySelector('.check-button');
    if (!answerEl) {
      console.warn(`No MCQ answer revealed for #${i+1}`);
      return;
    }
    const ans = answerEl.innerText.trim();
    const radios = Array.from(q.querySelectorAll('.zb-radio-button'));
    const match  = radios.find(r =>
      r.querySelector('label').innerText.trim() === ans
    );
    if (match) {
      const radio = match.querySelector('input[type=radio]');
      radio.click();
      console.log(`Selected MCQ #${i+1} → "${ans}"`);
    } else {
      console.warn(`MCQ #${i+1}: no choice matching "${ans}"`);
    }

    if (checkBtn) {
      setTimeout(() => {
        checkBtn.click();
        console.log(`Clicked Check on MCQ #${i+1}`);
      }, 100);
    }
  });

  console.log('✅ All answers filled/selected and “Check” clicked.');
})();

    console.log("All done!");
  }
  
  main();  
})()
