const router = require("express").Router();
const axios = require("axios");
const ApiService = require('../services/api.services');
const apiService = new ApiService();

router.get("/characters/create-character", (req, res, next) => {
    res.render("characters/create-character");
})

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.post("/characters/create-character", async (req, res, next) => {
    const details = req.body;
    try {
        apiService.createCharacter(details);
        res.redirect("/characters");

    } catch (err) {
        console.log("Error creating Character: ", err);
    }
});

router.get("/characters/:id/edit-character", async (req, res, next) => {
    try {
        const charData = await axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`);
        res.render("characters/edit-character", {character: charData.data})

    } catch (error) {
        console.log("ERROR: ", error);
    }
});


router.post("/characters/:id/edit-character/", async (req, res, next) => {
    try {
        const charData = await axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`);
        const charInfo = {
            name: req.body.name,
            occupation: req.body.occupation,
            weapon: req.body.weapon,
            debt: req.body.debt
        };
        await apiService.editCharacter(req.params.id, charInfo);
        res.redirect("/characters");
    } catch (err) {
        console.log("Error: ", err);
    }
});

router.post("/characters/:id/delete", async (req, res, next) => {
    const characterId = req.params.id;
    try {
        await apiService.deleteCharacter(characterId);
        res.redirect("/characters");
    } catch (err) {
        console.log("Error: ", err);
    }
});

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters