<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Chapter no found - ({{$no}}/{{$novel->numberChapters}}) {{$novel->nameCustom}} </title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <base href='/' >
    {{ Html::style('styles.css') }}
</head>
<body>
    <style type="text/css" rel="stylesheet">
    body {
        background-color: black;
        color:white;
        font-size: 15px;
    }
    .content {
        width:100%;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .content > p {
        padding:0;
        margin:0;
    }
    .controls {
        white-space:normal;
        height:30px;
    }
    .controls a {
        color:red;
        width:48%;
        text-align:center;
        font-size: 15px;
        border: 2px solid red;
        margin-left:2px;
        padding:5px;
        border-radius: 10px;
    }
    .controls a.previous{
        float:left;
    }
    .controls a.next{
        float:right;
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
            <h1 id="situation">The current chapter has not been loaded yet.</h1>
            <p id="text1">It seems that the chapter has not been loaded yet.</p>
            <p id="text2">Keep this window/tab open and we will check once it's ready.</p>
            <p id="text3">We will <a id='warning' href="{{$control['current']}}#">warn</a> you when it's done. You can test to adjust the volume. :)</p>
            <audio src="{{ asset('assets/hyperdimension_ff_fanfare.mp3') }}" id="fanfarre">
                Your browser doen't support Audio. You should be ashamed, it's current year and yet you are like this, with an old browser.
            </audio>
            <pre id='console'>

            </pre>

            <p class='controls'>
                @if($control['previous'])
                <a class='previous' href="{{$control['previous']}}">Previous</a>
                @endif
            </p>
        </pre>
    </div>
    <script type="text/javascript">
        let oReq = new XMLHttpRequest(),
            windowInterval = null;

        function success(){
		if(this.status = '404')
			return error();

            window.clearInterval(windowInterval);
            document.getElementById('fanfarre').play();

            oReq = new XMLHttpRequest();
            oReq.open("GET", "{{$control['update']}}");
            oReq.addEventListener("load", function(){
                window.location.reload('https://translate.google.com/translate?sl=auto&tl=en&u={{$control['current']}}');
            });
            oReq.send();

            document.getElementById('fanfarre').play();

            document.getElementById('situation').textContent = 'The chapter was found!';
            document.getElementById('text1').textContent = 'Please, wait a few seconds as we prepare everything for you.';
            document.getElementById('text2').textContent = '';
            document.getElementById('text3').textContent = '';

            function reloadPage(){
                oReq = new XMLHttpRequest();
                oReq.open("GET", window.location.href);
                oReq.addEventListener("load", function(){
                    if(this.status != 404){
                        window.location.reload('https://translate.google.com/translate?sl=auto&tl=en&u={{$control['current']}}');
                    } else {
                        window.setTimeout(reloadPage,1000);
                    }
                });
                oReq.send();
            }
            reloadPage();
        }

        function error(){
            let date = new Date();
            document.getElementById('console').textContent+= date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
                                                            +" - Still not updated"+"\n";
        }

        oReq.addEventListener("error", error);
        oReq.addEventListener("load", success);

        function repeatCheck(){
            oReq.open("GET", "'http://cors.io/?{{$url}}");
            oReq.setRequestHeader('If-Match', 'novel_contents');
            oReq.setRequestHeader('Access-Control-Allow-Origin', '*');
            oReq.send();
        }

        repeatCheck();
        windowInterval = window.setInterval(function(){
            repeatCheck()
        },60000);
        document.getElementById('warning').addEventListener('click', function(){
            document.getElementById('fanfarre').play();
        });
    </script>
</body>
</html>
