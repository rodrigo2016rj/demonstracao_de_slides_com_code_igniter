<?php

namespace App\Models;

use App\Models\PrimordialModel;
use App\Models\Entidades\Item;
use App\Models\Entidades\Subitem;

final class ItemModel extends PrimordialModel{

  public function __construct(){
    parent::__construct();
  }

  public function selecionar_item_pela_pk($pk_item){
    $builder = $this->get_banco_de_dados()->table('item');
    $builder->select('pk_item, titulo, descricao');
    $builder->where('pk_item =', $pk_item);

    $query = $builder->get();
    $array_resultado = $query->getResult('array');

    if(count($array_resultado) === 0){
      $mensagem_do_model = "Nenhum item com ID $pk_item foi encontrado no banco de dados do sistema.";
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }else{
      $item = new Item($array_resultado[0]);
      $array_melhorado[] = $item;
      $array_resultado = $array_melhorado;
    }

    return $array_resultado;
  }

  public function selecionar_subitens_do_item($pk_item, $quantidade, $descartar){
    $builder = $this->get_banco_de_dados()->table('subitem');
    $builder->select('pk_subitem, fk_item, titulo, descricao');
    $builder->where('fk_item =', $pk_item);
    $builder->orderBy('titulo ASC');
    $builder->limit($quantidade, $descartar);

    $query = $builder->get();
    $array_resultado = $query->getResult('array');

    $array_melhorado = array();
    foreach($array_resultado as $array_valores_do_banco_de_dados){
      $subitem = new Subitem($array_valores_do_banco_de_dados);
      $array_melhorado[] = $subitem;
    }
    $array_resultado = $array_melhorado;

    return $array_resultado;
  }

  public function contar_subitens_do_item($pk_item){
    $builder = $this->get_banco_de_dados()->table('subitem');
    $builder->where('fk_item =', $pk_item);

    $array_resultado['quantidade'] = $builder->countAllResults();

    return $array_resultado;
  }

}
