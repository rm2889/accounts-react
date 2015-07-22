var Record = React.createClass({
	handleDelete: function(e) {
		e.preventDefault();
		var ajaxRequest = $.ajax({
			url: "/records/" + this.props.record.id,
			type: 'DELETE',
			dataType: 'JSON'
		});
		ajaxRequest.done(function(response){
			this.props.handleDeleteRecord(this.props.record);
		}.bind(this));
		ajaxRequest.fail(function(response){
			alert('failed!');
		})
	},

	render: function() {
		return (
		<tr>
		<td>{this.props.record.date}</td>
		<td>{this.props.record.title}</td>
		<td>{amountFormat(this.props.record.amount)}</td>
		<td><a className="btn btn-danger" onClick={this.handleDelete}>Delete</a></td>
		</tr>
		)
	}
});
