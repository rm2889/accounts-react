var Records = React.createClass({
	getInitialState: function() {
		return {
			records: this.props.data
		}
	},
	getDefaultProps: function() {
		return {
			records: []
		}
	},

	addRecord: function(record) {
		console.log(this.state.records);
		var records=this.state.records.slice();
		console.log(records);
		records.push(record);
		this.setState({records: records});
	},

	render: function() {
		return (
			<div className="records">
			<h2 className="title">Records</h2>
			<RecordForm handleNewRecord={this.addRecord}/>
			<table className="table-hover table">
			<thead>
			<tr>
			<th>Date</th>
			<th>Title</th>
			<th>Amount</th>
			</tr>
			</thead>
			<tbody>
			{this.state.records.map(function(record) {
				return <Record key={record.id} record={record} />
			})}
			</tbody>
			</table>
			</div>
			);
	}
});
