require("dotenv").config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "f0a8553c5799cf17d7f4ed6b72ecca837aa542b6ed6068a0b85b6a14e844cfd4fe9d284a1311bdd3503333d25b998b22a9d8f6ea86434ffe8843a1a24a4a1c4e",
    PORT: process.env.PORT || 4000, // Set the default port
};