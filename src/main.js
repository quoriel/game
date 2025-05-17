const { ForgeExtension } = require("@tryforge/forgescript");

class QuorielGame extends ForgeExtension {
    name = "QuorielGame";
    description = require("../package.json").description;
    version = require("../package.json").version;

    init() {
        this.load(__dirname + "/functions");
    }
}

exports.QuorielGame = QuorielGame;