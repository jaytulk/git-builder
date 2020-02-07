import { conceptValues, fileHeader, operationValues } from "./constants";

const adjustForEvenOrOdd = (number, highestNumber, modifier) => {
  const numberIsOdd = number % 2;

  if (modifier === conceptValues.odd && !numberIsOdd) {
    number++;

    if (number > highestNumber) {
      number = highestNumber % 2 ? highestNumber : highestNumber - 1;
    }
  } else if (modifier === conceptValues.even && numberIsOdd) {
    number++;

    if (number > highestNumber) {
      number = highestNumber % 2 ? highestNumber - 1 : highestNumber;
    }
  }

  return number;
};

export const generateCsv = ({
  maxResultCount,
  concepts,
  operations,
  lowestNumber,
  highestNumber
}) => {
  let questions = new Set();
  let repeatCount = 0;
  let output = [fileHeader];

  for (var idx = 1; idx <= maxResultCount; idx++) {
    if (repeatCount > 5) {
      break;
    }

    const questionSet = getQuestion(
      concepts,
      operations,
      lowestNumber,
      highestNumber
    );
    const incorrectAnswers = getIncorrectAnswers(
      questionSet.answer,
      questionSet.modifier
    );

    if (
      questions.has(questionSet.question) ||
      questionSet.answer === Infinity ||
      isNaN(questionSet.answer)
    ) {
      idx--;
      repeatCount++;
    } else {
      questions.add(questionSet.question);
      const line = `${questionSet.question},${
        questionSet.answer
      },${incorrectAnswers.join(",")}`;

      output.push(line);
      repeatCount = 0;
    }
  }

  return output;
};

export const getAnswer = (firstNumber, operation, secondNumber) => {
  switch (operation) {
    case operationValues.plus:
      return firstNumber + secondNumber;
    case operationValues.minus:
      return firstNumber - secondNumber;
    case operationValues.times:
      return firstNumber * secondNumber;
    case operationValues.dividedBy:
      return firstNumber / secondNumber;
    default:
      return NaN;
  }
};

export const getFirstNumber = (modifier, lowestNumber, highestNumber) => {
  let number = getValueInRange(lowestNumber, highestNumber);
  number = adjustForEvenOrOdd(number, highestNumber, modifier);
  return number;
};

export const getIncorrectAnswer = (answer, otherIncorrectAnswers, modifier) => {
  let incorrectAnswer =
    answer + (getValueInRange(-3, 3) || getValueInRange(1, 3));

  if (modifier === conceptValues.positive && incorrectAnswer < 0) {
  }

  while (
    incorrectAnswer === answer ||
    (modifier === conceptValues.positive && incorrectAnswer < 0) ||
    otherIncorrectAnswers.some(x => x === incorrectAnswer)
  ) {
    incorrectAnswer =
      answer + (getValueInRange(-4, 4) || getValueInRange(1, 4));
  }

  return incorrectAnswer;
};

export const getIncorrectAnswers = (answer, modifier) => {
  let incorrectAnswers = [];

  for (let index = 0; index < 4; index++) {
    incorrectAnswers = [
      ...incorrectAnswers,
      getIncorrectAnswer(answer, incorrectAnswers, modifier)
    ];
  }

  return incorrectAnswers;
};

export const getQuestion = (
  concepts,
  operations,
  lowestNumber,
  highestNumber
) => {
  const modifier = getRandomValue(concepts);
  let firstNumber = getFirstNumber(modifier, lowestNumber, highestNumber);
  let secondNumber = getSecondNumber(
    firstNumber,
    modifier,
    lowestNumber,
    highestNumber
  );
  const operation = getRandomValue(operations);

  if (operation === operationValues.minus) {
    if (modifier === conceptValues.positive) {
      firstNumber = Math.max(firstNumber, secondNumber);
      secondNumber = Math.min(firstNumber, secondNumber);
    } else if (modifier === conceptValues.negative) {
      firstNumber = Math.min(firstNumber, secondNumber);
      secondNumber = Math.max(firstNumber, secondNumber);
    }
  }

  const answer = getAnswer(
    Number(firstNumber),
    operation,
    Number(secondNumber)
  );

  return {
    question: `${firstNumber} ${operation} ${secondNumber}`,
    firstNumber,
    secondNumber,
    answer,
    modifier
  };
};

export const getRandomValue = (collection = [0]) =>
  collection[Math.floor((Math.random() * 10) % collection.length)];

export const getSecondNumber = (
  firstNumber,
  modifier,
  lowestNumber,
  highestNumber
) => {
  if (modifier === conceptValues.doubles) {
    return firstNumber;
  }
  let number = getValueInRange(lowestNumber, highestNumber);
  number = adjustForEvenOrOdd(number, highestNumber, modifier);
  return number;
};

export const getValueInRange = (min, max) =>
  Math.floor(Math.random() * (Number(max) + 1 - Number(min))) + Number(min);
