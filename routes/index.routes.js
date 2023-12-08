const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const tournamentRoutes = require("./tournament.routes");
router.use("/tournaments", tournamentRoutes);

module.exports = router;
