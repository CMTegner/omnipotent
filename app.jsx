import React from 'react';
const babel = require('babel-core'); // import doesn't work
import debounce from 'lodash.debounce';
import concat from 'concat-stream';
import detective from 'detective';
import request from 'request';
import FileNav from './file-nav.jsx';
import Editor from './editor.jsx';
import Preview from './preview.jsx';

const styles = {
    container: {
        display: 'flex',
        height: '100vh'
    },
    fileNav: {
        width: '10vw'
    },
    editor: {
        flexGrow: 1,
        width: '50vw'
    },
    preview: {
        border: 0,
        flexGrow: 1,
        width: '40vw'
    }
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { src: '', compiled: '' };
    }
    _onChange = debounce((src) => {
        this.setState({ src });
        try {
            let transpiled = babel.transform(src).code;
            console.log(transpiled);
            let imports = detective(transpiled);
            if (imports.length > 0) {
                const dependencies = [...new Set(imports)]
                    .sort()
                    .reduce((d, dep) => { d[dep] = '*'; return d; }, {});
                const options = {
                    uri: 'https://wzrd.in/multi',
                    method: 'POST',
                    withCredentials: false,
                    body: JSON.stringify({ dependencies })
                };
                request(options).pipe(concat(data => {
                    const deps = JSON.parse(data.toString());
                    let compiled = '';
                    for (let dep in deps) {
                        compiled += deps[dep].bundle;
                    }
                    compiled += `;(function () { ${transpiled} }())`;
                    this.setState({ compiled });
                }));
            } else {
                //const compiled = `;(function () { ${transpiled} }())`;
                const compiled = transpiled;
                this.setState({ compiled });
            }
        } catch (e) {}
    }, 500)
    render() {
        const { src, compiled } = this.state;
        return (
            <div style={styles.container}>
                <FileNav style={styles.fileNav} />
                <Editor
                    value={src}
                    style={styles.editor}
                    onChange={this._onChange}
                />
                <Preview style={styles.preview}>
                    <html>
                        <head />
                        <body>
                            {compiled &&
                                <script dangerouslySetInnerHTML={{ __html: compiled }} />
                            }
                        </body>
                    </html>
                </Preview>
            </div>
        );
    }
}
