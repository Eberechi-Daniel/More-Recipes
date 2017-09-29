import express from 'express';
import bodyParser from 'body-parser';
import recipes from './models/recipes';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    res.status(200);
    res.json({
        name: 'Eberechi',
        message: 'Welcome to More-Recipes'
    });
});
// API route that allows a user to get all recipes in the application
app.get('/api/recipes', (req, res) => {
    res.status(200);
    res.send(recipes);
});
// API route that allows a user add a recipe
app.post('/api/recipes', (req, res) => {
    const item = req.body;
    console.log(item.id);
    if (!item.id) {
        return res.sendStatus(500);
    }
    recipes.push(item);
    res.send(recipes);
});
// API route that allows a user to modify a recipe
app.put('/api/recipes/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(id);
    const existingItem = recipes.filter(r => r.id === id)[0];
    if (!existingItem) {
        const item = req.body;
        item.id = id;
        recipes.push(item);
        res.setHeader('Location', '/api/recipes/', id);
        res.sendStatus(201);
    } else {
        existingItem.name = req.body.name;
        res.sendStatus(204);
    }
});
// API route to delete recipe
app.delete('/app/recipe/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const existingItem = recipes.filter(r => r.id === id)[0];
    if (!existingItem) {
        return res.sendStatus(404);
    }
    recipes = recipes.filter(r => r.id !== id);
    res.sendStatus(204);
});

app.listen(port, () => console.log(`Application started on port ${port}`));