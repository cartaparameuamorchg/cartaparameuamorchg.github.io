let Octokit;

(async () => {
  const octokitModule = await import("@octokit/core");
  Octokit = octokitModule.Octokit;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Substitua 'TOKEN_GITHUB' pelo seu token de acesso pessoal do GitHub
const octokit = new Octokit({ auth: process.env.TOKEN_GITHUB });

app.post('/update-text', async (req, res) => {
    const { filePath, content, commitMessage } = req.body;

    try {
        // Obter o SHA do arquivo atual
        const { data: { sha } } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: 'cartaparameuamorchg',
            repo: 'cartaparameuamorchg.github.io',
            path: filePath,
        });

        // Atualizar o arquivo
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: 'cartaparameuamorchg',
            repo: 'cartaparameuamorchg.github.io',
            path: filePath,
            message: commitMessage,
            content: Buffer.from(content).toString('base64'),
            sha,
        });

        res.json({ success: true, message: 'Conteúdo atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar o conteúdo:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar o conteúdo' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
})();