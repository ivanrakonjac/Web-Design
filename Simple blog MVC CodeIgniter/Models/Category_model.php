<?php namespace App\Models;

use CodeIgniter\Model;

class Category_model extends Model
{
        protected $table      = 'categories';
        protected $primaryKey = 'id';

        protected $returnType = 'object';

        protected $allowedFields = ['id', 'name', 'created_at'];

        public function getCategoryNameById($id){
                $category=$this->where('id',$id)->first();
                return $category->name;
        }

}