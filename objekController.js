// Import contact model
Objek = require('./objekModel');
Log = require('./logModel');

// Handle index actions
exports.index = function (req, res) {
    Objek.get(function (err, objek) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }

        res.json({
            status: "success",
            message: "Objek retrieved successfully",
            data: objek
        });
    });
};

// Handle create objek actions
exports.new = function (req, res) {
    var objek = new Objek();
    objek.name = req.body.name ? req.body.name : objek.name;
    objek.harga = req.body.harga;
    objek.desc = req.body.desc;
    objek.owner = req.body.owner;
    // save the objek and check for errors
    objek.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            status: "success",
            message: 'New objek created!',
            data: objek
        });
    });

    //SAVE lOG
    var log = new Log();
    log.action = "create";
    log.target = objek.id;
    log.status = "success";
    log.data = objek;
    log.save();
};

// Handle view objek info
exports.view = function (req, res) {
    Objek.findById(req.params._id, function (err, objek) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Objek details loading..',
            data: objek
        });
    });
};

// Handle update objek info
exports.update = function (req, res) {
    Objek.findById(req.params.objek_id, function (err, objek) {
        if (err)
            res.send(err);
        objek.name = req.body.name ? req.body.name : objek.name;
        objek.harga = req.body.harga ? req.body.harga : objek.harga;
        objek.desc = req.body.desc ? req.body.desc : objek.desc;
        objek.owner = req.body.owner ? req.body.owner : objek.owner;

        // save the objek and check for errors
        objek.save(function (err) {
            if (err) 
                res.json(err);
            res.json({
                message: 'Objek Info updated',
                data: objek
            });
        });

        //SAVE lOG
        var log = new Log();
        log.action = "update";
        log.target = objek.id;
        log.status = "success";
        log.data = objek;
        log.save();
    });
};

// Handle delete objek
exports.delete = function (req, res) {
    Objek.findById(req.params.objek_id, function (err, objek) {
        if (err)
            res.send(err);
        //SAVE lOG
        var log = new Log();
        log.action = "delete";
        log.target = objek.id;
        log.status = "success";
        log.data = objek;
        log.save();
    });
    Objek.remove({
        _id: req.params.objek_id
    }, function (err, objek) {
        if (err) 
            res.send(err);
        res.json({
            status: "success",
            message: 'Objek deleted',
            data: objek
        });
    });
};