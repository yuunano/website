<?php
header("Content-Type: application/json");

try {
    $pdo = new PDO('mysql:host=localhost;dbname=mydatabase;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 🔹 `name` と `message` を取得
    $stmt = $pdo->query("SELECT name, message FROM comments ORDER BY id DESC");
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 🔹 データが空の場合は「コメントなし」と返す
    if (empty($comments)) {
        echo json_encode(["status" => "success", "message" => "まだコメントがありません"]);
    } else {
        echo json_encode(["status" => "success", "comments" => $comments]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "データ取得失敗: " . $e->getMessage()]);
}
?>