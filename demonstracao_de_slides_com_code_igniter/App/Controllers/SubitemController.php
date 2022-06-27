<?php

namespace App\Controllers;

use App\Models\SubitemModel;

final class SubitemController extends TemplateController{

  public function index(){
    /* Variável que guarda a mensagem da página começa inicialmente vazia */
    $mensagem = '';

    /* Colocando valores iniciais nas variáveis do smarty */
    $array_subitem_valores_iniciais['id'] = '';
    $array_subitem_valores_iniciais['titulo'] = '';
    $array_subitem_valores_iniciais['descricao'] = '';
    $this->get_smarty()->assign('subitem', $array_subitem_valores_iniciais);

    /* Validando o ID de subitem informado na URL */
    $requisicao = service('request');
    $pk_subitem = $requisicao->getGet('id');
    if(!is_numeric($pk_subitem) or $pk_subitem <= 0 or floor($pk_subitem) != $pk_subitem){
      $mensagem = 'ID inválido, o ID do subitem precisa ser um número natural maior que zero.';
    }else{
      /* Consultando informações do subitem */
      $subitem_model = new SubitemModel();

      $array_resultado = $subitem_model->selecionar_subitem_pela_pk($pk_subitem);

      if(isset($array_resultado['mensagem_do_model'])){
        $mensagem = $array_resultado['mensagem_do_model'];
      }else{
        $subitem = $array_resultado[0];

        $id = $subitem->get_pk_subitem();
        $array_subitem['id'] = $id;

        $titulo = $subitem->get_titulo();
        $array_subitem['titulo'] = esc($titulo);

        $descricao = $subitem->get_descricao();
        $descricao = esc($descricao);
        $descricao = $this->acrescentar_quebras_de_linha_xhtml($descricao);
        $array_subitem['descricao'] = $descricao;

        $this->get_smarty()->assign('subitem', $array_subitem);
      }
    }

    $this->get_smarty()->assign('mensagem_da_pagina', $mensagem);
    $this->get_smarty()->display('subitem/subitem.html');
    die;
  }

}
