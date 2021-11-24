// const { response } = require("express");
const post_id = document.querySelector('input[name="post-id"]').value;

async function newCommentFormHandler(event) {
    event.preventDefault();

    const body = document.querySelector('#new-comment-body').value.trim();

    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        body
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      console.log(response)
      window.alert("Comment added!");
      document.location.replace(`/api/post/${post_id}`);
    } else {
      alert('Failed to add comment');
    }
}
  
document.querySelector('.new-comment-form').addEventListener('submit', newCommentFormHandler);