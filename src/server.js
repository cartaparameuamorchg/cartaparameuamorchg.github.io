let Octokit;

(async () => {
    const octokitModule = await import("@octokit/core");
    Octokit = octokitModule.Octokit;

    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    const port = 3000;

    app.use(bodyParser.json());

    // Substitua 'TOKEN_GITHUB' pelo seu token de acesso pessoal do GitHub
    const octokit = new Octokit({ auth: process.env.TOKEN_GITHUB });

    app.post('/update-text', async (req, res) => {
        const { index, texto } = req.body; // 'index' não é usado neste exemplo

        try {
            const path = 'cartaparameuamorchg/index.html';
            const owner = 'cartaparameuamorchg';
            const repo = 'cartaparameuamorchg.github.io';
            const message = 'Atualizar texto via API';
            const content = Buffer.from(texto).toString('base64');

            const { data: { sha } } = await octokit.request(`GET /repos/${owner}/${repo}/contents/${path}`, {
                owner,
                repo,
                path,
            });

            // Atualizar o arquivo com o novo conteúdo
            await octokit.request(`PUT /repos/${owner}/${repo}/contents/${path}`, {
                owner,
                repo,
                path,
                message,
                content,
                sha, // SHA do arquivo atual é necessário para a atualização
            });

            res.send('Texto atualizado com sucesso no GitHub');
        } catch (error) {
            console.error('Erro ao atualizar o texto:', error);
            res.status(500).send('Erro ao atualizar o texto');
        }
    });

    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
})();