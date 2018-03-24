var spanUnivStatsApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = spanUnivStatsApi;


spanUnivStatsApi.register = function(app,SpanUNivStatsdb,initialStats) {

    console.log("Registering routes for span-univ-stats API...");

    /////////////   LOADINITIALDATA 

    app.get(BASE_API_PATH + "/span-univ-stats/loadInitialData", (req, res) => {

        console.log(Date() + " - GET /span-univ-stats/loadInitialData")

        SpanUNivStatsdb.find({}, (err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {
                console.log(" Empty DB");
                SpanUNivStatsdb.insert(initialStats);

            }
            else {
                console.log("DB initialized with " + stats.length + " stats")
            }

        });
    });



    //////ACCIONES PARA /span-univ-stats

    app.get(BASE_API_PATH + "/span-univ-stats", (req, res) => {
        console.log(Date() + " - GET /span-univ-stats");
        SpanUNivStatsdb.find({}, (err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(stats);

        });

    });

    app.post(BASE_API_PATH + "/span-univ-stats", (req, res) => {
        console.log(Date() + " - POST /span-univ-stats");
        var stat = req.body;

        SpanUNivStatsdb.insert(stat);
        res.sendStatus(201);
    });

    app.put(BASE_API_PATH + "/span-univ-stats", (req, res) => {
        console.log(Date() + " - PUT /span-univ-stats");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/span-univ-stats", (req, res) => {
        console.log(Date() + " - DELETE /span-univ-stats");
        SpanUNivStatsdb.find({}, (err, stats) => {
            for (var i = 0; i < stats.length; i++) {
                SpanUNivStatsdb.remove({});
            }
        });

        res.sendStatus(200);
    });

    ////// ACCIONES PARA RECURSO CON UNA INSTANCIA (COMUNIDAD AUTONOMA)

    app.get(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {
        var autComm = req.params.autCommunity;
        console.log(Date() + " - GET /span-univ-stats/" + autComm);

        SpanUNivStatsdb.find({ autCommunity: autComm }, (err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(stats);

        });
    });


    app.delete(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {

        var autComm = req.params.autCommunity;

        console.log(Date() + " - DELETE /span-univ-stats/" + autComm);

        SpanUNivStatsdb.find({ autCommunity: autComm }, (err, stats) => {
            for (var i = 0; i < stats.length; i++) {
                SpanUNivStatsdb.remove({ autCommunity: autComm });
            }

        });


        res.sendStatus(200);

    });



    app.post(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {
        var autComm = req.params.autCommunity;
        console.log(Date() + " - POST /span-univ-stats/" + autComm);
        res.sendStatus(405);
    });




    app.put(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {
        var autComm = req.params.autCommunity;
        var stat = req.body;
        console.log(Date() + " - PUT /span-univ-stats/" + autComm);


        if (autComm !== stat.autCommunity) {
            res.sendStatus(409);
            console.warn(Date() + "  - Hacking attemp!")
            return;
        }

        SpanUNivStatsdb.update({ autCommunity: autComm }, stat, (err, numUpdated) => {
            console.log(" - Updated" + numUpdated);
        });

        res.sendStatus(200);

    });


    ////// ACCIONES PARA UN RECURSO CONCRETO CON DOS INSTANCIAS


    app.get(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {
        var ac = req.params.autCommunity;
        var y = req.params.year;
        console.log(Date() + " - GET /span-univ-stats/" + ac + "/" + y);

        SpanUNivStatsdb.find({ "autCommunity": ac, "year": parseInt(y) }, (err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(stats);

        });
    });


    app.delete(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {

        var autComm = req.params.autCommunity;
        var year1 = req.params.year;
        console.log(Date() + " - DELETE /span-univ-stats/" + autComm + "/" + year1);

        SpanUNivStatsdb.remove({ autCommunity: autComm, year: parseInt(year1) });

        res.sendStatus(200);



    });


    app.post(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {
        var autComm = req.params.autCommunity;
        var year = req.params.year;
        console.log(Date() + " - POST /span-univ-stats" + autComm + "/" + year);
        res.sendStatus(405);
    });


    app.put(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {
        var autComm = req.params.autCommunity;
        var year = req.params.year;
        var stat = req.body;

        if (autComm != stat.autCommunity || year != stat.year) {
            res.sendStatus(409);
            console.warn(Date() + "  - Hacking attemp!");
            return;
        }

        SpanUNivStatsdb.update({ "autCommunity": autComm, "year": parseInt(year) }, stat, (err, numUpdated) => {
            console.log(" - Updated" + numUpdated);
        });

        res.sendStatus(200);


    });



};