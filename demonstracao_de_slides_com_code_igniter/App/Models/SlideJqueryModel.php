<?php

namespace App\Models;

use App\Models\PrimordialModel;
use App\Models\Entidades\Item;
use App\Models\Entidades\Subitem;

final class SlideJqueryModel extends PrimordialModel{

  public function __construct(){
    parent::__construct();
  }

  public function selecionar_ultimos_oito_itens(){
    $builder = $this->get_banco_de_dados()->table('item');
    $builder->select('pk_item, titulo, descricao');
    $builder->orderBy('titulo ASC');
    $builder->limit('8');

    $query = $builder->get();
    $array_resultado = $query->getResult('array');

    $array_melhorado = array();
    foreach($array_resultado as $array_valores_do_banco_de_dados){
      $item = new Item($array_valores_do_banco_de_dados);
      $array_melhorado[] = $item;
    }
    $array_resultado = $array_melhorado;

    return $array_resultado;
  }

  public function selecionar_ultimos_seis_subitens_do_item($pk_item){
    $builder = $this->get_banco_de_dados()->table('subitem');
    $builder->select('pk_subitem, fk_item, titulo, descricao');
    $builder->where('fk_item =', $pk_item);
    $builder->orderBy('titulo ASC');
    $builder->limit('6');

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

}
