<?php

namespace App\Controllers;

use App\Models\ItemModel;

final class ItemController extends TemplateController{
  private const QUANTIDADE_PADRAO_DE_SUBITENS_POR_PAGINA = 10;

  public function index(){
    /* Variável que guarda a mensagem da página começa inicialmente vazia */
    $mensagem = '';

    /* Colocando valores iniciais nas variáveis do smarty */
    $array_item_valores_iniciais['id'] = '';
    $array_item_valores_iniciais['titulo'] = '';
    $array_item_valores_iniciais['descricao'] = '';
    $this->get_smarty()->assign('item', $array_item_valores_iniciais);

    /* Validando o ID de item informado na URL */
    $requisicao = service('request');
    $pk_item = $requisicao->getGet('id');
    if(!is_numeric($pk_item) or $pk_item <= 0 or floor($pk_item) != $pk_item){
      $mensagem = 'ID inválido, o ID do item precisa ser um número natural maior que zero.';
    }else{
      /* Consultando informações do item */
      $item_model = new ItemModel();

      $array_resultado = $item_model->selecionar_item_pela_pk($pk_item);

      if(isset($array_resultado['mensagem_do_model'])){
        $mensagem = $array_resultado['mensagem_do_model'];
      }else{
        $item = $array_resultado[0];

        $id = $item->get_pk_item();
        $array_item['id'] = $id;

        $titulo = $item->get_titulo();
        $array_item['titulo'] = esc($titulo);

        $descricao = $item->get_descricao();
        $descricao = esc($descricao);
        $descricao = $this->acrescentar_quebras_de_linha_xhtml($descricao);
        $array_item['descricao'] = $descricao;

        $this->get_smarty()->assign('item', $array_item);

        /* Chamando método para mostrar os subitens do item */
        $this->mostrar_subitens_do_item($pk_item);
      }
    }

    $this->get_smarty()->assign('mensagem_da_pagina', $mensagem);
    $this->get_smarty()->display('item/item.html');
    die;
  }

  private function mostrar_subitens_do_item($pk_item){
    $item_model = new ItemModel();

    $requisicao = service('request');

    /* Preparando a paginação */
    $quantidade_por_pagina = self::QUANTIDADE_PADRAO_DE_SUBITENS_POR_PAGINA;
    $quantidade_de_paginas = $this->calcular_quantidade_de_paginas_dos_subitens($pk_item, $quantidade_por_pagina);

    $pagina = (int) $requisicao->getGet('pagina');
    if($pagina < 1){
      $pagina = 1;
    }

    if($pagina > $quantidade_de_paginas){
      $pagina = $quantidade_de_paginas;
    }

    $this->get_smarty()->assign('pagina_atual_dos_subitens', $pagina);
    $this->get_smarty()->assign('ultima_pagina_dos_subitens', $quantidade_de_paginas);

    $descartar = $quantidade_por_pagina * $pagina - $quantidade_por_pagina;
    $descartar = max($descartar, 0);

    /* Selecionando os subitens */
    $subitens = $item_model->selecionar_subitens_do_item($pk_item, $quantidade_por_pagina, $descartar);
    $array_subitens = array();
    foreach($subitens as $subitem){
      $array_subitem = array();

      $id = $subitem->get_pk_subitem();
      $array_subitem['id'] = $id;

      $titulo = $subitem->get_titulo();
      $array_subitem['titulo'] = esc($titulo);

      $descricao = $subitem->get_descricao();
      $descricao = esc($descricao);
      $descricao = $this->acrescentar_quebras_de_linha_xhtml($descricao);
      $array_subitem['descricao'] = $descricao;

      $array_subitens[] = $array_subitem;
    }

    $this->get_smarty()->assign('subitens', $array_subitens);
  }

  private function calcular_quantidade_de_paginas_dos_subitens($pk_item, $quantidade_por_pagina){
    $item_model = new ItemModel();

    $array_resultado = $item_model->contar_subitens_do_item($pk_item);
    $quantidade_de_paginas = ceil($array_resultado['quantidade'] / $quantidade_por_pagina);

    return $quantidade_de_paginas;
  }

}
