// GET DATA

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

// POST DATA

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

// function add_data after post

function Add_data(data) {
    $('.content__main').append(`<div class="content__main-item" id="${data._id}">
                <input class="content__main-input hidden" placeholder="${data.title}" name="title">
                <button class="confirm_btn hidden">Confirm</button>
                <span class="content__main-title">* ${data.title}</span>
                <span class="edit_btn"><i class="far fa-edit"></i></span>
                <span class="delete_btn"><i class="far fa-trash-alt"></i></span>
                </div>`)
}

//  function Delete Data following Id
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

// function Edit Data following Id
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
        var content = $(this).siblings('input').val();
        if (content === '') { alert('Not information to update') }
        else {
            $.ajax({
                url: '/main/todo/' + id,
                type: 'PUT',
                data: {
                    title: content,
                }
            })
                .then(data => {
                    $(this).siblings('span:first').html(`* ${content}`);
                    $(this).siblings('span:first').removeClass('hidden');
                    $(this).siblings('input').addClass('hidden')
                    $(this).addClass('hidden')
                })
        }
    })
}
