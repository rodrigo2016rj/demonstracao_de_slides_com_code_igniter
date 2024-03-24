class ComponentePaginaSlideReact extends React.Component{
  /* Variáveis auxiliares */
  numero_do_item;
  numero_do_marcador;
  chave_do_react;
  subitem_anterior_apareceu_ou_sumiu;
  
  constructor(props){
    super(props);
    
    this.state = {
      elemento_modelo: props.elemento.cloneNode(true),
      numero_do_item_atual: 1,
      slide_parado: true
    }
    
    props.elemento.remove();
    
    this.mecher_slide_automaticamente();
    
    this.impedir_selecao_de_texto_indesejada = this.impedir_selecao_de_texto_indesejada.bind(this);
    this.ir_para_item_da_esquerda = this.ir_para_item_da_esquerda.bind(this);
    this.ir_para_item_da_direita = this.ir_para_item_da_direita.bind(this);
    this.parar_ou_passar_slide = this.parar_ou_passar_slide.bind(this);
    this.ir_para_item = this.ir_para_item.bind(this);
  }
  
  mecher_slide_automaticamente(){
    setTimeout(function(){
      if(!this.state.slide_parado){
        this.state.numero_do_item_atual++;
        if(this.state.numero_do_item_atual > 8){
          this.state.numero_do_item_atual = 1;
        }
        
        /* Chamando o método setState para renderizar o componente novamente. */
        this.setState(
          {
            elemento_modelo: this.state.elemento_modelo,
            numero_do_item_atual: this.state.numero_do_item_atual,
            slide_parado: this.state.slide_parado
          }
        );
      }
      this.mecher_slide_automaticamente();
    }.bind(this), 3 * 1000);
  }
  
  render(){
    this.numero_do_item = 1;
    this.numero_do_marcador = 1;
    this.chave_do_react = 1;
    this.subitem_anterior_apareceu_ou_sumiu = "nao_se_aplica";
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        if(atributo.nodeName === "class"){
          array_melhorado["className"] = atributo.nodeValue;
        }else{
          array_melhorado[atributo.nodeName] = atributo.nodeValue;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_local_da_seta_para_esquerda":
          array_atributos["onClick"] = this.ir_para_item_da_esquerda;
          array_atributos["onMouseDown"] = this.impedir_selecao_de_texto_indesejada;
        break;
        case "div_local_da_seta_para_direita":
          array_atributos["onClick"] = this.ir_para_item_da_direita;
          array_atributos["onMouseDown"] = this.impedir_selecao_de_texto_indesejada;
        break;
        case "div_local_dos_botoes":
          array_atributos["onMouseDown"] = this.impedir_selecao_de_texto_indesejada;
        break;
        case "div_parar_slide":
          array_atributos["className"] = this.state.slide_parado ? "marcado" : "";
          if(!this.state.slide_parado){
            array_atributos["onClick"] = this.parar_ou_passar_slide;
          }
        break;
        case "div_passar_slide":
          array_atributos["className"] = this.state.slide_parado ? "" : "marcado";
          if(this.state.slide_parado){
            array_atributos["onClick"] = this.parar_ou_passar_slide;
          }
        break;
      }
    }
    if(typeof array_atributos["className"] !== "undefined"){
      switch(array_atributos["className"]){
        case "link_item item_aparece":
        case "link_item item_some":
          array_atributos["className"] = this.item_aparece_ou_nao_no_slide(this.numero_do_item);
          this.numero_do_item++;
        break;
        case "marcador_do_slide marcado":
        case "marcador_do_slide":
          array_atributos["className"] = this.marcador_esta_ou_nao_marcado(this.numero_do_marcador);
          array_atributos["chave"] = this.numero_do_marcador; //HTML precisa disso.
          array_atributos["onClick"] = this.ir_para_item;
          this.numero_do_marcador++;
        break;
        case "link_subitem subitem_aparece primeiro_subitem":
        case "link_subitem subitem_aparece":
        case "link_subitem subitem_some":
          const referencia_do_item = elemento.querySelector(".referencia_do_item_no_slide").innerText;
          array_atributos["className"] = this.subitem_aparece_ou_nao_no_slide(referencia_do_item);
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML faça o texto ser sempre "filho único" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  /* Impedindo clique duplo selecionar o texto */
  impedir_selecao_de_texto_indesejada(evento){
    evento.preventDefault();
  }
  
  ir_para_item_da_esquerda(evento){
    this.state.numero_do_item_atual--;
    if(this.state.numero_do_item_atual < 1){
      this.state.numero_do_item_atual = 8;
    }
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        numero_do_item_atual: this.state.numero_do_item_atual,
        slide_parado: this.state.slide_parado
      }
    );
  }
  
  ir_para_item_da_direita(evento){
    this.state.numero_do_item_atual++;
    if(this.state.numero_do_item_atual > 8){
      this.state.numero_do_item_atual = 1;
    }
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        numero_do_item_atual: this.state.numero_do_item_atual,
        slide_parado: this.state.slide_parado
      }
    );
  }
  
  parar_ou_passar_slide(evento){
    this.state.slide_parado = this.state.slide_parado ? false : true;
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        numero_do_item_atual: this.state.numero_do_item_atual,
        slide_parado: this.state.slide_parado
      }
    );
  }
  
  item_aparece_ou_nao_no_slide(numero_do_item){
    if(this.state.numero_do_item_atual != numero_do_item){
      return "link_item item_some";
    }
    return "link_item item_aparece";
  }
  
  marcador_esta_ou_nao_marcado(numero_do_marcador){
    if(this.state.numero_do_item_atual != numero_do_marcador){
      return "marcador_do_slide";
    }
    return "marcador_do_slide marcado";
  }
  
  ir_para_item(evento){
    const chave = evento.target.attributes["chave"].nodeValue;
    
    this.state.numero_do_item_atual = parseInt(chave, 10);
    
    /* Chamando o método setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        numero_do_item_atual: this.state.numero_do_item_atual,
        slide_parado: this.state.slide_parado
      }
    );
  }
  
  subitem_aparece_ou_nao_no_slide(referencia_do_item){
    if(this.state.numero_do_item_atual != referencia_do_item){
      this.subitem_anterior_apareceu_ou_sumiu = "sumiu"; //Atualiza o valor pois este passou a ser o anterior.
      return "link_subitem subitem_some";
    }
    if(this.subitem_anterior_apareceu_ou_sumiu === "sumiu" || this.subitem_anterior_apareceu_ou_sumiu === "nao_se_aplica"){
      this.subitem_anterior_apareceu_ou_sumiu = "apareceu"; //Atualiza o valor pois este passou a ser o anterior.
      return "link_subitem subitem_aparece primeiro_subitem";
    }
    this.subitem_anterior_apareceu_ou_sumiu = "apareceu"; //Atualiza o valor pois este passou a ser o anterior.
    return "link_subitem subitem_aparece";
  }
}

const div_pagina_slide_react = document.getElementById("div_pagina_slide_react");
const div_componente_pagina_slide_react = document.getElementById("div_componente_pagina_slide_react");

const root = ReactDOM.createRoot(div_componente_pagina_slide_react);
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(ComponentePaginaSlideReact, {elemento: div_pagina_slide_react}, null)
  )
);
