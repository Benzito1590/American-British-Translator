import { americanOnly } from "./american-only.js";
import { britishOnly } from "./british-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";

const textArea = document.getElementById("text-input");
const translatedSentence = document.getElementById("translated-sentence");
const dropdown = document.getElementById("locale-select");
const translateButton = document.getElementById("translate-btn");
const clearButton = document.getElementById("clear-btn");
const errDiv = document.getElementById("error-msg");

const swapKeyValue = obj => {
  const newObj = {};
  const keys = Object.keys(obj);

  keys.forEach(key => {
    newObj[obj[key]] = key;
  });

  return newObj;
};

const britishEquivalents = swapKeyValue(americanOnly);
const americanEquivalents = swapKeyValue(britishOnly);
const britishToAmericanSpelling = swapKeyValue(americanToBritishSpelling);
const britishToAmericanTitles = swapKeyValue(americanToBritishTitles);

const americanToBritish = input => {
  const matches = {};
  const lowercase = input.toLowerCase();
  const splitInput = lowercase.split(" ");

  const amerKeys = Object.keys(americanOnly);
  const amerSpellKeys = Object.keys(americanToBritishSpelling);
  const amerTitlesKeys = Object.keys(americanToBritishTitles);
  const amerEquivKeys = Object.keys(americanEquivalents);

  for (let i = 0; i < splitInput.length; i++) {
    let firstSecondThird;
    let firstAndSecond;

    if (i + 2 < splitInput.length) {
      firstSecondThird = `${splitInput[i]} ${splitInput[i + 1]} ${
        splitInput[i + 2]
      }`;

      if (firstSecondThird.match(/\.$/)) {
        firstSecondThird = firstSecondThird.replace(".", "");
      }

      if (amerKeys.includes(firstSecondThird)) {
        matches[firstSecondThird] = americanOnly[firstSecondThird];
      } else if (amerEquivKeys.includes(firstSecondThird)) {
        matches[firstSecondThird] = americanEquivalents[firstSecondThird];
      }
    }

    if (i + 1 < splitInput.length) {
      firstAndSecond = `${splitInput[i]} ${splitInput[i + 1]}`;
      if (firstAndSecond.match(/\.$/)) {
        firstAndSecond = firstAndSecond.replace(".", "");
      }

      if (amerKeys.includes(firstAndSecond)) {
        matches[firstAndSecond] = americanOnly[firstAndSecond];
      } else if (amerEquivKeys.includes(firstAndSecond)) {
        matches[firstAndSecond] = americanEquivalents[firstAndSecond];
      }
    }

    if (i === splitInput.length - 1 && splitInput[i].includes(".")) {
      splitInput[i] = splitInput[i].replace(".", "");
    }

    if (amerKeys.includes(splitInput[i])) {
      matches[splitInput[i]] = americanOnly[splitInput[i]];
    } else if (amerEquivKeys.includes(splitInput[i])) {
      matches[splitInput[i]] = americanEquivalents[splitInput[i]];
    } else if (amerSpellKeys.includes(splitInput[i])) {
      matches[splitInput[i]] = americanToBritishSpelling[splitInput[i]];
    } else if (amerTitlesKeys.includes(splitInput[i])) {
      matches[splitInput[i]] = americanToBritishTitles[splitInput[i]];
    }
  }

  let output = lowercase;

  const matchKeys = Object.keys(matches);

  matchKeys.forEach(ele => {
    if (amerTitlesKeys.includes(ele)) {
      const amerTitle = ele;
      const capAmerTitle = amerTitle.replace(
        amerTitle[0],
        amerTitle[0].toUpperCase()
      );
      const britTitle = matches[ele];
      const capBritTitle = britTitle.replace(
        britTitle[0],
        britTitle[0].toUpperCase()
      );
      output = output.replace(capAmerTitle, capBritTitle);
      output = output.replace(amerTitle, capBritTitle);
    }
    output = output.replace(ele, matches[ele]);
  });

  const regex = /\d{1,2}:\d{2}/;

  let active = true;

  while (active) {
    if (output.match(regex)) {
      const originalTime = output.match(regex);
      const timeReplacement = output
        .match(regex)
        .join("")
        .split(":")
        .join(".");
      output = output.replace(originalTime, timeReplacement);
    }

    if (!output.match(regex)) {
      active = false;
    }
  }

  let outputArr = output.split(" ");
  let inputArr = input.split(" ");

  outputArr.forEach((outEle, outI) => {
    const match = inputArr.find(
      (inEle, inI) => inEle.toLowerCase() === outEle && inI >= outI
    );
    if (match) {
      if (match[0] === match[0].toUpperCase()) {
        outputArr[outI] = outputArr[outI].replace(
          outputArr[outI][0],
          outputArr[outI][0].toUpperCase()
        );
      }
    }
  });

  output = outputArr.join(" ");

  if (input === output) {
    return "Everything looks good to me!";
  }

  return output;
};

