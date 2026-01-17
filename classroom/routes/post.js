const express = require('express');
const app = express();
const router = express.Router();

// Post routes
router.get('/', (req, res) => {
    res.send('This is post route. ');
});

router.get('/about', (req, res) => {
    res.send('This is post about route. ');
});

router.get('/search', (req, res) => {
    res.send('This is search route. ');
});
router.get('/:id', (req, res) => {
    res.send('This is post route. ');
});

module.exports = router;