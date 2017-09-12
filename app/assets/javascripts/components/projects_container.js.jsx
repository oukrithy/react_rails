
var ProjectsContainer = React.createClass({

  getInitialState: function(){
    return {
      projects: this.props.projects,
    }
  }, //-----ends getInitialState function

  parentProjectSubmit: function(formData, onSuccess, onError){
    $.ajax({
      url: "/projects",
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: function(projects) {
        this.setState({projects: projects});
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON)
      }
    });
  }, //-----ends parentProjectSubmit function

  parentUpdateProject: function(formData, onSuccess, onError){
    $.ajax({
      url: ("/projects/" + formData["project"]["id"]),
      dataType: 'json',
      type: 'PATCH',
      data: formData,
      success: function(projects) {
        this.setState({projects: projects, showNewForm: false});
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON)
      }
    });
  }, //-----ends parentUpdateProject function

  render: function() {
    return(
      <div>
        <h1> Project List </h1>
        <ProjectCost projects={this.state.projects} />
        <ProjectTable projects={this.state.projects} parentUpdateProject={this.parentUpdateProject} />
        <NewProjectForm parentProjectSubmit={this.parentProjectSubmit} />
      </div>
    );
  }
});
