let btnsSection = document.querySelector(".btnsSection");
let header = document.querySelector("header");
let scoreNumberDiv = document.querySelector(".scoreBox .scoreNumber");
let playAgainBtn = document.createElement("a");

playAgainBtn.classList.add("playAgainBtn");
playAgainBtn.append("PLAY AGAIN");

let score = 0;
scoreNumberDiv.innerText = score;

// New stage content

let newStageSection = document.createElement("section");
newStageSection.classList.add("newStage");

let updateScoreBoard = (decision) => {
  if (decision === "YOU WIN") {
    ++score;
    scoreNumberDiv.innerText = score;
  } else if (decision === "YOU LOSE" && score != 0) {
    --score;
    scoreNumberDiv.innerText = score;
  }
};

let judgeDifferentSign = (computerBtn, one, two) => {
  if (computerBtn.id === one) {
    console.log("YOU WIN");
    return "YOU WIN";
  } else if (computerBtn.id === two) {
    console.log("YOU LOSE");
    return "YOU LOSE";
  }
};

let judgeWinLoseElement = (decision, yourPickBox) => {
  updateScoreBoard(decision);

  let decisionText = document.createElement("div");
  let decisionBox = document.createElement("div");

  // playAgainBtn.style.display = "flex";
  decisionText.innerText = decision;

  decisionBox.classList.add("decisionBox");
  decisionText.classList.add("decisionText");

  decisionBox.insertAdjacentElement("beforeend", decisionText);
  decisionBox.insertAdjacentElement("beforeend", playAgainBtn);

  let footer = document.querySelector("footer");
  if (window.innerWidth < 450) {
    footer.insertAdjacentElement("beforebegin", decisionBox);
  } else {
    yourPickBox.insertAdjacentElement("afterend", decisionBox);
  }
};

let judgeWinLoseLogic = (yourBtn, computerBtn, yourPickBox) => {
  let decision;

  if (yourBtn.id === computerBtn.id) {
    console.log("TIE");
    decision = "TIE";
  } else {
    if (yourBtn.id === "paperBtn") {
      decision = judgeDifferentSign(computerBtn, "rockBtn", "scissorBtn");
    } else if (yourBtn.id === "scissorBtn") {
      decision = judgeDifferentSign(computerBtn, "paperBtn", "rockBtn");
    } else if (yourBtn.id === "rockBtn") {
      decision = judgeDifferentSign(computerBtn, "scissorBtn", "paperBtn");
    }
  }
  setTimeout(() => {
    judgeWinLoseElement(decision, yourPickBox);
  }, 500);
};

