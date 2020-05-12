<?php namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes(true);

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

/*Dodao sam rutu =>
kad se ukuca http://localhost:8080/posts
prebacice me na http://localhost:8080/posts/index
gde je index metoda kontrolera Posts
*/
$routes->add('posts', 'Posts::index');

//dodajem rutu koja me prebacuje na view za kreiranje posta
$routes->add('posts/create', 'Posts::create');

//dodajem rutu koja me prebacuje na view za brisanje posta
$routes->add('posts/delete/(:num)', 'Posts::delete/$1');

//dodajem rutu koja me prebacuje na view za editovanje posta
//Posts::edit/$1, gde je edit metoda kontrolera Posts
$routes->add('posts/edit/(:num)', 'Posts::edit/$1');

//dodajem rutu koja me prebacuje na view za update posta
$routes->add('posts/update/(:num)', 'Posts::update/$1');

/*
kad se ukuca http://localhost:8080/posts/bilo sta
prebacice me na http://localhost:8080/posts/view/prvi parametar
gde je prvi parametar slug posta tj. redni broj posta
*/
$routes->add('posts/(:any)', 'Posts::view/$1');



// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');

/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need to it be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
