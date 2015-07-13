import React from 'react';

export default class FileNav extends React.Component {
    constructor() {
        super();
        this.state = {
            files: [
                { name: 'foo' },
                { name: 'bar' },
                { name: 'beep' },
                { name: 'boop' }
            ]
        };
    }
    render() {
        const { files } = this.state;
        return (
            <ul {...this.props}>
                {files.map(({ name }) =>
                    <li key={name}>{name}</li>
                )}
            </ul>
        );
    }
}
