let request = require('request');
let mcache = require('memory-cache');

let getTypesForMakeId = (makeId) => {
    return new Promise((resolve, reject) => {
        const key = "_express_GetTypesForMakeId_" + makeId;
        let cachedResult = mcache.get(key);
        if (cachedResult) {
            resolve(cachedResult);
        }
        else {
            request({
                uri: "https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/" + makeId,
                qs: {
                    format: "json"
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    // Cache result for 10 minutes
                    mcache.put(key, body.Results, 600000);
                    resolve(body.Results);
                }
            });
        }
    });
};

let typesData = {
    getTypesForMakeId: getTypesForMakeId,
};

module.exports = typesData;