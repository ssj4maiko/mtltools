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
            <h1>{{$title}}</h1>
            <div id='content-text'>
                {!!$text!!}
            </div>
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
    <style type="text/css" rel="stylesheet">
        #content-text>* {
            position: relative;
        }

        #content-text p::after,
        #content-text div::after,
        #content-text h1::after,
        #content-text h2::after,
        #content-text h3::after {
            content: attr(data-original-text);
            top: 0;
            left: 100%;
            margin-left: 10px;
            /* Adjust as needed */
            opacity: 0.5;
            /* Optionally reduce opacity for visual differentiation */
        }

        .duplicate {
            color: #99F;
        }
    </style>
    <script type='text/javascript'>
        const RTTags = Array.from(document.querySelectorAll('RT')).map((item) => {
            item.textContent = '(' + item.textContent + ')';
        })

        const allowedTags = ['P', 'DIV', 'H1', 'H2', 'H3'];
        const contentContainer = document.querySelectorAll('#content-text *');

        // Loop through child elements and process valid ones
        Array.from(contentContainer).forEach(element => {
            if (allowedTags.includes(element.tagName)) {
                const originalText = element.textContent.trim();
                element.dataset.originalText = '| ' + originalText;

                const rubyTags = element.querySelectorAll('ruby');
                if (rubyTags.length > 0) {
                    // Clone the original element
                    const duplicateElement = element.cloneNode(true);
                    // Iterate through each <ruby> tag
                    rubyTags.forEach(ruby => {
                        // Get the contents of <rb> and <span> tags
                        const rbContent = ruby.querySelector('rb')?.textContent;
                        const spanContents = Array.from(ruby.querySelectorAll('span')).map(span => span.textContent).join('');

                        // Replace the <ruby> tag with the contents of <rb> and <span>
                        duplicateElement.innerHTML = duplicateElement.innerHTML.replace(/<ruby>.*?<\/ruby>/, rbContent ?? spanContents);
                    });
                    // Insert the duplicated element after the current one
                    duplicateElement.classList.add('duplicate');
                    element.parentNode.insertBefore(duplicateElement, element.nextSibling);
                }
            }
        });
        console.log(contentContainer);
    </script>
    <!-- <script type='text/javascript'>
        const translatedElements = Array.from(document.getElementById('content-text').children);
        translatedElements.forEach(element => {
            const originalText = element.textContent.trim();
            element.dataset.originalText = '| ' + originalText;
        });
        console.log(translatedElements);
    </script> -->
</body>

</html>