import * as React from "react";

export interface ILayoutProps {
    children: Node;
    className: string;
    isDisabled: boolean;
    isFocused: boolean;
    isSelected: boolean;
    // tslint:disable:ban-types
    onFocus: Function;
    onSelect: Function;
    // tslint:enable:ban-types
    option: any;
}

// tslint:disable-next-line:no-empty-interface
export interface ILayoutState {}

export default class FieldSearchOptions extends React.Component<ILayoutProps, ILayoutState> {

    public constructor() {
        super();
    }

    public handleMouseDown(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }

    public handleMouseEnter(event: any) {
        this.props.onFocus(this.props.option, event);
    }

    public handleMouseMove(event: any) {
        if (this.props.isFocused) { return; }
        this.props.onFocus(this.props.option, event);
    }

    public render() {
        const style = {
            display: "inline-block",
            width: "25%",
        };

        const styleLast = {
            "display": "inline-block",
            "text-align": "right",
            "width": "25%",
        };

        // tslint:disable:jsx-no-bind
        return (
            <div
                className={this.props.className}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseMove={this.handleMouseMove.bind(this)}
                title={this.props.option.title}
            >
                <div style={style}>{this.props.children}</div>
                <div style={style}>{this.props.option.City}</div>
                <div style={style}>{this.props.option.IsInside === true ? "Intérieur" : "Extérieur"}</div>
                <div style={styleLast}>{this.props.option.FieldType.Type}</div>
            </div>
        );
    }
}
