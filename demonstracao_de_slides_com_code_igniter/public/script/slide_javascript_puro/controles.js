window.addEventListener("DOMContentLoaded", function(){
  const div_local_da_seta_para_esquerda = document.getElementById("div_local_da_seta_para_esquerda");
  const itens_do_slide = document.getElementsByClassName("link_item");
  const div_local_da_seta_para_direita = document.getElementById("div_local_da_seta_para_direita");
  const div_local_dos_botoes = document.getElementById("div_local_dos_botoes");
  const div_parar_slide = document.getElementById("div_parar_slide");
  const div_passar_slide = document.getElementById("div_passar_slide");
  const marcadores_do_slide = document.getElementsByClassName("marcador_do_slide");
  const subitens_do_slide = document.getElementsByClassName("link_subitem");
  
  let numero_do_item_atual = 1;
  let parar_movimento_automatico = true;
  let na_animacao_de_deslocamento = false;
  const intervalo_de_tempo_do_movimento_automatico = 3; /* Em segundos */
  
  setTimeout(passar_slide_automaticamente, intervalo_de_tempo_do_movimento_automatico * 1000);
  
  /* A cada período de tempo o slide passa automaticamente */
  function passar_slide_automaticamente(){
    if(!parar_movimento_automatico){
      animacao_de_deslocamento(0);
    }
    setTimeout(passar_slide_automaticamente, intervalo_de_tempo_do_movimento_automatico * 1000);
  }
  
  /* O movimento só deve ocorrer quando a aba do navegador estiver em foco */
  let parar_movimento_automatico_backup = parar_movimento_automatico;
  window.addEventListener("blur", function(){
    parar_movimento_automatico_backup = parar_movimento_automatico;
    parar_movimento_automatico = true;
  });
  window.addEventListener("focus", function(){
    parar_movimento_automatico = parar_movimento_automatico_backup;
  });
  
  /* Funcionamento da seta para esquerda */
  div_local_da_seta_para_esquerda.addEventListener("mouseup", function(){
    if(na_animacao_de_deslocamento){
      return;
    }
    
    itens_do_slide[numero_do_item_atual - 1].classList.add("tag_oculta");
    marcadores_do_slide[numero_do_item_atual - 1].classList.remove("marcado");
    
    numero_do_item_atual = numero_do_item_atual - 1;
    if(numero_do_item_atual < 1){
      numero_do_item_atual = itens_do_slide.length;
    }
    
    itens_do_slide[numero_do_item_atual - 1].classList.remove("tag_oculta");
    marcadores_do_slide[numero_do_item_atual - 1].classList.add("marcado");
    
    mostrar_subitens();
  });
  
  /* Funcionamento da seta para direita */
  div_local_da_seta_para_direita.addEventListener("mouseup", function(){
    if(na_animacao_de_deslocamento){
      return;
    }
    
    itens_do_slide[numero_do_item_atual - 1].classList.add("tag_oculta");
    marcadores_do_slide[numero_do_item_atual - 1].classList.remove("marcado");
    
    numero_do_item_atual = numero_do_item_atual + 1;
    if(numero_do_item_atual > itens_do_slide.length){
      numero_do_item_atual = 1;
    }
    
    itens_do_slide[numero_do_item_atual - 1].classList.remove("tag_oculta");
    marcadores_do_slide[numero_do_item_atual - 1].classList.add("marcado");
    
    mostrar_subitens();
  });
  
  /* Impedindo clique duplo selecionar o texto */
  div_local_da_seta_para_esquerda.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  div_local_da_seta_para_direita.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  div_local_dos_botoes.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  
  /* Funcionamento da div parar slide */
  div_parar_slide.addEventListener("click", function(){
    if(div_parar_slide.classList.contains("marcado")){
      return;
    }
    div_parar_slide.classList.add("marcado");
    div_passar_slide.classList.remove("marcado");
    parar_movimento_automatico = true;
  });
  
  /* Funcionamento da div passar slide */
  div_passar_slide.addEventListener("click", function(){
    if(div_passar_slide.classList.contains("marcado")){
      return;
    }
    div_passar_slide.classList.add("marcado");
    div_parar_slide.classList.remove("marcado");
    parar_movimento_automatico = false;
  });
  
  /* Funcionamento dos marcadores do slide */
  for(let i = 0; i < marcadores_do_slide.length; i++){
    marcadores_do_slide[i].numero_da_tag_no_array = i;
    marcadores_do_slide[i].addEventListener("click", evento_do_marcador_do_slide);
  }
  function evento_do_marcador_do_slide(evento){
    if(na_animacao_de_deslocamento){
      return;
    }
    
    for(let i = 0; i < itens_do_slide.length; i++){
      itens_do_slide[i].classList.add("tag_oculta");
      marcadores_do_slide[i].classList.remove("marcado");
    }
    
    itens_do_slide[evento.currentTarget.numero_da_tag_no_array].classList.remove("tag_oculta");
    marcadores_do_slide[evento.currentTarget.numero_da_tag_no_array].classList.add("marcado");
    
    numero_do_item_atual = evento.currentTarget.numero_da_tag_no_array + 1;
    mostrar_subitens();
  }
  
  /* Mostrando os subitens do item do slide */
  function mostrar_subitens(){
    for(let i = 0; i < subitens_do_slide.length; i++){
      subitens_do_slide[i].classList.add("tag_oculta");
      
      let numero_do_item_deste_subitem = subitens_do_slide[i].querySelector(".referencia_do_item_no_slide").innerText;
      
      if(!isNaN(numero_do_item_deste_subitem) && numero_do_item_deste_subitem % 1 === 0 && numero_do_item_deste_subitem > 0){
        numero_do_item_deste_subitem = parseInt(numero_do_item_deste_subitem, 10);
        if(numero_do_item_deste_subitem === numero_do_item_atual){
          subitens_do_slide[i].classList.remove("tag_oculta");
        }
      }
    }
  }
  
  /* Animação de deslocamento */
  function animacao_de_deslocamento(largura_percorrida){
    const tag_que_esta_indo = itens_do_slide[numero_do_item_atual - 1];
    
    let numero_do_proximo_item = numero_do_item_atual + 1;
    if(numero_do_proximo_item > itens_do_slide.length){
      numero_do_proximo_item = 1;
    }
    const tag_que_esta_vindo = itens_do_slide[numero_do_proximo_item - 1];
    
    tag_que_esta_vindo.classList.remove("tag_oculta");
    
    let largura = 0;
    var estilo_computado = window.getComputedStyle(tag_que_esta_indo);
    largura += parseInt(estilo_computado.borderRightWidth, 10);
    largura += parseInt(estilo_computado.borderLeftWidth, 10);
    largura += parseInt(estilo_computado.paddingRight, 10);
    largura += parseInt(estilo_computado.paddingLeft, 10);
    largura += parseInt(estilo_computado.width, 10);
    
    if(largura_percorrida >= largura){
      tag_que_esta_vindo.style.top = "0px";
      tag_que_esta_vindo.style.left = "0px";
      
      tag_que_esta_indo.style.top = "0px";
      tag_que_esta_indo.style.left = "0px";
      tag_que_esta_indo.classList.add("tag_oculta");
      
      na_animacao_de_deslocamento = false;
      
      marcadores_do_slide[numero_do_item_atual - 1].classList.remove("marcado");
      
      numero_do_item_atual = numero_do_item_atual + 1;
      if(numero_do_item_atual > itens_do_slide.length){
        numero_do_item_atual = 1;
      }
      
      marcadores_do_slide[numero_do_item_atual - 1].classList.add("marcado");
      
      mostrar_subitens();
      
      return;
    }
    
    let altura = 0;
    var estilo_computado = window.getComputedStyle(tag_que_esta_indo);
    altura += parseInt(estilo_computado.borderTopWidth, 10);
    altura += parseInt(estilo_computado.borderBottomWidth, 10);
    altura += parseInt(estilo_computado.paddingTop, 10);
    altura += parseInt(estilo_computado.paddingBottom, 10);
    altura += parseInt(estilo_computado.height, 10);
    
    if(largura_percorrida === 0){
      na_animacao_de_deslocamento = true;
      
      tag_que_esta_vindo.style.top = -altura + "px";
      if(numero_do_proximo_item === 1){
        tag_que_esta_vindo.style.top = "0px";
      }
      
      tag_que_esta_vindo.style.left = largura + "px";
      
      tag_que_esta_indo.style.top = "0px";
      if(numero_do_proximo_item === 1){
        tag_que_esta_indo.style.top = -altura + "px";
      }
    }
    
    let unidade_de_movimento = 10;
    largura_percorrida = largura_percorrida + unidade_de_movimento;
    
    setTimeout(function(){
      tag_que_esta_indo.style.left = -largura_percorrida + "px";
      
      tag_que_esta_vindo.style.left = largura - largura_percorrida + "px";
      
      animacao_de_deslocamento(largura_percorrida);
    }, 1);
  }
});
