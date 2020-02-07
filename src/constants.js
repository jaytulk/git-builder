export const operationValues = {
  plus: "+",
  minus: "-",
  times: "*",
  dividedBy: "/"
};

export const operationOptions = [
  { key: "+", text: "Addition", value: operationValues.plus },
  { key: "-", text: "Subtraction", value: operationValues.minus },
  { key: "*", text: "Multiplication", value: operationValues.times }
];

export const conceptValues = {
  any: "any",
  odd: "odd",
  even: "even",
  positive: "positive",
  negative: "negative",
  doubles: "doubles"
};

export const conceptOptions = [
  { key: "any", text: "All Numbers", value: conceptValues.any },
  { key: "odd", text: "Odd Numbers", value: conceptValues.odd },
  { key: "even", text: "Even Numbers", value: conceptValues.even },
  { key: "positive", text: "Positive Answers", value: conceptValues.positive },
  { key: "negative", text: "Negative Answers", value: conceptValues.negative },
  { key: "doubles", text: "Doubles", value: conceptValues.doubles }
];

export const fileHeader = `Question,CorrectAnswer,IncorrectAnswer1,IncorrectAnswer2,IncorrectAnswer3`;
