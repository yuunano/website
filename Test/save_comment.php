<?php
header("Content-Type: application/json");

try {
    $pdo = new PDO('mysql:host=localhost;dbname=mydatabase;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 🔥 デバッグログを追加して「name」の値を確認
    $name = $_POST['name'] ?? '';
    error_log("受け取った名前: " . $name); // ✅ これでログに出力される！

    // 🔹 名前を未記入なら「名無しさん」
    $name = !empty($name) ? $name . "さん" : "名無しさん";

    $comment = $_POST['comment'] ?? '';

    if (!empty($comment)) {
        $stmt = $pdo->prepare("INSERT INTO comments (name, message) VALUES (:name, :message)");
        $stmt->execute(['name' => $name, 'message' => $comment]);

        echo json_encode(["status" => "success", "message" => "コメントを保存しました"]);
    } else {
        echo json_encode(["status" => "error", "message" => "コメントが空です"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "データベースエラー: " . $e->getMessage()]);
}
?>