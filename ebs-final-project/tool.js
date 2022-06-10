exports.parseSub = (str) => {
  const result = [];
  const lines = str
    .split("\n")
    .map((e) => e.trim())
    .filter(Boolean);
  for (let line of lines) {
    const conditions = line.match(/(?<=\().+?(?=\))/g);
    let obj = {};
    console.log(conditions)
    for (let condition of conditions) {
      const [key, operator, value] = condition.split(",").map((e) => e.trim());
      obj[key] = {
        operator: operator === "=" ? "==" : operator,
        value: JSON.parse(value),
      };
    }
    result.push(obj);
  }
  return result;
};

exports.parsePub = (str) => {
  const result = [];
  const lines = str
    .split("\n")
    .map((e) => e.trim())
    .filter(Boolean);
  for (let line of lines) {
    const conditions = line.match(/(?<=\().+?(?=\))/g);
    let obj = {};
    for (let condition of conditions) {
      const [key, value] = condition.split(",").map((e) => e.trim());
      obj[key] = {
        value: JSON.parse(value),
      };
    }
    result.push(obj);
  }
  return result;
};
