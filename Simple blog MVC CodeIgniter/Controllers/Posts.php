<?php namespace App\Controllers;

use App\Models\Post_model;

class Posts extends BaseController{

    public function index(){
        
        $data['title'] = ucfirst("Latest Posts");

        $postModel = new Post_model();

        $data['posts'] = $postModel->orderBy('id', 'desc')->findAll();

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

    public function create(){
        $data['title'] = "Create POST";

        $postModel = new Post_model();

        //ukljucujem form helper 
        helper('form','url');

        //ukljucujem biblioteku za validaciju
        $validation=\Config\Services::validation();

        if (!$this->validate(['title'=>'required','body'=>'required'])){
            //echo "Greskaa";
            echo view('templates/header');
            echo view('posts/create', $data);
            echo view('templates/footer');  
            return;          
        }

        $postModel->save([
            'slug' => "post-".str_replace(" ","",$this->request->getVar('title')),
            'title'=>$this->request->getVar('title'),
            'body'=>$this->request->getVar('body')
        ]);

        return redirect()->to(site_url("posts"));


    }

    public function delete($id){
        echo $id;

        $postModel = new Post_model();

        $postModel->delete($id);

        return redirect()->to(site_url("posts"));
    }
}