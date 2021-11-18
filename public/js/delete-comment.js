const delButtonHandler = async (event) => {
    event.preventDefault();
    const comment_id = document.querySelector('#edit-comment-id').value;

    const response = await fetch(`/api/comment/${comment_id}`, {
        method: 'DELETE',
    });

        if (response.ok) {
            window.alert('Comment deleted');
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete comment');
        }
};

document
    .querySelector('#delete-comment-button')
    .addEventListener('click', delButtonHandler);
