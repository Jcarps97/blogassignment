const delButtonHandler = async (event) => {
    event.preventDefault();
    const post_id = document.querySelector('#edit-post-id').value;

    const response = await fetch(`/api/post/${post_id}`, {
        method: 'DELETE',
    });

        if (response.ok) {
            window.alert('Post Deleted!');
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
};

document
    .querySelector('#delete-post-button')
    .addEventListener('click', delButtonHandler);