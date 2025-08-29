import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "Kajal Raj";
const DOB = "19102004";
const EMAIL = "kajal19rajsingh@gmail.com";
const ROLL = "22BCE11041";

function isNumeric(str) {
  return /^[0-9]+$/.test(str);
}

function alternatingCaps(str) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    res += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return res;
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd = [];
    let even = [];
    let alphabets = [];
    let specials = [];
    let sum = 0;

    for (let item of data) {
      if (isNumeric(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) even.push(item);
        else odd.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specials.push(item);
      }
    }

    let concatStr = alphabets.join("");
    concatStr = concatStr.split("").reverse().join("");
    concatStr = alternatingCaps(concatStr);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: specials,
      sum: sum.toString(),
      concat_string: concatStr,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
