package com.amazoonS3.mini.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.amazoonS3.mini.model.Comment;
import com.amazoonS3.mini.service.CommentService;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/board/{bIdx}")
    public List<Comment> getCommentsForBoard(@PathVariable int bIdx) {
        return commentService.getCommentsForBoard(bIdx);
    }

    @PostMapping
    public void insertComment(@RequestBody Comment comment) {
        commentService.insertComment(comment);
    }

    @PutMapping("/{cIdx}")
    public void updateComment(@PathVariable int cIdx, @RequestBody Comment comment) {
        comment.setCIdx(cIdx);
        commentService.updateComment(comment);
    }

    @DeleteMapping("/{cIdx}")
    public void deleteComment(@PathVariable int cIdx) {
        commentService.deleteComment(cIdx);
    }
}