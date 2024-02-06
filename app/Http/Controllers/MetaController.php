<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MetaService;

class MetaController extends Controller
{
    private MetaService $MetaService;
    public function __construct(
        MetaService $MetaService
    ) {
        $this->MetaService = $MetaService;
    }

    public function getMeta(Request $request)
    {
        $requests = $request->get('meta');
        $vessel = [];
        if ($requests)
            foreach ($requests as $request) {
                $vessel[$request] = $this->MetaService->$request();
            }
        return $vessel;
    }
}
