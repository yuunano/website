function loadComments() {
    fetch('get_comments.php')
    .then(response => response.json())
    .then(data => {
        let commentList = document.getElementById("comment-list");
        commentList.innerHTML = "";

        data.comments.forEach(comment => {
            let newComment = document.createElement("li");
            newComment.textContent = `${comment.name}: ${comment.message}`;
            commentList.appendChild(newComment);
        });
    })
    .catch(error => console.error("コメント取得エラー:", error));
}

function addComment() {
    let nameInput = document.getElementById("name-input");
    let commentInput = document.getElementById("comment-input");
    let nameText = nameInput.value.trim();
    let commentText = commentInput.value.trim();

    if (commentText !== "") {
        fetch('save_comment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${encodeURIComponent(nameText)}&comment=${encodeURIComponent(commentText)}`
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            loadComments();
            nameInput.value = ""; // ✅ 名前欄をクリア
            commentInput.value = ""; // ✅ コメント欄をクリア
        })
        .catch(error => console.error("コメント送信エラー:", error));
    }
}

// ページ読み込み時にコメントを取得
window.onload = loadComments;