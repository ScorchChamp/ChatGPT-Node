const express = require('express')
require('dotenv').config()

const cors = require('cors')
const app = express()
app.use(cors())

const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

app.get('/generatePoem/:name/:keywords', async (reqs, res) => {
    const response = await openai.createCompletion({
        model: 'text-curie-001',
        prompt: `Write a poem about ${reqs.params.name} that includes the keywords ${reqs.params.keywords}`,
        max_tokens: 200,
        temperature: 0.5
    })
    console.log(response.data.usage)
    res.send(response.data.choices)
})

app.listen(5000, () => console.log("I started! on port 5000"))