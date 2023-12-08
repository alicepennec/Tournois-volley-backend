const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const tournamentSchema = new Schema(
  {
    name: {
        type: String,
        required: [true, "Nom obligatoire."],
    },
    date: {
        type: String,
        required: [true, "Date obligatoire"],
    },
    club: String,
    address: String,
    city: String,
    postcode: String,
    region: {
        type: [String],
        enum: ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire", "Corse", "Grand-Est", "Hauts-de-France", "Ile-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"],
        required: [true, "Région obligatoire"],
    },
    tarif: {
        type: Number,
    },
    description: {
        type: String,
        required: [true, "Description obligatoire"],
    },
    picture: {
        type: String,
        default: "https://img.freepik.com/vecteurs-premium/volley-ball-volleyball-sport-retro-pop-art-affiche-signage_2699-218.jpg?w=360"
    },
    contact: String,
    telephone: String,
    email: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Tournament = model("Tournament", tournamentSchema);

module.exports = Tournament;