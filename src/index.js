import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send({
        status: 'success',
        message: 'Welcome to WeTravel',
    })
})

app.listen(port, () => {
    console.log('Listening on port ', port);
});

export default app;