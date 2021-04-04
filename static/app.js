var train_data = {
    name: "",
    file: null
}
var message = null;
function render(){
    console.log('Rendering...');
    $('.form-item input').val('');
}
function update(){
    if(message){
        $('#message').html(
            '<div class="alert alert-'+_.get(message, 'type')+' alert-dismissible fade show" role="alert"><span class="'+_.get(message, 'type')+'">"' +_.get(message, 'message')+ '"</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        );
    }
}
$(document).ready(function(){
    $('#train #input-file').on('change', function(event){
        //console.log('Data stored!', event.target.files);
        train_data.file = _.get(event, 'target.files[0]', null);
    });
    $('#name-field').on('change', function(event){
        train_data.name = _.get(event, 'target.value', '');
    });
    $('#train').submit(function(event){
        message = null;
        //console.log('Form Submitted!', train_data);
        if(train_data.name && train_data.file){
            //Send data to api
            var train_form_data = new FormData();
            train_form_data.append('name', train_data.name);
            train_form_data.append('file', train_data.file);
            axios.post('/api/train', train_form_data).then(function(response){
                message = {type: 'success', message: 'Training has been done! User with ID: '+_.get(response, 'data.id')};
                update();
            }).catch(function(error){
                message = {type: 'danger', message: _.get(error, 'response.data.error.message', 'Unknown error!')}
                update();
            });
        }else{
            message = {type: 'danger', message: 'Name and Image file required!'}
        }
        update();
        event.preventDefault();
    });
render();
});