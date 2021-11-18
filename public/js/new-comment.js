const post_id = document.querySelector('input[name="post-id"]').value;

async function newCommentFormHandler(event) {
    event.preventDefault();

    const commentbody = document.querySelector('#new-comment-body').value.trim();

    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        commentbody
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.alert("Comment added!");
      document.location.replace(`/api/post/${post_id}`);
    } else {
      alert('Failed to add comment');
    }
}
  
document.querySelector('.new-comment-form').addEventListener('submit', newCommentFormHandler);