let express = require('express');
let makesRouter = express.Router();
let makesController = require('./makes.controller');
let makesData = require('./makes.data');

makesRouter.route('/')
    .get(makesController.get);

makesRouter.route('/:search')
    .get(function(req, res) {
        makesData.searchMakes(req.params.search).then((makes) => {
            if (makes.length === 0) {
                    throw new Error("No vehicle makes match the search criteria.");
            }

            let baseUrl = 'http://' + req.headers.host + '/api/makes/' + req.params.search;
            let count = +req.query.count || 20;
            let offset = +req.query.offset || 0;

            let response = {
                results: makes.slice(offset, offset + count),
                links: {
                    self: baseUrl + '?count=' + count + "&offset=" + offset
                }
            };

            if (makes.length > (count + offset))
                response.links.nextPage = baseUrl + '?count=' + count + "&offset=" + (count + offset);

            res.status(200).json(response);
        }).catch((error) => {
            if (error instanceof Error) {
                res.status(500).send(error);
            }
            else { // search returned no results
                res.status(404).send(error);
            }
        });
    }
);

module.exports = makesRouter;
