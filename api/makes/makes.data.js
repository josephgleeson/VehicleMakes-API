let request = require('request');
let mcache = require('memory-cache');

let getMakes = () => {
    return new Promise((resolve, reject) => {
        const key = "_express_GetAllMakes";
        let cachedResult = mcache.get(key);
        if (cachedResult) {
            resolve(cachedResult);
        }
        else {
            request({
                uri: "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes",
                qs: {
                    format: "json"
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    body.Results.sort((a, b) => {
                        let makeName_a = a.Make_Name.toLowerCase().trim();
                        let makeName_b = b.Make_Name.toLowerCase().trim();
                        if (makeName_a < makeName_b) return -1;
                        if (makeName_a > makeName_b) return 1;
                        return 0;
                    });
                    // Cache result for 10 minutes
                    mcache.put(key, body.Results, 600000);
                    resolve(body.Results);
                }
            });
        }
    });
};

let searchMakes = (searchString) => {
    return new Promise((resolve, reject) => {
        return getMakes().then((makes) => {
            let key = "_express_GetFilteredMakes_" + searchString.toLowerCase();
            let cachedResult = mcache.get(key);
            if (cachedResult) {
                resolve(cachedResult);
            }

            let filteredResults = makes.filter(make => make.Make_Name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

            if (filteredResults.length === 0) {
                reject("No vehicle makes match the search criteria.")
            }

            mcache.put(key, filteredResults, 60000);
            resolve(filteredResults);
        });
    });
};

let makesData = {
    getMakes: getMakes,
    searchMakes: searchMakes
};

module.exports = makesData;