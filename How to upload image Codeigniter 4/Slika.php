<?php namespace App\Controllers;

class Slika extends BaseController
{
    public function index(){
        return view('demo/demo1');
    }

    public function upload(){
        echo "usao sam ovde";
        $file = $this->request->getFile('photo');

        if($file->getSize()>0){
            echo "File name:".$file->getName()."<br>";
            echo "File size:".$file->getSize()."<br>";
            echo "File random name:".$file->getRandomName()."<br>";
            echo "File extension:".$file->getExtension()."<br>";
            $file->move('./public/upload',$file->getName());
        }
        return view('demo/demo1');
    }

    public function indexMultiple(){
        return view('demo/demo2');
    }

    public function uploads(){
        $files = $this->request->getFileMultiple('photo');
  
        foreach($files as $file){
            echo "File name:".$file->getName()."<br>";
            echo "File size:".$file->getSize()."<br>";
            echo "File random name:".$file->getRandomName()."<br>";
            echo "File extension:".$file->getExtension()."<br>";
            echo "-----------------------------------------"."<br>";
            $file->move('./public/upload',$file->getName());
        }
        return view('demo/demo2');
    }
}