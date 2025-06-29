const { ForgeExtension } = require("@tryforge/forgescript");
const pkg = require("../package.json");

class QuorielGame extends ForgeExtension {
    name = "QuorielGame";
    description = pkg.description;
    version = pkg.version;

    init() {
        this.load(__dirname + "/functions");
    }
}

exports.QuorielGame = QuorielGame;