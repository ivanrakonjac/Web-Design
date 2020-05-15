<?php namespace App\Controllers;

use App\Models\Post_model;
use App\Models\Category_model;

class Posts extends BaseController{

    public function index(){
        
        $data['title'] = ucfirst("Latest Posts");

        $postModel = new Post_model();

        $data['posts'] = $postModel->get_post_joined_with_category();

        echo view('templates/header');
        echo view('posts/index', $data);
        echo view('templates/footer');
        
    }

    public function view($slug=NULL){
        //echo $slug;

        //dojvatanje kategorije
        $categoryModel = new Category_model();
        $data['categories']=$categoryModel->findAll();
     
        $postModel = new Post_model();
        $data['post'] = $postModel->get_one_post_joined_with_category_bySlug($slug);

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

        //dojvatanje kategorije
        $categoryModel = new Category_model();
        $data['categories']=$categoryModel->findAll();

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

        $config['upload_path'] = "./assets/images/posts";
        $config['allowed_types'] = "gif|png|jpg";

        $postModel->save([
            'slug' => "post-".str_replace(" ","",$this->request->getVar('title')),
            'title'=>$this->request->getVar('title'),
            'body'=>$this->request->getVar('body'),
            'category_id'=>$this->request->getVar('category_id')
        ]);

        return redirect()->to(site_url("posts"));
    }

    public function delete($id){
        //echo $id;

        $postModel = new Post_model();

        $postModel->delete($id);

        return redirect()->to(site_url("posts"));
    }

    public function edit($id){
        $data['title'] = "Edit POST";

        $postModel = new Post_model();
        $data['post']=$postModel->get_one_post_joined_with_category_byID($id);

        //dojvatanje kategorije
        $categoryModel = new Category_model();
        $data['categories']=$categoryModel->findAll();

        echo view('templates/header');
        echo view('posts/edit', $data);
        echo view('templates/footer');  

        return;
    }

    public function update($id){

        $postModel = new Post_model();

        $postModel->save([
            'id' => $id,
            'slug' => "post-".str_replace(" ","",$this->request->getVar('title')),
            'title'=>$this->request->getVar('title'),
            'body'=>$this->request->getVar('body'),
            'category_id'=>$this->request->getVar('category_id')
        ]);

        return redirect()->to(site_url("posts"));
        
    }
}