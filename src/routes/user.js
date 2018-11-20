import express from 'express';
import * as db from '../lib/db';

const router = express.Router();

router.get('/getuser', async(req, res) => {
    const rows = await db.query(`SELECT * FROM user`);
    // console.log(rows);
    return res.send(rows);
});

router.get('/tes', async(req, res) => {
    const {rows} = await db.testConnect();
    // console.log(rows);
    return res.send(rows);
});

export default router;