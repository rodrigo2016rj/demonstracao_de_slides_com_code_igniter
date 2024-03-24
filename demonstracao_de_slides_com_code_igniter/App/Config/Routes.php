<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
/* Página Padrão */
$routes->get('/', 'PaginaInicialController::index');

/* Página Inicial */
$routes->get('/pagina_inicial', 'PaginaInicialController::index');

/* Item */
$routes->get('/item', 'ItemController::index');

/* Subitem */
$routes->get('/subitem', 'SubitemController::index');

/* Slide Javascript Puro */
$routes->get('/slide_javascript_puro', 'SlideJavascriptPuroController::index');

/* Slide JQuery */
$routes->get('/slide_jquery', 'SlideJQueryController::index');

/* Slide React */
$routes->get('/slide_react', 'SlideReactController::index');
