import React from 'react';
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
    render() {
        return (
            <div style={styles.container}>
                <FileNav style={styles.fileNav} />
                <Editor style={styles.editor} />
                <div style={styles.preview}>
                    Preview goes here
                </div>
            </div>
        );
    }
}
