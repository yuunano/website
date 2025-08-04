<?php
$pdo = new PDO('mysql:host=localhost;dbname=mydatabase;charset=utf8', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->prepare("DELETE FROM comments WHERE id = :id"); // ✅ ID指定で削除
$stmt->execute(['id' => $_POST['comment_id']]); // ✅ 指定されたコメントIDを削除

echo json_encode(["status" => "success", "message" => "コメントを削除しました"]);
?>