const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here
//Get all Mario characters
app.get('/mario', async (req, res) => {
  try {
    const characters = await marioModel.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get a Mario charcters by ID
app.get("/mario/:id", async (req, res) => {
  try {
    const character = await marioModel.findById(req.params.id);
    if (character) {
      res.json(character);
    } else {
      res.status(404).json({
        message: "Character not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//POST a new Mario character
app.post("/mario", async (req, res) => {
  const { name, weight } = req.body;
  if (!name || !weight) {
    res.status(400).json({
      message: "either name or weight is missing",
    });
    return;
  }
  const newCharacter = new marioModel({
    name,
    weight,
  });

  try {
    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// PATCH/UPDATE a Mario character by ID
app.patch("/mario/:id", async (req, res) => {
  try {
    const updatedCharacter = await marioModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatedCharacter) {
      res.json(updatedCharacter);
    } else {
      res.status(404).json({
         message: "Character not found" 
      });
    }
  } catch (error) {
    res.status(400).json({ 
        message: error.message
    });
  }
});

// DELETE a Mario character by ID
app.delete("/mario/:id", async (req, res) => {
  try {
    const deletedCharacter = await marioModel.findByIdAndDelete(req.params.id);

    if (deletedCharacter) {
      res.json({
         message: "character deleted"
      });
    } else {
      res.status(404).json({
         message: "Character not found" 
      });
    }
  } catch (error) {
    res.status(400).json({
         message: error.message 
    });
  }
});

module.exports = app;
