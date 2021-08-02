<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MetaService;

class MetaController extends Controller
{
    private $metaService = null;
    public function __construct(MetaService $MetaService){
        $this->metaService = $MetaService;
    }
	public function getMeta(Request $request){
        $requests = $request->json()->get('meta');
        $vessel = [];
        foreach($requests as $request){
            $vessel[ $request ] = $this->metaService->$request();
        }
		return $vessel;
	}
}
