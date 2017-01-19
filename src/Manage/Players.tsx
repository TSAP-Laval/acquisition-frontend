import * as React from "react";
import * as ReactDOM from "react-dom";

import {Button, ButtonToolbar} from "react-bootstrap";


export interface ILayoutProps {}
export interface ILayoutState {}

const buttonsInstance = (
  <ButtonToolbar>
    {/* Standard button */}
    <Button>Default</Button>
<Button bsStyle="primary">Primary</Button>
    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
    

    {/* Indicates a successful or positive action */}
    <Button bsStyle="success">Success</Button>

    {/* Contextual button for informational alert messages */}
    <Button bsStyle="info">Info</Button>

    {/* Indicates caution should be taken with this action */}
    <Button bsStyle="warning">Warning</Button>

    {/* Indicates a dangerous or potentially negative action */}
    <Button bsStyle="danger">Danger</Button>

    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
    <Button bsStyle="link">Link</Button>
  </ButtonToolbar>
);




export default class Players extends React.Component<ILayoutProps, ILayoutState> {
    render() {
        return (
           <div> {buttonsInstance} </div>
        );
    }
}

