const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
const categoriesPool = require('./DBConfig');


app.get('/', (req, res) => {
    res.send('Simple API homepage');
})
app.listen(5070, () => {
    console.log("Server running on port 5070");
})

app.get('/api/categories', async(req, res) => {
    try {
        const allCategories = await categoriesPool.query(
            'SELECT * FROM categories'
        );
        res.json({ allCategories });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})
app.post('/api/categories', async (req, res) => {
    const { description } = req.body;
    try {
        const newCategory = await categoriesPool.query(
            'INSERT INTO categories (description) VALUES ($1) RETURNING *',
            [description]
        );
        res.json({ 
            message: "New Category added!",
            category: newCategory.rows
         });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})


