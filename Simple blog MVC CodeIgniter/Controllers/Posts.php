<?php namespace App\Controllers;

use App\Models\Post_model;

class Posts extends BaseController{

    public function index(){
        
        $data['title'] = ucfirst("Latest Posts");

        $postModel = new Post_model();

        $data['posts'] = $postModel->findAll();

        echo view('templates/header');
        echo view('posts/index', $data);
        echo view('templates/footer');
        
    }

    public function view($slug=NULL){
     
        $postModel = new Post_model();

        $data['post'] = $postModel->get_post($slug);

        if(empty($data['post'])){
            echo "Problem";
        }
        else{
            $data['title'] = $data['post'][0]->title;

            echo view('templates/header');
            echo view('posts/view', $data);
            echo view('templates/footer');
        }

        
    }
}