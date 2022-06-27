<?php

namespace App\Models\Entidades;

final class Subitem{
  private $pk_subitem;
  private $fk_item;
  private $titulo;
  private $descricao;
  private $item;

  public function __construct($array_subitem = array()){
    if(isset($array_subitem['pk_subitem'])){
      $this->pk_subitem = $array_subitem['pk_subitem'];
    }
    if(isset($array_subitem['fk_item'])){
      $this->fk_item = $array_subitem['fk_item'];
    }
    if(isset($array_subitem['titulo'])){
      $this->titulo = $array_subitem['titulo'];
    }
    if(isset($array_subitem['descricao'])){
      $this->descricao = $array_subitem['descricao'];
    }
    if(isset($array_subitem['item'])){
      $this->item = $array_subitem['item'];
    }
  }

  public function set_pk_subitem($pk_subitem){
    $this->pk_subitem = $pk_subitem;
  }

  public function set_fk_item($fk_item){
    $this->fk_item = $fk_item;
  }

  public function set_titulo($titulo){
    $this->titulo = $titulo;
  }

  public function set_descricao($descricao){
    $this->descricao = $descricao;
  }

  public function set_item($item){
    $this->item = $item;
  }

  public function get_pk_subitem(){
    return $this->pk_subitem;
  }

  public function get_fk_item(){
    return $this->fk_item;
  }

  public function get_titulo(){
    return $this->titulo;
  }

  public function get_descricao(){
    return $this->descricao;
  }

  public function get_item(){
    return $this->item;
  }

  public function quantidade_minima_de_caracteres($atributo){
    switch($atributo){
      case 'titulo':
        return 2;
      case 'descricao':
        return 20;
    }
    return -1;
  }

  // O método abaixo deve ser sempre igual ou mais restritivo que o banco de dados
  public function quantidade_maxima_de_caracteres($atributo){
    switch($atributo){
      case 'titulo':
        return 120;
      case 'descricao':
        return 1000;
    }
    return -1;
  }

}
