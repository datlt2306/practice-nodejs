import express from 'express';
const router = express.Router();

router.get('/categories', (req, res) => {
    res.json({
        data: []
    })
});
router.get('/category/:id', (req, res) => {
    console.log('Read a category');
});

module.exports = router;