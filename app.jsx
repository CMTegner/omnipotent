import React from 'react';
import detective from 'detective-es6';
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
    _onChange(src) {
        let requires;
        try {
            requires = detective(src);
        } catch (e) {}
        if (requires && requires.length > 0) {
            console.dir([...new Set(requires)]);
        }
    }
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