const britishToAmerican = input => {
  const matches = {};
  const lowercase = input.toLowerCase();
  const splitInput = lowercase.split(" ");

  const britKeys = Object.keys(britishOnly);
  const britSpellKeys = Object.keys(britishToAmericanSpelling);
  const britTitlesKeys = Object.keys(britishToAmericanTitles);
  const britEquivKeys = Object.keys(britishEquivalents);

  for (let i = 0; i < splitInput.length; i++) {
    let firstSecondThird;
    let firstAndSecond;

    if (i + 2 < splitInput.length) {
      firstSecondThird = `${splitInput[i]} ${splitInput[i + 1]} ${
        splitInput[i + 2]
      }`;

      if (firstSecondThird.match(/\.$/)) {
        firstSecondThird = firstSecondThird.replace(".", "");
      }

      if (britKeys.includes(firstSecondThird)) {
        matches[firstSecondThird] = britishOnly[firstSecondThird];
      } else if (britEquivKeys.includes(firstSecondThird)) {
        matches[firstSecondThird] = britishEquivalents[firstSecondThird];
      }
    }

    if (i + 1 < splitInput.length) {
      firstAndSecond = `${splitInput[i]} ${splitInput[i + 1]}`;
      if (firstAndSecond.match(/\.$/)) {
        firstAndSecond = firstAndSecond.replace(".", "");
      }

      if (britKeys.includes(firstAndSecond)) {
        matches[firstAndSecond] = britishOnly[firstAndSecond];
      } else if (britEquivKeys.includes(firstAndSecond)) {
        matches[firstAndSecond] = britishEquivalents[firstAndSecond];
      }
    }

    if (i === splitInput.length - 1 && splitInput[i].includes(".")) {
      splitInput[i] = splitInput[i].replace(".", "");
    }

    if (britKeys.includes(splitInput[i])) {
      matches[splitInput[i]] = britishOnly[splitInput[i]];
    } else if (britEquivKeys.includes(splitInput[i])) {
      matches[splitInput[i]] = britishEquivalents[splitInput[i]];
    } else if (britSpellKeys.includes(splitInput[i])) {
      matches[splitInput[i]] = britishToAmericanSpelling[splitInput[i]];
    } else if (britTitlesKeys.includes(splitInput[i])) {
      matches[splitInput[i]] = britishToAmericanTitles[splitInput[i]];
    }
  }

  let output = lowercase;

  const matchKeys = Object.keys(matches);

  matchKeys.forEach(ele => {
    if (britTitlesKeys.includes(ele)) {
      const amerTitle = matches[ele];
      const capAmerTitle = amerTitle.replace(
        amerTitle[0],
        amerTitle[0].toUpperCase()
      );
      const britTitle = ele;
      const capBritTitle = britTitle.replace(
        britTitle[0],
        britTitle[0].toUpperCase()
      );
      output = output.replace(capBritTitle, capAmerTitle);
      output = output.replace(britTitle, capAmerTitle);
    }
    output = output.replace(ele, matches[ele]);
  });

  const regex = /\d{1,2}\.\d{2}/;

  let active = true;

  while (active) {
    if (output.match(regex)) {
      const originalTime = output.match(regex);
      const timeReplacement = output
        .match(regex)
        .join("")
        .split(".")
        .join(":");
      output = output.replace(originalTime, timeReplacement);
    }

    if (!output.match(regex)) {
      active = false;
    }
  }

  let outputArr = output.split(" ");
  let inputArr = input.split(" ");

  outputArr.forEach((outEle, outI) => {
    const match = inputArr.find(
      (inEle, inI) => inEle.toLowerCase() === outEle && inI >= outI
    );
    if (match) {
      if (match[0] === match[0].toUpperCase()) {
        outputArr[outI] = outputArr[outI].replace(
          outputArr[outI][0],
          outputArr[outI][0].toUpperCase()
        );
      }
    }
  });

  output = outputArr.join(" ");

  if (input === output) {
    return "Everything looks good to me!";
  }

  return output;
};

const highLightOutput = (input, output) => {
  if (output === "Everything looks good to me!") {
    return output
  }
  
  const inputArr = input.split(" ");
  const outputArr = output.split(" ");
  const highLightArr = [];

  outputArr.forEach(ele => {
    if (!inputArr.includes(ele)) {
      highLightArr.push(`<span class="highlight">${ele}</span>`);
    } else {
      highLightArr.push(ele);
    }
  });

  return highLightArr.join(" ");
};

translateButton.addEventListener("click", () => {
  const selectedTranslation = dropdown.options[dropdown.selectedIndex].value;

  if (textArea.value === "") {
    errDiv.innerHTML = "Error: No text to translate.";
    return (translatedSentence.innerHTML = "");
  } else {
    errDiv.innerHTML = "";
  }

  if (selectedTranslation === "american-to-british") {
    translatedSentence.innerHTML = highLightOutput(
      textArea.value,
      americanToBritish(textArea.value)
    );
  } else if (selectedTranslation === "british-to-american") {
    translatedSentence.innerHTML = highLightOutput(
      textArea.value,
      britishToAmerican(textArea.value)
    );
  }
});

clearButton.addEventListener("click", () => {
  textArea.value = "";
  translatedSentence.innerHTML = "";
  errDiv.innerHTML = "";
});

try {
  module.exports = { americanToBritish, britishToAmerican };
} catch (e) {}
