var Record = React.createClass({
	getInitialState: function() {
		return {
			edit: false			
		}
	},

	handleToggle: function(e) {
		e.preventDefault();
		this.setState({edit: !this.state.edit});
	},

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

	handleEdit: function(e) {
		e.preventDefault();
		var data = {
			date: React.findDOMNode(this.refs.date).value,
			title: React.findDOMNode(this.refs.title).value,
			amount: React.findDOMNode(this.refs.amount).value
		};
		var ajaxRequest = $.ajax({
			url: "/records/" + this.props.record.id,
			type: "PUT",
			dataType: "JSON",
			data: {record: data}
		});
		ajaxRequest.done(function(response){
			this.setState({edit: false});
			this.props.handleEditRecord(this.props.record, response);
		}.bind(this));
		ajaxRequest.fail(function(response){
			console.log(response);
			alert("Failed to update");
		});
	},

	recordRow: function() {
		return (
			<tr>
			<td>{this.props.record.date}</td>
			<td>{this.props.record.title}</td>
			<td>{amountFormat(this.props.record.amount)}</td>
			<td>
			<a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
			<a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
			</td>
			</tr>
			)
	},

	recordForm: function() {
		return (
			<tr>
			<td><input type="text" className='form-control' ref='date' defaultValue={this.props.record.date}/></td>
			<td><input type="text" className='form-control' ref='title' defaultValue={this.props.record.title}/></td>
			<td><input type="number" className='form-control' ref='amount' defaultValue={this.props.record.amount}/></td>
			<td>
			<a className="btn btn-default" onClick={this.handleEdit}>Update</a>
			<a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
			</td>
			</tr>
			)
	},

	render: function() {
		if (this.state.edit) {
			return this.recordForm();
		} else {
			return this.recordRow();
		}		
	}
});
