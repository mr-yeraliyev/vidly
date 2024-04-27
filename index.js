const express = require('express')
const Joi = require('joi');

const genres = [
    {
        id: 1,
        name: 'Comedy'
    },
    {
        id: 2,
        name: 'Drama'
    },
    {
        id: 3,
        name: 'Art'
    }
]

const app = express()

app.use(express.json())

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
})

app.get('/api/genres', (req, res) => {
  res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const  result = genres.find((g) => g.id === parseInt(req.params.id))
    if (!result) return res.status(404).send('The genre with the given ID was not found.')

    res.send(result)
})

app.delete('/api/genres/:id', (req, res) => {
    const  result = genres.find((g) => g.id === parseInt(req.params.id))
    if (!result) return res.status(404).send('The genre with the given ID was not found.')

    const index = genres.indexOf(result)
    if (index !== -1) genres.splice(index, 1)
    res.send(result) // empty response body
})

app.post('/api/genres', (req, res) => {
    const { error,value } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    genres.push({ id: genres.length + 1, ...value })
    res.send(genres[genres.length - 1]) // empty response body
})

app.put('/api/genres/:id', (req, res) => {
    const  result = genres.find((g) => g.id === parseInt(req.params.id))
    if (!result) return res.status(404).send('The genre with the given ID was not found.')
    const { error,value } = schema.validate(req.body)
    if (error) return res.status(400).send(`Invalid value ${error.details[0].context.label}: ${error.details[0].message}`);
    
    result.name = value.name;
    res.send(result)
    
})



console.log('Listenig port 3000...');
app.listen(3000)
