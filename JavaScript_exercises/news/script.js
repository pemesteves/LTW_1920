let commentForm = document.querySelector('#comments form');
commentForm.addEventListener('submit', submitComment);

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function submitComment(event) {
  let id = document.querySelector('#comments input[name=id]').value;
  let username = document.querySelector('#comments input[name=username]').value;
  let text = document.querySelector('#comments textarea[name=text]').value;
  let comment_id = document.querySelector('#comments .comment') != null ? document.querySelector('#comments .comment:last-of-type span.id').textContent : -1;


  let request = new XMLHttpRequest();
  request.addEventListener('load', receiveComments);
  request.open('POST', 'api_add_comment.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({id: id, username: username, text: text, comment_id: comment_id}));

  event.preventDefault();
}

function receiveComments(event) {
  let section = document.querySelector('#comments');
  let comments = JSON.parse(this.responseText);

  for (let i = 0; i < comments.length; i++) {
    let comment = document.createElement('article');
    comment.classList.add('comment');

    comment.innerHTML = '<span class="id">' +
      comments[i].id + '</span><span class="user">' +
      comments[i].name + '</span><span class="date">' +
      new Date(comments[i].published * 1000).toLocaleDateString() + ' '  +
      new Date(comments[i].published * 1000).toLocaleTimeString() + '</span><p>' +
      comments[i].text + '</p>';

    section.insertBefore(comment, commentForm);
  }
}
