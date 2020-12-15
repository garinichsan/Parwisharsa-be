
Log = require('./logModel');

// Handle index actions
exports.index = function (req, res) {
    Log.get(function (err, objek) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }

        res.json({
            status: "success",
            message: "Log retrieved successfully",
            data: objek
        });
    });
};