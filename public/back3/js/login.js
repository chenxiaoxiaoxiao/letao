$(function(){
  // 1.校验用户名和密码
  $('#form').bootstrapValidator({
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback: {
            message: '用户名不存在'
          }

        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
    
  })
  // 2.提交信息
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $("#form").serialize(),
      dataType: 'json',
      success: function(info){
        if( info.success ){
          location.href="index.html"
        }
        if(info.error==1000){
          $("#form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        }
        if(info.error==1001){
          $("#form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');

        }
      }
    })
})

//重置
$('button[type="reset"]').click(function(){
  $("#form").data('bootstrapValidator').resetForm(true);
})
  
})