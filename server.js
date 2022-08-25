const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');

// trata o body das reqs
app.use(express.urlencoded({ extended: true }));

const porta = 3000;

app.get('/', (req, res) => {
    res.send(`
    <form action="/" method="POST">
    X: <input type="number" name="xaxis">
    <br><br>
    Y: <input type="number" name="yaxis">
    <br><br>
    <button>Enviar coordenadas</button>
    </form>
    `);
});

// o '?' torna o parametro opcional
// o ':' identifica um parametro
app.get('/testes/:idUsuarios?/:parametro?', (req, res) => {
    // req.params -> /profiles/3 -> partes que vem na rota da url
    // req.query -> /profiles/?chave1=valor1&chave2=valor2&chave3=valor3
    //
    console.log(req.params);
    console.log(req.query);
    res.send(req.params);
});

const caminhoArquivo = path.resolve(__dirname, 'teste.json');
app.post('/', (req, res) => {
    console.log(req.body);
    res.send(`
    <p>Eixo X: ${req.body.xaxis}</p>
    <p>Eixo Y: ${req.body.yaxis}</p>
    `);
    const json = JSON.stringify(req.body, '', 2);
    fs.writeFile(caminhoArquivo, json, { flag: 'w' });
})

app.listen(porta, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});
