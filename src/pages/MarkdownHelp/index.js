import React from 'react';
import Markdown from 'react-markdown';
import { Container} from './styled';

export default function Main() {

    const text1 = '# H1 \n ## H2 \n ### H3 \n #### H4 \n ##### H5 \n ###### H6';
    const text2 = '1. First ordered list item \n 2. Another item. \n * Unordered sub-list.';
    const text3 = `[I'm an inline-style link](https://www.google.com) \n  [I'm an inline-style link with title](https://www.google.com "Google's Homepage")`;
    const code1 = `\`\`\`javascript" \n var s = "JavaScript syntax highlighting"; \n alert(s); \n \`\`\` `;
    const table = `Tables | Are | Cool\n--- | --- | ---\n*Still* | \`renders\` | **nicely**\n1 | 2 | 3|`;

    return (
        <Container>
            <h1>Headers</h1>  
            <p># H1</p>
            <p>## H2</p>
            <p>### H3</p>
            <p>#### H4</p>
            <p>##### H5</p>
            <p>###### H6</p>
            <div>
                <Markdown source={text1} />
            </div>

            <h1>Emphasis</h1>
            <p>Emphasis, aka italics, with *asterisks* or _underscores_.</p>
            <div>
                <Markdown source='Emphasis, aka italics, with *asterisks* or _underscores_.' />
            </div>
            <p>Strong emphasis, aka bold, with **asterisks** or __underscores__.</p>
            <div>
                <Markdown source='Strong emphasis, aka bold, with **asterisks** or __underscores__.' />
            </div>
            <p>Combined emphasis with **asterisks and _underscores_**.</p>
            <div>
                <Markdown source='Combined emphasis with **asterisks and _underscores_**.' />
            </div>
            <p>Strikethrough uses two tildes. ~~Scratch this.~~</p>
            <div>
                <Markdown source='Strikethrough uses two tildes. ~~Scratch this.~~' />
            </div>

            <h1>Lists</h1>
            <p> 1. First ordered list item<br />
                2. Another item<br />
                ⋅⋅* Unordered sub-list. <br />
                </p>
            <div>
                <Markdown source={text2} />
            </div>

            <h1>Links</h1>
            <p> [I'm an inline-style link](https://www.google.com)<br />
                [I'm an inline-style link with title](https://www.google.com "Google's Homepage")<br />
                URLs and URLs in angle brackets will automatically get turned into links.<br />
                </p>
            <div>
                <Markdown source={text3} />
            </div>

            <h1>Images</h1>
            <p> Here's our logo (hover to see the title text):<br /><br />
                ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
                </p>
            <div>
                <Markdown source='![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")' />
            </div>

            <h1>Tables</h1>
            <p>Tables | Are | Cool</p>
            <p>--- | --- | ---</p>
            <p>*Still* | `renders` | **nicely**</p>
            <p>1 | 2 | 3</p>
            <div>
                <Markdown source={table} />
            </div>
            
            <h1>Code</h1>
            <p>
                ```javascript<br />
                var s = "JavaScript syntax highlighting";<br />
                alert(s);<br />
                ```
            </p>
            <div><Markdown source={code1} /></div>
        </Container>
    );
}
