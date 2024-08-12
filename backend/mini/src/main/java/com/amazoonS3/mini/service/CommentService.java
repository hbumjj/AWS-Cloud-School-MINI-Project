package com.amazoonS3.mini.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.amazoonS3.mini.mapper.CommentMapper;
import com.amazoonS3.mini.model.Comment;
import java.util.List;

@Service
public class CommentService {

    private final CommentMapper commentMapper;

    @Autowired
    public CommentService(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    public List<Comment> getCommentsForBoard(int bIdx) {
        return commentMapper.getCommentsForBoard(bIdx);
    }

    public void insertComment(Comment comment) {
        commentMapper.insertComment(comment);
    }

    public void updateComment(Comment comment) {
        commentMapper.updateComment(comment);
    }

    public void deleteComment(int cIdx) {
        commentMapper.deleteComment(cIdx);
    }
}