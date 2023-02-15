import express from 'express';

const router = express.Router();

const {
    getListUser,
    createUser,
    getDetailUser,
    login,
    getCountUsers,
    deleteUSer
} = require('../controller/userController');

router.get('/', getListUser);
router.get('/:id', getDetailUser)
router.post('/', createUser);
router.post('/login', login);
router.get('/get/count', getCountUsers);
router.delete('/:id', deleteUSer);

module.exports = router;