$('.btn_login').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
      url: '/user/login',
      type: "POST",
      data: {
        username: username,
        password: password
      }
    })
      .then(data => {
        if (data == 'Fail') { window.location.href = '/user'; }
        else {
          window.location.href ='/main'
        }
      })
      .catch(err => {
        console.log(err);
      })
})

