import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/brightness', (req, res) => {
  const value = req.query.value;
  exec(`brightnessctl set ${value}`, (error) => {
    if (error) {
      console.error(`Erro ao alterar brilho: ${error.message}`);
      return res.status(500).send("Erro");
    }
    res.send("Brilho atualizado");
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

