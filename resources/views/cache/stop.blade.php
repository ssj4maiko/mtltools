<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Chapter no found - ({{$no}}/{{$novel->numberChapters}}) {{$novel->nameCustom}} </title>
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<base href='/'>
	<link href="{{ asset('css/styles.css') }}" rel="stylesheet">
</head>

<body>
	<style type="text/css" rel="stylesheet">
		body {
			background-color: black;
			color: white;
			font-size: 15px;
		}

		.content {
			width: 100%;
			white-space: pre-wrap;
			word-wrap: break-word;
		}

		.content>p {
			padding: 0;
			margin: 0;
		}

		.controls {
			white-space: normal;
			height: 30px;
		}

		.controls a {
			color: red;
			width: 48%;
			text-align: center;
			font-size: 15px;
			border: 2px solid red;
			margin-left: 2px;
			padding: 5px;
			border-radius: 10px;
		}

		.controls a.previous {
			float: left;
		}

		.controls a.next {
			float: right;
		}
	</style>
	<div class="container">
		<h1 id='title' class='h1'>
			{{$novel->nameOriginal}} - {{$novel->nameCustom}}<br />
			({{$no}} / {{$novel->numberChapters}})
		</h1>
		<pre class="content">
            <p class='controls'>
                @if($control['previous'])
                <a class='previous' href="{{$control['previous']}}">Previous</a>
                @endif
            </p>
            <h1 id="situation">There are no new chapters</h1>
            <p id="text1">This novel does not support checking for a new chapter.</p>
            <p id="text2">And must be manually updated together with all chapters.</p>

            <pre id='console'>

            </pre>

		<p class='controls'>
			@if($control['previous'])
			<a class='previous' href="{{$control['previous']}}">Previous</a>
			@endif
		</p>
		</pre>
	</div>
</body>

</html>