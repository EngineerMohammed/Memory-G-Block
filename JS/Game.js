document.querySelector(".control-buttons").onclick = function () {
  let yourName = prompt("Whats Your Name Sir ?");
  if (yourName == null || yourName == "") {
    document.querySelector(".info-container .name").innerHTML = "UNKown";
  } else {
    document.querySelector(".info-container .name").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

// set duration time ms
let duration = 1000;

// creat an Array from the blocks container childes
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];
// let orderRange = Array.from(Array(blocks.length).keys());

Shuffel(orderRange);

// Add Order to the blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Triger flip block function
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function Shuffel(array) {
  // set variables
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Element
    random = Math.floor(Math.random() * current);
    // [1] Decrease length by one
    current--;
    // Save Current Element in Stash
    temp = array[current];
    //  [2] curent element = random element
    array[current] = array[random];
    // [3] Random Element = Get Element from stash
    array[random] = temp;
  }
  return array;
}

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  // collect all flipped Blocks
  let allflippedBlocks = blocks.filter((anyblock) =>
    anyblock.classList.contains("is-flipped")
  );
  if (allflippedBlocks.length === 2) {
    // triger stop clicking function
    stopClicking();
    matchedBlocks(allflippedBlocks[0], allflippedBlocks[1]);
  }
}

// Stop Clicking Function //
function stopClicking() {
  // add no clicking on main container
  blocksContainer.classList.add("no-clicking");

  // remove noclicing afrter time
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//
// function matchedBlocks(fristBlock, secondBlock) {
//   // set the tries number
//   let triesElement = document.querySelector(".tries span");

//   if (fristBlock.dataset.technology === secondBlock.dataset.technology) {
//     fristBlock.classList.remove("is-flipped");
//     secondBlock.classList.remove("is-flipped");

//     // Add Matched class
//     fristBlock.classList.add("has-match");
//     secondBlock.classList.add("has-match");
//   } else {
//     triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

//     setTimeout(() => {
//       fristBlock.classList.remove("is-flipped");
//       secondBlock.classList.remove("is-flipped");
//     }, duration);
//   }
// }

function matchedBlocks(fristBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (fristBlock.dataset.technology === secondBlock.dataset.technology) {
    fristBlock.classList.remove("is-flipped");

    secondBlock.classList.remove("is-flipped");

    fristBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").onplay();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      fristBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").onplay();
  }
}
// ===-----===++++++++=======++++++++++++++++=============++++========
