import React from 'react';
import babel from 'babel-core/lib/transformation';
import debounce from 'lodash.debounce';
import concat from 'concat-stream';
import detective from 'detective';
import request from 'request';
import FileNav from './file-nav.jsx';
import Editor from './editor.jsx';

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
        flexGrow: 1,
        width: '40vw'
    }
};

export default class App extends React.Component {
    _onChange = debounce((src) => {
        try {
            let transpiled = babel(src).code;
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
                    const deps = JSON.parse(data);
                    let compiled = '';
                    for (let dep in deps) {
                        compiled += deps[dep].bundle;
                    }
                    compiled += `;(function () { ${transpiled} }())`;
                    eval(compiled);
                }));
            }
        } catch (e) {}
    }, 500)
    render() {
        return (
            <div style={styles.container}>
                <FileNav style={styles.fileNav} />
                <Editor style={styles.editor} onChange={this._onChange}/>
                <div style={styles.preview}>
                    Preview goes here
                </div>
            </div>
        );
    }
}
