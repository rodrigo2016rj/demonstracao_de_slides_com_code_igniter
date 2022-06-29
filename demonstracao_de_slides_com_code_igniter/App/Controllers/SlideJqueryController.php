<?php

namespace App\Controllers;

use App\Models\SlideJqueryModel;

final class SlideJqueryController extends TemplateController{

  public function index(){
    $this->mostrar_itens();

    $this->get_smarty()->display('slide_jquery/slide_jquery.html');
    die;
  }

  private function mostrar_itens(){
    $slide_jquery_model = new SlideJqueryModel();

    /* Preparando o resultado */
    $itens = $slide_jquery_model->selecionar_ultimos_oito_itens();
    $array_itens = array();
    $posicao_no_slide = 0;
    foreach($itens as $item){
      $id_do_item = $item->get_pk_item();
      $array_item['id'] = $id_do_item;

      $posicao_no_slide++;
      $array_item['posicao_no_slide'] = $posicao_no_slide;

      $titulo = $item->get_titulo();
      $array_item['titulo'] = esc($titulo);

      $descricao_reduzida = $item->get_descricao();
      if(mb_strlen($descricao_reduzida) > 300){
        $descricao_reduzida = mb_substr($descricao_reduzida, 0, 300);
        $ultimo_caractere = mb_substr($descricao_reduzida, -1);
        if($ultimo_caractere === ' ' or $ultimo_caractere === '.'){
          $descricao_reduzida = mb_substr($descricao_reduzida, 0, 299);
          $ultimo_caractere = mb_substr($descricao_reduzida, -1);
          if($ultimo_caractere === '.'){
            $descricao_reduzida = mb_substr($descricao_reduzida, 0, 298);
          }
        }
        $descricao_reduzida .= '...';
      }
      $descricao_reduzida = esc($descricao_reduzida);
      $descricao_reduzida = $this->acrescentar_quebras_de_linha_xhtml($descricao_reduzida);
      $array_item['descricao_reduzida'] = $descricao_reduzida;

      $array_subitens = array();
      $subitens = $slide_jquery_model->selecionar_ultimos_seis_subitens_do_item($id_do_item);
      foreach($subitens as $subitem){
        $id_do_subitem = $subitem->get_pk_subitem();
        $array_subitem['id'] = $id_do_subitem;

        $titulo = $subitem->get_titulo();
        $array_subitem['titulo'] = esc($titulo);

        $descricao_reduzida = $subitem->get_descricao();
        if(mb_strlen($descricao_reduzida) > 250){
          $descricao_reduzida = mb_substr($descricao_reduzida, 0, 250);
          $ultimo_caractere = mb_substr($descricao_reduzida, -1);
          if($ultimo_caractere === ' ' or $ultimo_caractere === '.'){
            $descricao_reduzida = mb_substr($descricao_reduzida, 0, 249);
            $ultimo_caractere = mb_substr($descricao_reduzida, -1);
            if($ultimo_caractere === '.'){
              $descricao_reduzida = mb_substr($descricao_reduzida, 0, 248);
            }
          }
          $descricao_reduzida .= '...';
        }
        $descricao_reduzida = esc($descricao_reduzida);
        $descricao_reduzida = $this->acrescentar_quebras_de_linha_xhtml($descricao_reduzida);
        $array_subitem['descricao_reduzida'] = $descricao_reduzida;

        $array_subitens[] = $array_subitem;
      }
      $array_item['subitens'] = $array_subitens;

      $array_itens[] = $array_item;
    }

    $this->get_smarty()->assign('itens', $array_itens);
  }

}
