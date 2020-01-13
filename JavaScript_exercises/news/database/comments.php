<?php
  function getCommentsByNewId($id) {
    global $db;
    $stmt = $db->prepare('SELECT * FROM comments JOIN users USING (username) WHERE news_id = ?');
    $stmt->execute(array($id));
    return $stmt->fetchAll();
  }

  function getCommentsAfterId($id, $comment_id) {
    global $db;
    $stmt = $db->prepare('SELECT comments.*, users.name FROM comments JOIN users USING (username) WHERE news_id = ? AND comments.id > ?');
    $stmt->execute(array($id, $comment_id));
    return $stmt->fetchAll();
  }

  function addComment($id, $username, $text) {
    global $db;

    $stmt = $db->prepare('INSERT INTO comments (id, news_id, username, published, text) VALUES (NULL, ?, ?, ?, ?)');
    $stmt->execute(array($id, $username, time(), $text));
  }
?>
