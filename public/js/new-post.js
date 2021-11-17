const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#pname').value.trim();
    const body = document.querySelector('#pbody').value.trim();

    const response = await fetch(`/api/post`, {
        method: `POST`,
        body: JSON.stringify({
            title,
            body,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
      alert('failed to create post');
    }
}

document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);