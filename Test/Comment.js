// Firebase設定（実況さんのデータ）
const firebaseConfig = {
  apiKey: "AIzaSyA-YiaO54yJ5SidkOs2wPx3z0rG7-ki3rU",
  authDomain: "yuuwebsite-d888c.firebaseapp.com",
  projectId: "yuuwebsite-d888c",
  storageBucket: "yuuwebsite-d888c.firebasestorage.app",
  messagingSenderId: "521996734577",
  appId: "1:521996734577:web:52d598ca003a88c494cbd0"
};

// 初期化（SDK v8形式）
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ページごとのコレクションIDを自動生成（例：dashboard.html → "dashboard"）
const pathName = window.location.pathname.split("/").pop(); // ファイル名のみ
const pageID = pathName.replace(/\.html?$/, "") || "home"; // 拡張子削除＆空なら"home"

// コメント読み込み処理
function loadComments() {
  const list = document.getElementById("comment-list");
  if (!list) return; // コメント表示欄がない場合は無視

  db.collection(pageID).orderBy("timestamp", "desc").get().then(snapshot => {
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const item = document.createElement("li");
      item.textContent = `${data.name}: ${data.message}`;

      const delBtn = document.createElement("button");
      //delBtn.textContent = "削除";
      //delBtn.onclick = () => {
      //  db.collection(pageID).doc(doc.id).delete().then(loadComments);
      //};

      item.appendChild(delBtn);
      list.appendChild(item);
    });
  });
}

// コメント送信処理
function addComment() {
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");
  if (!nameInput || !commentInput) return;

  const name = nameInput.value.trim() || "名無し実況";
  const message = commentInput.value.trim();

  if (message !== "") {
    db.collection(pageID).add({
      name,
      message,
      timestamp: Date.now()
    }).then(() => {
      commentInput.value = "";
      loadComments();
    });
  }
}

// ページ読み込み時にコメント表示
window.onload = loadComments;
