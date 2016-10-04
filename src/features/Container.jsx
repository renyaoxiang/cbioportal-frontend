import React, {PropTypes as T} from 'react';
import ReactDOM from 'react-dom';
import PageHeader from './pageHeader/PageHeader.jsx';


export class Container extends React.Component {

    componentDidMount() {
        const headerNode = document.getElementById("reactHeader");
        if (headerNode !== null) {
            ReactDOM.render(<PageHeader router={this.context.router} currentRoutePath={ this.props.location.pathname } />,
                headerNode);
        }
    }
    renderChildren() {
        const childProps = {
            ...this.props,
        };
        const {children} = this.props;
        return React.Children.map(children,
            c => React.cloneElement(c, childProps));
    }
    render() {
        return (
            <div>
                <div>
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

Container.contextTypes = {
    router: T.object,
};

export default Container;