let nextStageSetup = (btn) => {
  // Remove previous stage setup by setting display to none, bcz we've to reuse it and
  // would need to recreate whole new page

  btnsSection.style.display = "none";

  // As we've previously set the outermost section container to none when pressing play again
  // as we've to go back to 1st stage, now we've to re-display that section by setting
  // its display prop. to flex

  newStageSection.style.display = "flex";

  // Now we've to remove all 2nd stage elements which were previously created & loaded.
  // Bcz, we've to display new content on 2nd stage according to new input.
  // So, instead of appending new content with old elements, we've to remove them 1st

  // We're checking if there exists prev element (containing all old data elements) then
  // that section container is to be removed.

  let newStageOldBtnsSection = document.querySelector(".newStageBtns");
  if (newStageOldBtnsSection != null) {
    newStageOldBtnsSection.remove();
  }

  // Since we've deleted old section element, containing all our previous data elements.
  // Now we're recreating new section element which will contain new data elements,
  // according to user's input

  let newStageBtnsSection = document.createElement("section");
  newStageBtnsSection.classList.add("newStageBtns");

  // CREATING USER SELECTED INPUT BUTTON

  let yourPickBox = document.createElement("div");
  let yourPickTitle = document.createElement("div");

  yourPickTitle.innerText = "YOU PICKED";

  yourPickBox.classList.add("yourPickBox");
  yourPickTitle.classList.add("yourPickTitle");

  let clickedBtn = btn.cloneNode(true);

  if (window.innerWidth > 450) {
    clickedBtn.classList.add("yourClickedBtn");

    yourPickBox.insertAdjacentElement("beforeend", yourPickTitle);
    yourPickBox.insertAdjacentElement("beforeend", clickedBtn);
  } else {
    clickedBtn.classList.remove("yourClickedBtn");

    yourPickBox.insertAdjacentElement("beforeend", clickedBtn);
    yourPickBox.insertAdjacentElement("beforeend", yourPickTitle);
  }
  // appending user selected button elements

  newStageBtnsSection.insertAdjacentElement("afterbegin", yourPickBox);
  newStageSection.insertAdjacentElement("afterbegin", newStageBtnsSection);
  header.insertAdjacentElement("afterend", newStageSection);

  // CREATING COMPUTER's CHOICE OF BUTTON

  setTimeout(() => {
    // COMPUTING COMPUTER's CHOICE
    let randNum = Math.floor(Math.random() * 3) + 0;
    let allBtns = [".paperBtnOutline", ".scissorBtnOutline", ".rockBtnOutline"];
    let computerPickBtn = document
      .querySelector(allBtns[randNum])
      .cloneNode(true);

    // After computation
    let computerPickBox = document.createElement("div");
    let computerPickTitle = document.createElement("div");

    computerPickBox.classList.add("computerPickBox");
    computerPickTitle.classList.add("computerPickTitle");

    computerPickTitle.innerText = "THE HOUSE PICKED";

    if (window.innerWidth > 450) {
      computerPickBtn.classList.add("computerClickedBtn");

      computerPickBox.insertAdjacentElement("beforeend", computerPickTitle);
      computerPickBox.insertAdjacentElement("beforeend", computerPickBtn);
    } else {
      computerPickBtn.classList.remove("computerClickedBtn");

      computerPickBox.insertAdjacentElement("beforeend", computerPickBtn);
      computerPickBox.insertAdjacentElement("beforeend", computerPickTitle);
    }

    // computerPickBox.insertAdjacentElement("beforeend", computerPickTitle);
    // computerPickBox.insertAdjacentElement("beforeend", computerPickBtn);
    newStageBtnsSection.insertAdjacentElement("beforeend", computerPickBox);

    judgeWinLoseLogic(clickedBtn, computerPickBtn, yourPickBox);
  }, 2000);
};

let paperBtn = document.querySelector(".paperBtnOutline");
let scissorBtn = document.querySelector(".scissorBtnOutline");
let rockBtn = document.querySelector(".rockBtnOutline");

paperBtn.addEventListener("click", () => {
  nextStageSetup(paperBtn);
});
scissorBtn.addEventListener("click", () => {
  nextStageSetup(scissorBtn);
});
rockBtn.addEventListener("click", () => {
  nextStageSetup(rockBtn);
});

playAgainBtn.addEventListener("click", () => {
  // If we're in mobile mode then we've

  if (window.innerWidth < 450) {
    let decisionBox = document.querySelector(".decisionBox");
    decisionBox.remove();
  }

  // First we've to remove whole scetion containing 2nd stage elements.
  // but instead of removing it, I'd simply hide it, bcz, I've to re create it anyways.
  // So, why bother removing it.

  newStageSection.style.display = "none";
  btnsSection.style.display = "flex";
});

let rulesBtn = document.querySelector("footer a");
rulesBtn.addEventListener("click", () => {
  let rulesSection = document.createElement("section");
  rulesSection.classList.add("rulesBoxBgOverlay");

  let rules;

  if (window.innerWidth > 450) {
    rules = `<div class="rulesBox">
    <div class="rulesHeader">
      <div class="rulesHeaderText">RULES</div>
      <a class="closeRulesBtn" href="#">
        <img src="Content/images/icon-close.svg" />
      </a>
    </div>
    <img class="rulesImg" src="Content/images/image-rules.svg" />
  </div>`;
  } else {
    rules = `<div class="rulesBox">
    <div class="rulesHeaderText">RULES</div>
    <img class="rulesImg" src="Content/images/image-rules.svg" />
    <a class="closeRulesBtn" href="#">
      <img src="Content/images/icon-close.svg" />
    </a>
  </div>`;
  }

  rulesSection.innerHTML = rules;
  document.body.insertAdjacentElement("afterbegin", rulesSection);

  let rulesBtn = document.querySelector(".closeRulesBtn");

  rulesBtn.addEventListener("click", () => {
    let rulesBoxBgOverlay = document.querySelector(".rulesBoxBgOverlay");
    rulesBoxBgOverlay.remove();
  });
});
