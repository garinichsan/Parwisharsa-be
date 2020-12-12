// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Parwisharsa crafted with love!'
    });
});

var userController = require('./userController');
var objekController = require('./objekController');

// user routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

// user routes
router.route('/objek')
    .get(objekController.index)
    .post(objekController.new);
router.route('/objek/:objek_id')
    .get(objekController.view)
    .patch(objekController.update)
    .put(objekController.update)
    .delete(objekController.delete);

// Export API routes
module.exports = router;