<?php

namespace App\Services;

use App\Models\Novel;

class MetaService
{
	public function drivers():array
	{
		return Novel::getDrivers();
	}
	public function languages():array {
		return [
			'english'	=>	'English'
		];
	}
}
