$(document).ready(function(){
  const $div_local_da_seta_para_esquerda = $("#div_local_da_seta_para_esquerda");
  const $div_conteudo_do_slide = $("#div_conteudo_do_slide");
  const $itens_do_slide = $(".link_item");
  const $div_local_da_seta_para_direita = $("#div_local_da_seta_para_direita");
  const $div_local_dos_botoes = $("#div_local_dos_botoes");
  const $div_parar_slide = $("#div_parar_slide");
  const $div_passar_slide = $("#div_passar_slide");
  const $marcadores_do_slide = $(".marcador_do_slide");
  const $subitens_do_slide = $(".link_subitem");
  
  let numero_do_item_atual = 1;
  let parar_movimento_automatico = true;
  let na_animacao_de_deslocamento = false;
  const intervalo_de_tempo_do_movimento_automatico = 3; /* Em segundos */
  
  passar_slide_automaticamente();
  
  /* A cada período de tempo o slide passa automaticamente */
  function passar_slide_automaticamente(){
    setTimeout(function(){
      if(!parar_movimento_automatico){
        animacao_de_deslocamento(0);
      }
      passar_slide_automaticamente();
    }, intervalo_de_tempo_do_movimento_automatico * 1000);
  }
  
  /* O movimento só deve ocorrer quando a aba do navegador estiver em foco */
  let parar_movimento_automatico_backup = parar_movimento_automatico;
  $(window).blur(function(){
    parar_movimento_automatico_backup = parar_movimento_automatico;
    parar_movimento_automatico = true;
  });
  $(window).focus(function(){
    parar_movimento_automatico = parar_movimento_automatico_backup;
  });
  
  /* Funcionamento da seta para esquerda */
  $div_local_da_seta_para_esquerda.mouseup(function(){
    if(na_animacao_de_deslocamento){
      return;
    }
    
    $itens_do_slide.eq(numero_do_item_atual - 1).addClass("tag_oculta");
    $marcadores_do_slide.eq(numero_do_item_atual - 1).removeClass("marcado");
    
    numero_do_item_atual = numero_do_item_atual - 1;
    if(numero_do_item_atual < 1){
      numero_do_item_atual = $itens_do_slide.length;
    }
    
    $itens_do_slide.eq(numero_do_item_atual - 1).removeClass("tag_oculta");
    $marcadores_do_slide.eq(numero_do_item_atual - 1).addClass("marcado");
    
    mostrar_subitens();
  });
  
  /* Funcionamento da seta para direita */
  $div_local_da_seta_para_direita.mouseup(function(){
    if(na_animacao_de_deslocamento){
      return;
    }
    
    $itens_do_slide.eq(numero_do_item_atual - 1).addClass("tag_oculta");
    $marcadores_do_slide.eq(numero_do_item_atual - 1).removeClass("marcado");
    
    numero_do_item_atual = numero_do_item_atual + 1;
    if(numero_do_item_atual > $itens_do_slide.length){
      numero_do_item_atual = 1;
    }
    
    $itens_do_slide.eq(numero_do_item_atual - 1).removeClass("tag_oculta");
    $marcadores_do_slide.eq(numero_do_item_atual - 1).addClass("marcado");
    
    mostrar_subitens();
  });
  
  /* Impedindo clique duplo selecionar o texto */
  $div_local_da_seta_para_esquerda.mousedown(function(evento){
    evento.preventDefault();
  });
  $div_local_da_seta_para_direita.mousedown(function(evento){
    evento.preventDefault();
  });
  $div_local_dos_botoes.mousedown(function(evento){
    evento.preventDefault();
  });
  
  /* Funcionamento da div parar slide */
  $div_parar_slide.click(function(){
    if($div_parar_slide.hasClass("marcado")){
      return;
    }
    $div_parar_slide.addClass("marcado");
    $div_passar_slide.removeClass("marcado");
    parar_movimento_automatico = true;
  });
  
  /* Funcionamento da div passar slide */
  $div_passar_slide.click(function(){
    if($div_passar_slide.hasClass("marcado")){
      return;
    }
    $div_passar_slide.addClass("marcado");
    $div_parar_slide.removeClass("marcado");
    parar_movimento_automatico = false;
  });
  
  /* Funcionamento dos marcadores do slide */
  $marcadores_do_slide.click(function(){
    if(na_animacao_de_deslocamento){
      return;
    }
    
    $itens_do_slide.each(function(){
      $(this).addClass("tag_oculta");
    });
    
    $marcadores_do_slide.each(function(){
      $(this).removeClass("marcado");
    });
    
    const indice = $(this).index(".marcador_do_slide");
    $itens_do_slide.eq(indice).removeClass("tag_oculta");
    $(this).addClass("marcado");
    
    numero_do_item_atual = indice + 1;
    mostrar_subitens();
  });
  
  /* Mostrando os subitens do item do slide */
  function mostrar_subitens(){
    $subitens_do_slide.each(function(){
      $(this).addClass("tag_oculta");
      
      let numero_do_item_deste_subitem = $(this).children(".referencia_do_item_no_slide").text();
      
      if(isNaN(numero_do_item_deste_subitem) || numero_do_item_deste_subitem % 1 != 0 || numero_do_item_deste_subitem <= 0){
        return; //continue
      }
      
      numero_do_item_deste_subitem = parseInt(numero_do_item_deste_subitem, 10);
      
      if(numero_do_item_deste_subitem == numero_do_item_atual){
        $(this).removeClass("tag_oculta");
        
        //A animação abaixo é opcional.
        //$(this).hide();
        //$(this).fadeIn({duration: 500, easing: "linear"});
      }
    });
  }
  
  /* Animação de deslocamento */
  function animacao_de_deslocamento(largura_percorrida){
    const $item_que_esta_indo = $itens_do_slide.eq(numero_do_item_atual - 1);
    
    let numero_do_proximo_item = numero_do_item_atual + 1;
    if(numero_do_proximo_item > $itens_do_slide.length){
      numero_do_proximo_item = 1;
    }
    const $item_que_esta_vindo = $itens_do_slide.eq(numero_do_proximo_item - 1);
    
    $item_que_esta_vindo.removeClass("tag_oculta");
    
    const largura = $item_que_esta_indo.outerWidth();
    
    if(largura_percorrida >= largura){
      $item_que_esta_vindo.css("top", "0px");
      $item_que_esta_vindo.css("left", "0px");
      
      $item_que_esta_indo.css("top", "0px");
      $item_que_esta_indo.css("left", "0px");
      $item_que_esta_indo.addClass("tag_oculta");
      
      na_animacao_de_deslocamento = false;
      
      $marcadores_do_slide.eq(numero_do_item_atual - 1).removeClass("marcado");
      
      numero_do_item_atual = numero_do_item_atual + 1;
      if(numero_do_item_atual > $itens_do_slide.length){
        numero_do_item_atual = 1;
      }
      
      $marcadores_do_slide.eq(numero_do_item_atual - 1).addClass("marcado");
      
      mostrar_subitens();
      
      return;
    }
    
    if(largura_percorrida === 0){
      na_animacao_de_deslocamento = true;
      
      const posicao_vertical = $div_conteudo_do_slide.offset().top;
      const posicao_horizontal = $item_que_esta_indo.offset().left + largura;
      
      $item_que_esta_vindo.offset({left: posicao_horizontal, top: posicao_vertical});
      
      $item_que_esta_indo.offset({top: posicao_vertical});
    }
    
    let unidade_de_movimento = 10;
    largura_percorrida = largura_percorrida + unidade_de_movimento;
    
    setTimeout(function(){
      $item_que_esta_indo.css("left", -largura_percorrida+"px");
      
      const posicao_atual = $item_que_esta_vindo.offset().left;
      $item_que_esta_vindo.offset({left: posicao_atual - unidade_de_movimento});
      
      animacao_de_deslocamento(largura_percorrida);
    }, 1);
  }
});
