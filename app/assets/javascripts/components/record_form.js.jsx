var RecordForm = React.createClass({
	getInitialState: function() {
		return {
			title: '',
			date: '',
			amount: ''
		}
	},

	valid: function() {
		return (this.state.title && this.state.date && this.state.amount)
	},

	handleChange: function(event) {
		var name = event.target.name;
		var obj = {};
		obj[name] = event.target.value;
		this.setState(obj);
	},

	handleSubmit: function(event) {
		event.preventDefault();
		var ajaxRequest = $.ajax({			
			url: '/records',
			type: 'POST',
			data: {record: this.state},
			dataType: 'JSON'
		});
		ajaxRequest.done(function(response){
			this.props.handleNewRecord(response);
			this.setState(this.getInitialState());
			console.log(response);
		}.bind(this)
		);
		ajaxRequest.fail(function(response){
			alert(response);
		});
	},

	render: function() {
		return(
			<form className='form-inline' onSubmit={this.handleSubmit}>
			<div className='form-group'>
			<input type="text" className='form-control' placeholder='Date' name='date' value={this.state.date} onChange={this.handleChange}>
			</input>
			</div>
			<div className='form-group'>
			<input type="text" className='form-control' placeholder='Title' name='title' value={this.state.title} onChange={this.handleChange}>
			</input>
			</div>
			<div className='form-group'>
			<input type="text" className='form-control' placeholder='Amount' name='amount' value={this.state.amount} onChange={this.handleChange}>
			</input>
			<input type="submit" className='btn btn-primary' disabled={!this.valid()} value="Create record">
			</input>
			</div>
			</form>
			);
	}
})