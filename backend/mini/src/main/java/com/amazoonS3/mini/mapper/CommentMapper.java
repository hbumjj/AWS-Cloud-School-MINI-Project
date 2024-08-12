package com.amazoonS3.mini.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.amazoonS3.mini.model.Comment;
import java.util.List;

@Mapper
public interface CommentMapper {
    List<Comment> getCommentsForBoard(int bIdx);
    void insertComment(Comment comment);
    void updateComment(Comment comment);
    void deleteComment(int cIdx);
}