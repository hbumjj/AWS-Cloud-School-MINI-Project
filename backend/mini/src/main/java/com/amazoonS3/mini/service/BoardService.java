package com.amazoonS3.mini.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazoonS3.mini.mapper.BoardMapper;
import com.amazoonS3.mini.model.Board;
import com.amazoonS3.mini.model.Comment;
import com.amazoonS3.mini.service.CommentService;

import java.util.List;

@Service
public class BoardService {

    private final BoardMapper boardMapper;
    private final CommentService commentService;

    @Autowired
    public BoardService(BoardMapper boardMapper, CommentService commentService) {
        this.boardMapper = boardMapper;
        this.commentService = commentService;
    }

    public List<Board> getAll() {
        List<Board> boards = boardMapper.getAll();
        for (Board board : boards) {
            List<Comment> comments = commentService.getCommentsForBoard(board.getBIdx());
            board.setComments(comments);
        }
        return boards;
    }

    public Board insertBoard(Board board) {
        boardMapper.insertBoard(board);
        return boardMapper.getBoardById(board.getBIdx());
    }

    public Board updateBoard(Board board) {
        boardMapper.updateBoard(board);
        return boardMapper.getBoardById(board.getBIdx());
    }

    public void deleteBoard(int bIdx) {
        boardMapper.deleteBoard(bIdx);
    }

    public Board likeBoard(int bIdx) {
        Board board = boardMapper.getBoardById(bIdx);
        board.setLikes(board.getLikes() + 1);
        boardMapper.updateBoard(board);
        return boardMapper.getBoardById(bIdx);
    }

    public Board dislikeBoard(int bIdx) {
        Board board = boardMapper.getBoardById(bIdx);
        board.setDislikes(board.getDislikes() + 1);
        boardMapper.updateBoard(board);
        return boardMapper.getBoardById(bIdx);
    }

    public Board getBoardWithComments(int bIdx) {
        Board board = boardMapper.getBoardById(bIdx);
        List<Comment> comments = commentService.getCommentsForBoard(bIdx);
        board.setComments(comments);
        return board;
    }
}