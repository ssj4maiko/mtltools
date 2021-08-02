<?php

namespace App\Services;

use App\Models\Novel;

class MetaService
{
	public function drivers()
	{
		return Novel::getDrivers();
	}
	public function languages() {
		return [
			'english'	=>	'English'
		];
	}
}
