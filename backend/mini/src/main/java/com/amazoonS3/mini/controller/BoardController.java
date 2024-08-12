package com.amazoonS3.mini.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.amazoonS3.mini.model.Board;
import com.amazoonS3.mini.service.BoardService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("data", boardService.getAll());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> insertBoard(@RequestBody Board board) {
        Board insertedBoard = boardService.insertBoard(board);
        Map<String, Object> response = new HashMap<>();
        response.put("data", insertedBoard);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{bIdx}")
    public ResponseEntity<Map<String, Object>> updateBoard(@PathVariable int bIdx, @RequestBody Board board) {
        board.setBIdx(bIdx);
        Board updatedBoard = boardService.updateBoard(board);
        Map<String, Object> response = new HashMap<>();
        response.put("data", updatedBoard);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{bIdx}")
    public ResponseEntity<Map<String, Object>> deleteBoard(@PathVariable int bIdx) {
        boardService.deleteBoard(bIdx);
        Map<String, Object> response = new HashMap<>();
        response.put("data", "Board item deleted successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{bIdx}/like")
    public ResponseEntity<Map<String, Object>> likeBoard(@PathVariable int bIdx) {
        Board likedBoard = boardService.likeBoard(bIdx);
        Map<String, Object> response = new HashMap<>();
        response.put("data", likedBoard);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{bIdx}/dislike")
    public ResponseEntity<Map<String, Object>> dislikeBoard(@PathVariable int bIdx) {
        Board dislikedBoard = boardService.dislikeBoard(bIdx);
        Map<String, Object> response = new HashMap<>();
        response.put("data", dislikedBoard);
        return ResponseEntity.ok(response);
    }
}