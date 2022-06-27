<?php

namespace App\Models\Entidades;

final class Item{
  private $pk_item;
  private $titulo;
  private $descricao;

  public function __construct($array_item = array()){
    if(isset($array_item['pk_item'])){
      $this->pk_item = $array_item['pk_item'];
    }
    if(isset($array_item['titulo'])){
      $this->titulo = $array_item['titulo'];
    }
    if(isset($array_item['descricao'])){
      $this->descricao = $array_item['descricao'];
    }
  }

  public function set_pk_item($pk_item){
    $this->pk_item = $pk_item;
  }

  public function set_titulo($titulo){
    $this->titulo = $titulo;
  }

  public function set_descricao($descricao){
    $this->descricao = $descricao;
  }

  public function get_pk_item(){
    return $this->pk_item;
  }

  public function get_titulo(){
    return $this->titulo;
  }

  public function get_descricao(){
    return $this->descricao;
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
