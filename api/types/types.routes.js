let express = require('express');

let typesRouter = express.Router();
let typesController = require('../types/types.controller');
let typesData = require('../types/types.data');

typesRouter.route('/')
    .get(typesController.get);

typesRouter.route('/:makeId')
    .get((req, res) => {
            typesData.getTypesForMakeId(req.params.makeId).then((types) => {
                let response = {
                    results: types,
                    links: {
                        self: 'http://' + req.headers.host + '/api/types/' + req.params.makeId
                    }
                };
                res.status(200).json(response);
            }).catch((error) => {
               res.status(500).send(error);
            });
        }
    );

module.exports = typesRouter;
