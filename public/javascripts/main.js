$.ajax({
    url: '/main/todo',
    type: 'GET'
})
    .then(data => {
        for (let i of data) {
            Add_data(i)
        }
        $('.delete_btn').click(function () {
            DeleteId($(this).parent().attr('id'))
        })

        Edit();

    })

$('.add__btn').click(function () {
    var value = $('#title').val();
    $('#title').val('')
    if (value === '') { alert('Not Job to add') } else {
        $.ajax({
            url: '/main/todo',
            type: 'POST',
            data: {
                title: value
            }
        })
            .then(data => {
                Add_data(data);
                $('.delete_btn').click(function () {
                    DeleteId($(this).parent().attr('id'))
                })
                Edit();
            })
    }
})


function Add_data(data) {
    $('.content__main').append(`<div class="content__main-item" id="${data._id}">
                <input class="content__main-input hidden" placeholder="${data.title}" name="title">
                <button class="confirm_btn hidden">Confirm</button>
                <span>Title: ${data.title}</span>
                <span class="delete_btn"><i class="far fa-trash-alt"></i></span>
                <span class="edit_btn"><i class="far fa-edit"></i></span>
                </div>`)
}

function DeleteId(id) {
    $.ajax({
        url: '/main/todo/' + id,
        type: 'DELETE',
    })
        .then(data => {
            console.log(data);
            $('#' + id).remove();
        })
}

function Edit() {
    $('.edit_btn').click(function () {
        if ($(this).siblings('input').hasClass('hidden')) {
            $(this).siblings('span:first').addClass('hidden')
            $(this).siblings('input').removeClass('hidden')
            $(this).siblings('button').removeClass('hidden')
        } else {
            $(this).siblings('span:first').removeClass('hidden')
            $(this).siblings('input').addClass('hidden')
            $(this).siblings('button').addClass('hidden')
        }
    })

    $('.confirm_btn').click(function () {
        var id = $(this).parent().attr('id')
        var content = $(this).siblings('input').val()
        $.ajax({
            url: '/main/todo/' + id,
            type: 'PUT',
            data: {
                title: content,
            }
        })
            .then(data => {
                $(this).siblings('span:first').html(`Title:${content}`);
                $(this).siblings('span:first').removeClass('hidden');
                $(this).siblings('input').addClass('hidden')
                $(this).addClass('hidden')
            })
    })
}
