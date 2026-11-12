import { escapeHtml } from "../html/escape.js";
import { adjacentStaticUrl, assetUrl, staticPagePath } from "./staticUrls.js";

export type StaticNovel = {
  id: number;
  nameOriginal: string | null;
  nameCustom: string | null;
  numberChapters: number;
  driver: string | null;
  code: string | null;
};

export type StaticChapter = {
  no: number;
  title: string | null;
  arc: string | null;
  text: string;
};

export type StaticControls = {
  previous: string | null;
  next: string | null;
  current: string;
  update: string;
};

/** Blade @if whitespace from chapter.blade.php / the first wait+stop control block. */
export function chapterStyleControls(previous: string | null, next: string | null): string {
  let inner = "";
  if (previous) {
    inner += `\n                                <a class='previous' href="${escapeHtml(previous)}">Previous</a>`;
  }
  if (next) {
    inner += `\n                                                <a class='next' href="${escapeHtml(next)}">Next</a>`;
  }
  inner += `\n                            `;
  return `<p class='controls'>${inner}</p>`;
}

/** Second controls block in wait.blade.php (12-space @if indent). */
export function waitBottomControls(previous: string | null): string {
  let inner = "";
  if (previous) {
    inner += `\n                        <a class='previous' href="${escapeHtml(previous)}">Previous</a>`;
  }
  inner += `\n                    `;
  return `<p class='controls'>${inner}</p>`;
}

/** Second controls block in stop.blade.php (tab-indented @if). */
export function stopBottomControls(previous: string | null): string {
  let inner = "";
  if (previous) {
    inner += `\n\t\t\t\t\t\t<a class='previous' href="${escapeHtml(previous)}">Previous</a>`;
  }
  inner += `\n\t\t\t\t\t`;
  return `<p class='controls'>${inner}</p>`;
}

const CHAPTER_TEMPLATE = `<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>__TITLE_HEAD__</title>
    <base href="/">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link href="/css/styles.css" rel="stylesheet">
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
            __H1__
        </h1>
        <pre class="content">
            __CONTROLS__
            <h2>__ARC__</h2>
            <h1>__TITLE__</h1>
            <div id='content-text'>
                __TEXT__
            </div>
            __CONTROLS__
        </pre>
    </div>
    <style type="text/css" rel="stylesheet">
        .content {
            margin:0 5%;
            width: 90%;
        }
        #content-text {
            display: none;
        }

        #content-text > * {
            position: relative;
            margin:0;
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
                tooltip.classList.add('notranslate');
                tooltip.setAttribute('translate', 'no');
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
                }, 500); // In milliseconds
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
                            duplicateElement.innerHTML = duplicateElement.innerHTML.replace(/<ruby>.*?<\\/ruby>/, rbContent ? rbContent : (spanContents ? spanContents : directTextContent));
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

</html>`;

const WAIT_TEMPLATE = `<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter no found - (__NO__/__NUMBER__) __NAME_CUSTOM__ </title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <base href='/'>
    <link href="/css/styles.css" rel="stylesheet">
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
            __NAME_ORIGINAL__ - __NAME_CUSTOM__<br />
            (__NO__ / __NUMBER__)
        </h1>
        <pre class="content">
            __CONTROLS_TOP__
            <h1 id="situation">The current chapter has not been loaded yet.</h1>
            <p id="text1">It seems that the chapter has not been loaded yet.</p>
            <p id="text2">Keep this window/tab open and we will check once it's ready.</p>
            <p id="text3">We will <a id='warning' href="__CURRENT__#">warn</a> you when it's done. You can test to adjust the volume. :)</p>
            <audio src="__ASSET_FANFARE__" id="fanfarre">
                Your browser doen't support Audio. You should be ashamed, it's current year and yet you are like this, with an old browser.
            </audio>
            <pre id='console'>

            </pre>

        __CONTROLS_BOTTOM__
        </pre>
    </div>
    <script type="text/javascript">
        let oReq = new XMLHttpRequest(),
            windowInterval = null;

        function success() {
            if (this.status = '404')
                return error();

            window.clearInterval(windowInterval);
            document.getElementById('fanfarre').play();

            oReq = new XMLHttpRequest();
            oReq.open("GET", "__UPDATE__");
            oReq.addEventListener("load", function() {
                window.location.reload('https://translate.google.com/translate?sl=auto&tl=en&u=__CURRENT__');
            });
            oReq.send();

            document.getElementById('fanfarre').play();

            document.getElementById('situation').textContent = 'The chapter was found!';
            document.getElementById('text1').textContent = 'Please, wait a few seconds as we prepare everything for you.';
            document.getElementById('text2').textContent = '';
            document.getElementById('text3').textContent = '';

            function reloadPage() {
                oReq = new XMLHttpRequest();
                oReq.open("GET", window.location.href);
                oReq.addEventListener("load", function() {
                    if (this.status != 404) {
                        window.location.reload('https://translate.google.com/translate?sl=auto&tl=en&u=__CURRENT__');
                    } else {
                        window.setTimeout(reloadPage, 1000);
                    }
                });
                oReq.send();
            }
            reloadPage();
        }

        function error() {
            let date = new Date();
            document.getElementById('console').textContent += date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() +
                " - Still not updated" + "\\n";
        }

        oReq.addEventListener("error", error);
        oReq.addEventListener("load", success);

        function repeatCheck() {
            oReq.open("GET", "'http://cors.io/?__SOURCE_URL__");
            oReq.setRequestHeader('If-Match', 'novel_contents');
            oReq.setRequestHeader('Access-Control-Allow-Origin', '*');
            oReq.send();
        }

        repeatCheck();
        windowInterval = window.setInterval(function() {
            repeatCheck()
        }, 60000);
        document.getElementById('warning').addEventListener('click', function() {
            document.getElementById('fanfarre').play();
        });
    </script>
</body>

</html>`;

