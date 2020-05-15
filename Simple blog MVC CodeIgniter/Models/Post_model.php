<?php namespace App\Models;

use CodeIgniter\Model;

class Post_model extends Model
{
        protected $table      = 'posts';
        protected $primaryKey = 'id';

        protected $returnType = 'object';

        protected $allowedFields = ['title', 'slug', 'body', 'category_id'];

        public function get_post($slug = FALSE){
            if($slug === FALSE){
                echo "$slug === FALSE";
            }

            return $this->where('slug',$slug)->findAll();
        }

        public function get_post_by_id($id = -1){
            if($id == -1){
                echo "$id == -1";
            }

            return $this->where('id',$id)->first();
        }

        /*
        *joinuje SVE postove sa kategorijom
        *tu je radi prikazivanja svih postova objavljenih do sada
        */
        public function get_post_joined_with_category(){
            $db      = \Config\Database::connect();
            $builder = $db->table('posts');
            $builder->select('posts.id, posts.category_id, posts.title, posts.slug, posts.body, posts.created_at, categories.name');
            $builder->orderBy('posts.id', 'DESC');
            $builder->join('categories', 'posts.category_id = categories.id');
            $query = $builder->get();
            $results = $query->getResult();
            
            return $results;
        }

        /*
        *joinuje JEDAN post sa kategorijom
        *tu je radi prikazivanja posta sa slugom==$postSlug
        */
        public function get_one_post_joined_with_category_bySlug($postSlug){
            $db      = \Config\Database::connect();
            $builder = $db->table('posts');
            $builder->select('posts.id, posts.category_id, posts.title, posts.slug, posts.body, posts.created_at, categories.name')->where('slug', $postSlug);
            $builder->join('categories', 'posts.category_id = categories.id');
            $query = $builder->get();
            $results = $query->getResult();
            
            return $results;
        }

        /*
        *joinuje JEDAN post sa kategorijom
        *tu je radi prikazivanja posta sa slugom==$postID
        */
        public function get_one_post_joined_with_category_byID($postID){
            $db      = \Config\Database::connect();
            $builder = $db->table('posts');
            $builder->select('posts.id, posts.category_id, posts.title, posts.slug, posts.body, posts.created_at, categories.name')->where('posts.id', $postID);
            $builder->join('categories', 'posts.category_id = categories.id');
            $query = $builder->get();
            $results = $query->getResult();
            
            return $results;
        }




}