import React from 'react';
import DOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';

export default class Preview extends React.Component {
    componentDidMount() {
        this._updateFrame();
    }

    componentDidUpdate() {
        this._updateFrame();
    }

    _updateFrame() {
        const doc = DOM.findDOMNode(this).contentDocument;
        const body = React.Children.only(this.props.children);
        const markup = renderToStaticMarkup(body);
        doc.open();
        doc.write(markup);
        doc.close()
    }

    render() {
        const { children, ...props } = this.props;
        return (
            <iframe {...props} />
        );
    }
}
