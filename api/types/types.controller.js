let typesController = {
    get: (req, res) => {
        res.status(500).send("Make Id is required");
    }
};

module.exports = typesController;