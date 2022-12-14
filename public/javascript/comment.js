async function commentFormHandler(event) {
    event.preventDefault();

    //update if comment name are different
    const comment_text = document.querySelector('textarea[name="comment-body"]').value;
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                blog_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

//update if comment classes are different
document.querySelector('#comment-submit').addEventListener('click', commentFormHandler);