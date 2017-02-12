import * as React from "react";
import * as ReactDOM from "react-dom";
import store from "./manageStore";

import {Button, ButtonToolbar} from "react-bootstrap";


export interface ILayoutProps {}
export interface ILayoutState {}
var numJoueur ="";

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
componentWillMount(){
    store.on("change",() =>{
        store.getActions();
    })

}
Test(){
   
        store.getActions();

}
    render() {
        return (
         <div className="container">
<h1> Teams :</h1>

    <div className="row clearfix">
		<div className="col-md-12 column">
			<table className="table table-bordered table-hover" id="tab_logic">
				<thead>
					<tr >
						<th className="text-center">
							#
						</th>
						<th className="text-center">
							Nom équipe
						</th>
						<th className="text-center">
							Localistion
						</th>
						<th className="text-center">
							Sport
						</th>
						<th className="text-center">
							Division
						</th>
						<th className="text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					<tr id='addr0'>
						<td>
						1
						</td>
						<td>
						<input type="text" name='nom'  placeholder='Nom' className="form-control"/>
						</td>
						<td>
						<input type="text" name='localisation'  placeholder='Localisation' className="form-control"/>
						</td>
						<td>
						<input type="text" name='sport'  placeholder='Sport' className="form-control"/>
						</td>
						<td>
						<input type="text" name='division'  placeholder='Division' className="form-control"/>
						</td>
						<td>
						<button className="btn btn-default btn-warning">Modifier</button>
                        <button className="btn btn-danger btn-default">Supprimer</button>
						</td>
					</tr>
                    <tr id='addr1'></tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
        );
    }
}

