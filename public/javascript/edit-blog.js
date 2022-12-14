async function editFormHandler(event) {
    event.preventDefault();

    //update names if changed in handlebars
    const title = document.querySelector('input[name="blog-title"]').value.trim();
    const blog_post = document.querySelector('textarea[name="blog-post"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            blog_post,
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/edit-blogs/');
        console.log()
    } else {
        alert(response.statusText);
    }
}
//update classes if changed in handlebars
document.querySelector('#save-blog-btn').addEventListener('click', editFormHandler);