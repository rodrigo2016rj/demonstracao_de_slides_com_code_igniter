<?php

namespace App\Models;

use App\Models\PrimordialModel;
use App\Models\Entidades\Subitem;

final class SubitemModel extends PrimordialModel{

  public function __construct(){
    parent::__construct();
  }

  public function selecionar_subitem_pela_pk($pk_subitem){
    $builder = $this->get_banco_de_dados()->table('subitem');
    $builder->select('pk_subitem, titulo, descricao');
    $builder->where('pk_subitem =', $pk_subitem);

    $query = $builder->get();
    $array_resultado = $query->getResult('array');

    if(count($array_resultado) === 0){
      $mensagem_do_model = "Nenhum subitem com ID $pk_subitem foi encontrado no banco de dados do sistema.";
      $array_resultado['mensagem_do_model'] = $mensagem_do_model;
    }else{
      $subitem = new Subitem($array_resultado[0]);
      $array_melhorado[] = $subitem;
      $array_resultado = $array_melhorado;
    }

    return $array_resultado;
  }

}
