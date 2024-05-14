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
      var htmlAtualizado = document.documentElement.innerHTML;
  
      // Enviar o HTML atualizado para o servidor
      fetch('/update-html', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newText: document.documentElement.innerHTML }),
      })
      .then(response => {
        // Primeiro, verifique se a resposta está ok e se é realmente JSON
        if (!response.ok) {
          throw new Error('A resposta do servidor não foi OK');
        }
        if (!response.headers.get('content-type')?.includes('application/json')) {
          throw new Error('A resposta esperada deveria ser JSON');
        }
        return response.json(); // Agora podemos tentar analisar como JSON
      })
  }

  function inicializar() {
    adicionarCampoTextoEditavel();
    enviarAlteracoesParaServidor();
}

document.addEventListener('DOMContentLoaded', inicializar);