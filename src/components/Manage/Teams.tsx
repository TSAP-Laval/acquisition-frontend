import * as React from "react";

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Teams extends React.Component<ILayoutProps, ILayoutState> {
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