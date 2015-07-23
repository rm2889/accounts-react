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
		var records = React.addons.update(this.state.records, {$push: [record]})
		this.setState({records: records});
	},

	credits: function() {
		return this.state.records.reduce(function(prev, curr) {			
			if (curr.amount > 0) {
				return prev + curr.amount;
			} else {
				return prev;
			}
		},0);
	},

	debits: function() {
		return this.state.records.reduce(function(prev,curr){
			if (curr.amount < 0) {
				return prev + curr.amount;
			}
			else {
				return prev;
			}
		}, 0);
	},

	amount: function() {
		return this.debits() + this.credits();
	},

	deleteRecord: function(record) {
		var index = this.state.records.indexOf(record)
		var records = React.addons.update(this.state.records ,{$splice: [[index,1]]})
		this.replaceState({records: records});
	},

	render: function() {
		return (
			<div className="records">
			<h2 className="title">Records</h2>
			<AmountBox type="success" text="Credits" amount={this.credits()} />
			<AmountBox type="danger" text="Debits" amount={this.debits()} />
			<AmountBox type="info" text="Balance" amount={this.amount()} />
			<RecordForm handleNewRecord={this.addRecord}/>
			<table className="table-hover table">
			<thead>
			<tr>
			<th>Date</th>
			<th>Title</th>
			<th>Amount</th>
			<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			{this.state.records.map(function(record) {
				return <Record key={record.id} record={record} handleDeleteRecord={this.deleteRecord}/>
			}.bind(this))}
			</tbody>
			</table>
			</div>
			);
	}
});
