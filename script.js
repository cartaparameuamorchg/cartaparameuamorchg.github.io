var swiper = new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      // autoHeight: true,
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      }
    });

    function adicionarCampoTextoEditavel() {
      // Encontrar todos os elementos blog-slider__text
      var textos = document.querySelectorAll('.blog-slider__text');
  
      // Iterar sobre cada elemento de texto
      textos.forEach(function(texto) {
          // Criar um novo elemento input
          var inputEditavel = document.createElement('textarea');
          // Configurar o input
          inputEditavel.value = texto.innerText; // Definir o valor inicial como o texto atual
          inputEditavel.classList.add('texto-editavel'); // Adicionar uma classe para estilização (opcional)
          inputEditavel.rows = 4; // Definir o número de linhas (para textarea)
  
          // Criar um botão de aplicar
          var botaoAplicar = document.createElement('button');
          botaoAplicar.innerText = 'Aplicar';
          botaoAplicar.classList.add('botao-aplicar'); // Adicionar uma classe para estilização (opcional)
  
          // Limpar o texto atual e adicionar o input editável e o botão
          texto.innerHTML = '';
          texto.appendChild(inputEditavel);
          texto.appendChild(botaoAplicar);
  
          // Adicionar evento de clique ao botão
          botaoAplicar.addEventListener('click', function() {
              var textoAtualizado = document.createElement('div');
              textoAtualizado.classList.add('blog-slider__text');
              textoAtualizado.innerText = inputEditavel.value;
              texto.parentNode.replaceChild(textoAtualizado, texto);
  
              // Enviar o novo HTML para o servidor
              enviarAlteracoesParaServidor();
          });
      });
  }
  
  function enviarAlteracoesParaServidor() {
    // Obter o HTML atualizado do documento
    var htmlAtualizado = document.documentElement.outerHTML; // Use outerHTML para obter todo o HTML, incluindo a tag <html>

    // Enviar o HTML atualizado para o servidor
    fetch('/update-html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: htmlAtualizado }), // Certifique-se de que está enviando um objeto JSON válido
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('A resposta do servidor não foi OK');
        }
        return response.json(); // Espera-se que a resposta também seja JSON
    })
    .then(data => {
        console.log('HTML atualizado com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao atualizar o HTML:', error);
    });
}

  function inicializar() {
    adicionarCampoTextoEditavel();
    enviarAlteracoesParaServidor();
}

document.addEventListener('DOMContentLoaded', inicializar);