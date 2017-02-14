import * as React from "react";

import { Button } from "react-bootstrap";

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Seasons extends React.Component<ILayoutProps, ILayoutState> {

    render() {
        return (
           <div className="container">
    <div className="row clearfix">
		<div className="col-md-12 column">
			<table className="table table-bordered table-hover" id="tab_logic">
				<thead>
					<tr >
						<th className="text-center">
							#
						</th>
						<th className="text-center">
							Saison
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
						<input type="text" name='name0'  placeholder='Saison' className="form-control"/>
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