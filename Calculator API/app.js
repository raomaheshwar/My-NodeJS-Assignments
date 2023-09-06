const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    res.json({ status: "error", message: "Invalid data types" });
    return;
  }

  const sum = num1 + num2;

  if (sum < -1000000) {
    res.json({ status: "error", message: "Underflow" });
    return;
  }

  if (sum > 1000000) {
    res.json({ status: "error", message: "Overflow" });
    return;
  }

  res.json({ status: "success", message: "The sum of given two numbers", sum });
});

app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    res.json({ status: "error", message: "Invalid data types" });
    return;
  }

  const difference = num1 - num2;

  if (difference < -1000000) {
    res.json({ status: "error", message: "Underflow" });
    return;
  }

  if (difference > 1000000) {
    res.json({ status: "error", message: "Overflow" });
    return;
  }

  res.json({
    status: "success",
    message: "The difference of given two numbers",
    difference,
  });
});

app.post("/multiply", (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    res.json({ status: "error", message: "Invalid data types" });
    return;
  }

  const result = num1 * num2;

  if (result < -1000000) {
    res.json({ status: "error", message: "Underflow" });
    return;
  }

  if (result > 1000000) {
    res.json({ status: "error", message: "Overflow" });
    return;
  }

  res.json({
    status: "success",
    message: "The product of given numbers",
    result,
  });
});

app.post("/divide", (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    res.json({ status: "error", message: "Invalid data types" });
    return;
  }

  if (num2 === 0) {
    res.json({ status: "error", message: "Cannot divide by zero" });
    return;
  }

  const result = num1 / num2;

  if (result < -1000000) {
    res.json({ status: "error", message: "Underflow" });
    return;
  }

  if (result > 1000000) {
    res.json({ status: "error", message: "Overflow" });
    return;
  }

  res.json({
    status: "success",
    message: "The division of given numbers",
    result,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
