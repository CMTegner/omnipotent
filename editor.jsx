import React, { Component, PropTypes } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';

export default class Editor extends Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool
    }
    static defaultProps = {
        value: '',
        disabled: false
    }
    constructor(props) {
        super(props);
        const { value } = props;
        this.state = { value };
    }
    componentWillReceiveProps({ value }) {
        const { props } = this;
        if (value !== props.value) {
            this.setState({ value });
        }
    }
    componentDidMount() {
        this._editor = CodeMirror(this.refs.container, {
            foldGutter: true, // TODO: ?
            gutters: [
                "CodeMirror-linenumbers",
                "CodeMirror-foldgutter",
                "CodeMirror-lint-markers"
            ],
            lineNumbers: true,
            lint: true, // TODO: ?
            matchBrackets: true,
            mode: 'javascript',
            readOnly: this.props.disabled ? "nocursor" : false, // TODO: toggle disabled on update
            theme: "monokai",
            value: this.state.value
        });
        this._editor.on("changes", ::this._onChange);
    }
    componentDidUpdate() {
        const value = this._editor.getValue();
        if (value !== this.state.value) {
            this._editor.setValue(this.state.value);
        }
    }
    _onChange() {
        const { onChange } = this.props;
        if (onChange) {
            const value = this._editor.getValue();
            onChange(value);
        }
    }
    render() {
        return (
            <div
                ref="container"
                style={this.props.style}
            />
        );
    }
}
