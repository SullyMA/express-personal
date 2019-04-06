var trash = document.getElementsByClassName("fa-trash");
var pageGetter = document.getElementById("Submit");

document.getElementById('hiddenDate').valueAsDate = new Date();

//get page with date
pageGetter.addEventListener('click', function(){
  //childNodes is an input tag, referencing an odd #
  const date = this.parentNode.childNodes[1].value
  window.location.href = '/?date=' + date
});

//trash icon function

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    //childNodes is an input tag, referencing an odd #
    const msg = this.parentNode.parentNode.childNodes[1].innerText
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
