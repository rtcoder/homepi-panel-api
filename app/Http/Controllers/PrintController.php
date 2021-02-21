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
            $pages=$request->get('pages');
            $copies=(int)$request->get('copies');

            $command = 'lp '.
            ($copies > 1 ? ('-n '.$copies.' ') : '').
            (strlen($pages) ? ('-P '.$pages.' ') : '').
            $name;

            shell_exec($command);
            return response();
        }
        return response(null, 400);
    }
}
