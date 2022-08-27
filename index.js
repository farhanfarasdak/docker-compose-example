const express = require('express')
const bodyParser = require('body-parser')
const pool = require('./db')
const app = express()
const jsonParser = bodyParser.json()

app.get('/', async (req, res) => {
  try{
    const data = await pool.query(`SELECT * FROM schools`)
    res.send(data.rows)
  } catch {
    res.status(500).send('Error Occurs')
  }
})

app.post('/', jsonParser, async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO schools (name, address) VALUES ($1,$2)",
      [req.body.name, req.body.address])
    res.status(201).send("Data Inserted")
  } catch (error) {
    res.status(500).send('Error Occurs')
  }
})

app.get('/setup', async (req, res) => {
  try{
    await pool.query(`CREATE TABLE schools(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      address VARCHAR(100)
    )`)
    res.send('DB Created')
  }catch(error){
    res.status(500).send('Error occurs')
  }
})

app.listen(3000, (req, res) => {
  console.log("Running at 3000")
}) 