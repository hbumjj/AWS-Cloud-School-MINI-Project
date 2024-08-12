package com.amazoonS3.mini.mapper;

import com.amazoonS3.mini.model.Board;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    
    List<Board> getAll();
    
    void insertBoard(Board board);
    
    void updateBoard(Board board);
    
    Board getBoardById(int bIdx);
    
    void deleteBoard(int bIdx);
}