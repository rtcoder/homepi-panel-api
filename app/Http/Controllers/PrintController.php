<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class PrintController extends Controller
{

    public function index()
    {
        return view('printing');
    }

    public function printFile(Request $request)
    {
        if($file = $request->file('file')){
            $name = $file->getPathname();
            shell_exec("lp " . $name);
            return response(['sdf'=>'ff', $request->all(),$name]);

        }
    }
}
