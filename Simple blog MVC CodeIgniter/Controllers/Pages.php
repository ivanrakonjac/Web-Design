<?php namespace App\Controllers;

//svi kontroleri se izvode iz BaseContollera

/*kada pozovemo http://localhost:8080/pages/view/about
pages - ime controllera
view - ime metode u kontroleru
about - view koji treba prikazati
*/

class Pages extends BaseController{
    public function view ($page = 'home'){
        //u gore navedenom slucaju linka
        //page ce imati vrednost about tj. view-a koji treba prikazati
        //ako nije naveden bice prikazan home
        
        //proveravam da li taj view uopste postoji
        if(!file_exists(APPPATH.'Views/pages/'.$page.'.php')){
            echo 'Usao sam u gresku';
            show_404();
        }
        
        //u niz data stavljam ime stranice
        //to radim da bi niz data prosledio kroz echo view('pages/'.$page, $data); fju
        $data['title'] = ucfirst($page);

        //ispisujem tamplate header
        echo view('templates/header');
        //ispisujem view na adresi pages/$pages, a $page == about i prosledjujem $data niz
        echo view('pages/'.$page, $data);
        //ispisujem tamplate footer
        echo view('templates/footer');
        
    }
}
    