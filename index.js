const express = require('express');

const app = express();
app.use(express.json());

// 2) connexion de notre serveur à la base mongo
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';  // ou 127.0.0.1 pour certains
const dbName = 'fullstack2023';
let db
MongoClient.connect(url, function (_err, client) {
    db = client.db(dbName);
    console.log("Connexion réussi avec Mongo DB et compass");

});
// // 3.1)Get All countries
app.get('/equipes', (req, res) => {
    db.collection('equipe').find({}).toArray(function (err, data) {
        if (err) {
            console.log(err)
            throwerr
        }
        res.status(201).json(data)
    })
})
// //3.2) Post new equipe
app.post('/equipes', async (req, res) => {
    try {
        const equipeData = req.body
        const equipe = await db.collection('equipe').insertOne(equipeData)
        res.status(200).json(equipe)
    } catch (err) {
        console.log(err)
        throw err
    }
})
// //3.2) delete new equipe
app.delete('/equipes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const equipe = await db.collection('equipe').deleteOne({ id })
        res.status(200).json(equipe)
    } catch (err) {
        console.log(err)
        throw err
    }
})
// //3.2)get new equipe
app.get('/equipes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const equipe = await db.collection('equipe').find({ id }).toArray(function (err, docs) {
            if (err) {
                console.log(err)
                throwerr
            }
            res.status(200).json(docs)
        }
        )
    } catch (err) {
        console.log(err)
        throw err
    }
})
//modifier one equipe
app.put('/equipes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const replacementEquipe = req.body
        const equipe = await db.collection('equipe').replaceOne({ id }, replacementEquipe)
        res.status(200).json(equipe)
}catch (err) {
        console.log(err)
        throw err
    }
})
// 1) mettre le serveur à l'écoute(en marche) sur le port 85
app.listen(8085,
    () => { console.log("Serveur Express a l ecoute sur le port 85"); }
);