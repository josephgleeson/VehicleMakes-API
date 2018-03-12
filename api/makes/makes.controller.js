let makesData = require('./makes.data');

let makesController = {
    get: function(req, res){
        makesData.getMakes().then((makes) => {
            let count = +req.query.count || 20;
            let offset = +req.query.offset || 0;

            let baseUrl = 'http://' + req.headers.host + '/api/makes';

            let response = {
                results: makes.slice(offset, offset + count),
                links: {
                    self: baseUrl + '?count=' + count + "&offset=" + offset
                }
            };

            if (makes.length > (count+offset))
                response.links.nextPage = baseUrl + '?count=' + count + "&offset=" + (count+offset);

            res.status(200).json(response);
        }).catch((error) => {
            res.status(500).send(error);
        });
    }
};

module.exports = makesController;