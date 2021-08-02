<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>({{$chapter->no}} {{$novel->nameCustom}} </title>
    <base href="/">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link href="{{ asset('css/styles.css') }}" rel="stylesheet">
</head>

<body>
    <style type="text/css" rel="stylesheet">
        body {
            background-color: black;
            color: white;
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
            ({{$chapter->no}}/ {{$novel->numberChapters}}) - {{$novel->nameOriginal}} - {{$novel->nameCustom}}
        </h1>
        <pre class="content">
            <p class='controls'>
                @if($control['previous'])
                <a class='previous' href="{{$control['previous']}}">Previous</a>
                @endif
                @if($control['next'])
                <a class='next' href="{{$control['next']}}">Next</a>
                @endif
            </p>
            <h1>{{$chapter->title}}</h1>
            {!!$text!!}
            <p class='controls'>
                @if($control['previous'])
                <a class='previous' href="{{$control['previous']}}">Previous</a>
                @endif
                @if($control['next'])
                <a class='next' href="{{$control['next']}}">Next</a>
                @endif
            </p>
        </pre>
    </div>
</body>

</html>