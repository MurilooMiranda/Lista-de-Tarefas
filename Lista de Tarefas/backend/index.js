const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const lerDados = () => {
    try {
        const conteudo = fs.readFileSync('./db.json', 'utf-8');
        return JSON.parse(conteudo);
    } catch (error) {
        
        return { tarefas: [] };
    }
};

const escreverDados = (dados) => {
    const dadosConvertidos = JSON.stringify(dados, null, 2);
    fs.writeFileSync('./db.json', dadosConvertidos, 'utf-8');
};

app.get('/tarefas', (req, res) => {
    const dados = lerDados();
    res.json(dados.tarefas);
});

app.post('/tarefas', (req, res) => {
    const dados = lerDados();
    const novaTarefa = {
        id: Date.now(),
        text: req.body.text,
        concluida: false
    };
    dados.tarefas.push(novaTarefa);
    escreverDados(dados);
    res.status(201).json(novaTarefa);
});

app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const dados = lerDados();
    dados.tarefas = dados.tarefas.filter(tarefa => tarefa.id !== id);
    escreverDados(dados);
    res.status(204).send();
});

app.patch('/tarefas/:id/concluir', (req, res) => {
    const id = Number(req.params.id);
    const dados = lerDados();

    let tarefaAtualizada;
    dados.tarefas = dados.tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
            tarefaAtualizada = tarefa;
        }
        return tarefa;
    });

    if (!tarefaAtualizada) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    escreverDados(dados);
    res.json(tarefaAtualizada);
});

app.patch('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const { text } = req.body; 
    const dados = lerDados();

    let tarefaAtualizada;
    dados.tarefas = dados.tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.text = text; 
            tarefaAtualizada = tarefa;
        }
        return tarefa;
    });

    escreverDados(dados);

    if (tarefaAtualizada) {
        res.json(tarefaAtualizada);
    } else {
        res.status(404).json({ message: "Tarefa não encontrada" });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});
