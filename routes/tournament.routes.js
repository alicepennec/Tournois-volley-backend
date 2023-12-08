const router = require('express').Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Tournament = require('../models/Tournament.model');

// Get all the tournaments
router.get("/", async (req, res) => {
    try {
        const allTournaments = await Tournament.find();
        res.status(200).json({tournaments: allTournaments});
    } catch (error) {
        console.log(error)
        res.status(500).json({error});
    }
});

// Get a specific tournament
router.get("/:tournamentId", async (req, res) => {
    const {tournamentId} = req.params;
    if (mongoose.isValidObjectId(tournamentId)) {
        try {
            const oneTournament = await Tournament.findById(tournamentId);
            if (oneTournament) {
                res.status(201).json({tournament: oneTournament})
            } else {
                res.status(404).json({message: "tournament not found"})
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({error}); 
        }
    } else {
        res.status(500).json({message: "Id seems wrong"})
    };    
})

// Create a new tournament
router.post("/new", async (req, res) => {
    try {
        const newTournament = await Tournament.create({...req.body})
        res.status(201).json({tournament: newTournament})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to create the tournament"})
    }
});

// Update one tournament
router.put("/:tournamentId", async (req, res) => {
    const { tournamentId } = req.params;
    try {
        const updatedTournament = await Tournament.findByIdAndUpdate(tournamentId, req.body, {new: true})
        res.status(200).json({tournament: updatedTournament})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to udpate the tournament"})
    }
});

// Delete one tournament
router.delete("/:tournamentId", async (req, res) => {
    const { tournamentId } = req.params;
    try {
        await Tournament.findByIdAndDelete(tournamentId)
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to delete the tournament"})
    }
});

module.exports = router;