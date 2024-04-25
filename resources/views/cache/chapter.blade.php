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
        #content-text {
            display: none;
        }

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
        .tooltip {
            position: absolute;
            background-color: #333;
            color: #fff;
            padding: 5px;
            border-radius: 3px;
            font-size: 14px;
            z-index: 9999; /* Ensure the tooltip appears above other elements */
            --pointer-events: none; /* Allow mouse events to pass through the tooltip */
        }

    </style>
    <script type='text/javascript'>
        const allowedTags = ['P', 'DIV', 'H1', 'H2', 'H3'];
        const contentContainer = document.querySelectorAll('#content-text *');

        class HoverTooltip {
            constructor(element) {
                this.tooltip = null;
                this.timeout = null;
                this.element = element;
                this.text = element.dataset.originalText;
            }

            createTooltip() {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = this.text;
                document.body.appendChild(tooltip);
                return tooltip;
            }

            showTooltip() {
                console.log('show Tooltip', this.timeout);
                if (this.timeout) {
                    clearTimeout(this.timeout); // Clear any existing timeout
                } else {
                    this.tooltip = this.createTooltip();
                    this.updateTooltipPosition();

                    // Add event listeners to handle mouse movements inside the tooltip
                    this.tooltip.addEventListener('mouseenter', () => {
                        clearTimeout(this.timeout); // Clear the hide timeout when mouse enters the tooltip
                    });
                    this.tooltip.addEventListener('mouseleave', () => {
                        this.hideTooltipWithDelay(); // Restart the hide timeout when mouse leaves the tooltip
                    });
                }
            }

            updateTooltipPosition() {
                const rect = this.element.getBoundingClientRect();
                const left = rect.left + window.scrollX;
                const top = rect.top + window.scrollY;
                this.tooltip.style.left = left + 'px';
                this.tooltip.style.top = top + 'px';
            }
            hideTooltipWithDelay() {
                this.timeout = setTimeout(() => {
                    this.hideTooltip();
                }, 1500); // 3000 milliseconds (3 seconds)
            }
            hideTooltip() {
                //console.log('Remove Tooltip', this.tooltip);
                if (this.tooltip) {
                    document.body.removeChild(this.tooltip);
                    this.tooltip = null;
                }
                this.timeout = null;
            }
        }
        const RTTags = Array.from(document.querySelectorAll('RT')).map((item) => {
            item.textContent = '(' + item.textContent + ')';
        })


        function removeTooltip(toolTip) {
            //console.log('mouseLeave')
            toolTip.hideTooltipWithDelay();
            return toolTip;
        }
        function addTooltip(toolTip, element) {
            //console.log('mouseEnter', element.dataset.originalText)
            if(!toolTip)
                toolTip = new HoverTooltip(element)

            toolTip.showTooltip(element);
            return toolTip;
        }
        function insertTooltip(element) {
            let tooltip;
            element.addEventListener('mouseenter', () => {
                tooltip = addTooltip(tooltip, element);
            });
            element.addEventListener('mouseleave', () => {
                tooltip = removeTooltip(tooltip);
            });
        }
        // Loop through child elements and process valid ones
        Array.from(contentContainer).forEach(element => {
            if(element.textContent){
                insertTooltip(element);
                if (allowedTags.includes(element.tagName)) {
                    const rubyTags = element.querySelectorAll('ruby');
                    if (rubyTags.length > 0) {
                        // Clone the original element
                        const duplicateElement = element.cloneNode(true);
                        // Iterate through each <ruby> tag
                        rubyTags.forEach(ruby => {
                            // Check if there are any <rp> tags and remove them
                            Array.from(ruby.querySelectorAll('rp')).forEach(rp => rp.remove());
    
                            // Check if there are direct text nodes inside <ruby>
                            const directTextNodes = Array.from(ruby.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                            // Extract text content from direct text nodes
                            const directTextContent = directTextNodes.map(node => node.textContent).join('');
                            // Get the contents of <rb> and <span> tags
                            const rbContent = ruby.querySelector('rb')?.textContent;
                            const spanContents = Array.from(ruby.querySelectorAll('span')).map(span => span.textContent).join('');
    
                            // Replace the <ruby> tag with the contents of <rb> and <span>
                            duplicateElement.innerHTML = duplicateElement.innerHTML.replace(/<ruby>.*?<\/ruby>/, rbContent ? rbContent : (spanContents ? spanContents : directTextContent));
                        });
                        // Insert the duplicated element after the current one
                        duplicateElement.classList.add('duplicate');
                        duplicateElement.dataset.originalText = '| ' + duplicateElement.textContent.trim();
                        insertTooltip(duplicateElement);
                        element.parentNode.insertBefore(duplicateElement, element.nextSibling);
                    }
    
                    const originalText = element.textContent.trim();
                    element.dataset.originalText = '| ' + originalText;
                }
                window.setTimeout(() => {
                    document.getElementById('content-text').style.display = 'inherit';
                }, 500);
            }
        });
    </script>
</body>

</html>