const STOP_TEMPLATE = `<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Chapter no found - (__NO__/__NUMBER__) __NAME_CUSTOM__ </title>
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<base href='/'>
	<link href="/css/styles.css" rel="stylesheet">
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
			__NAME_ORIGINAL__ - __NAME_CUSTOM__<br />
			(__NO__ / __NUMBER__)
		</h1>
		<pre class="content">
            __CONTROLS_TOP__
            <h1 id="situation">There are no new chapters</h1>
            <p id="text1">This novel does not support checking for a new chapter.</p>
            <p id="text2">And must be manually updated together with all chapters.</p>

            <pre id='console'>

            </pre>

		__CONTROLS_BOTTOM__
		</pre>
	</div>
</body>

</html>`;

function fill(template: string, vars: Record<string, string>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.split(key).join(value);
  }
  return out;
}

export function buildStaticControls(
  novel: StaticNovel,
  idDictionary: number,
  no: number,
): StaticControls {
  const opts = {
    idNovel: novel.id,
    idDictionary,
    noChapter: no,
    numberChapters: novel.numberChapters,
    driver: novel.driver,
  };
  return {
    previous: adjacentStaticUrl({ ...opts, direction: "-" }),
    next: adjacentStaticUrl({ ...opts, direction: "+" }),
    current: staticPagePath(novel.id, idDictionary, no, 1),
    update: `/api/chapter/autoUpdate/${novel.id}`,
  };
}

export function renderChapterPage(opts: {
  novel: StaticNovel;
  chapter: StaticChapter;
  controls: StaticControls;
}): string {
  const { novel, chapter, controls } = opts;
  const nameCustom = escapeHtml(novel.nameCustom ?? "");
  const nameOriginal = escapeHtml(novel.nameOriginal ?? "");
  return fill(CHAPTER_TEMPLATE, {
    __TITLE_HEAD__: `(${escapeHtml(chapter.no)} ${nameCustom} `,
    __H1__: `(${escapeHtml(chapter.no)}/ ${escapeHtml(novel.numberChapters)}) - ${nameOriginal} - ${nameCustom}`,
    __ARC__: escapeHtml(chapter.arc ?? ""),
    __TITLE__: escapeHtml(chapter.title ?? ""),
    __TEXT__: chapter.text,
    __CONTROLS__: chapterStyleControls(controls.previous, controls.next),
  });
}

export function renderWaitPage(opts: {
  novel: StaticNovel;
  no: number;
  controls: StaticControls;
  sourceUrl: string;
  appUrl: string;
}): string {
  const { novel, no, controls, sourceUrl, appUrl } = opts;
  const nameCustom = escapeHtml(novel.nameCustom ?? "");
  const nameOriginal = escapeHtml(novel.nameOriginal ?? "");
  const number = escapeHtml(novel.numberChapters);
  const noEsc = escapeHtml(no);
  return fill(WAIT_TEMPLATE, {
    __NO__: noEsc,
    __NUMBER__: number,
    __NAME_CUSTOM__: nameCustom,
    __NAME_ORIGINAL__: nameOriginal,
    __CONTROLS_TOP__: chapterStyleControls(controls.previous, null),
    __CONTROLS_BOTTOM__: waitBottomControls(controls.previous),
    __CURRENT__: escapeHtml(controls.current),
    __ASSET_FANFARE__: escapeHtml(assetUrl(appUrl, "assets/hyperdimension_ff_fanfare.mp3")),
    __UPDATE__: escapeHtml(controls.update),
    __SOURCE_URL__: escapeHtml(sourceUrl),
  });
}

export function renderStopPage(opts: {
  novel: StaticNovel;
  no: number;
  controls: StaticControls;
}): string {
  const { novel, no, controls } = opts;
  const nameCustom = escapeHtml(novel.nameCustom ?? "");
  const nameOriginal = escapeHtml(novel.nameOriginal ?? "");
  const number = escapeHtml(novel.numberChapters);
  const noEsc = escapeHtml(no);
  return fill(STOP_TEMPLATE, {
    __NO__: noEsc,
    __NUMBER__: number,
    __NAME_CUSTOM__: nameCustom,
    __NAME_ORIGINAL__: nameOriginal,
    __CONTROLS_TOP__: chapterStyleControls(controls.previous, null),
    __CONTROLS_BOTTOM__: stopBottomControls(controls.previous),
  });
}
