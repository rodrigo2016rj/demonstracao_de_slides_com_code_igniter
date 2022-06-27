<?php

namespace App\Controllers;

use Smarty;
use CodeIgniter\Controller;

class TemplateController extends Controller{
  //Armazena objeto do smarty.
  private $smarty;

  public function initController(\CodeIgniter\HTTP\RequestInterface $requisicao,
    \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger){
    parent::initController($requisicao, $response, $logger);

    $this->smarty = new Smarty;

    $this->smarty->assign('tema_template', 'tema_cinza');
  }

  protected final function get_smarty(){
    return $this->smarty;
  }

  /** ---------------------------------------------------------------------------------------------
    Acrescenta quebras de linha no padrão XHTML. */
  protected function acrescentar_quebras_de_linha_xhtml($texto){
    //Armazena em array todos os padrões de quebra de linha de sistemas operacionais diferentes
    $tipos_de_quebras_de_sistemas_operacionais = array("\r\n", "\r", "\n");
    //Substitui quebras de linha presentes na string por: termina parágrafo </p> começa parágrafo <p>
    $texto_modificado = str_replace($tipos_de_quebras_de_sistemas_operacionais, '</p><p>', $texto);
    //Substitui parágrafo vazio por: quebra de linha <br/>
    $texto_resultante = str_replace('<p></p>', '<br/>', $texto_modificado);
    //Retorna o texto resultante dentro da tag <p></p>
    return "<p>$texto_resultante</p>";
  }

}
