const express = require('express');
const app = express();
const router = express.Router();

// User routes
router.get('/', (req, res) => {
    res.send('This is user route. ');
});

router.get('/about', (req, res) => {
    res.send('This is user about route. ');
});

router.get('/search', (req, res) => {
    res.send('This is search route. ');
});

router.get('/:id', (req, res) => {
    res.send('This is user route. ');
});

module.exports = router;