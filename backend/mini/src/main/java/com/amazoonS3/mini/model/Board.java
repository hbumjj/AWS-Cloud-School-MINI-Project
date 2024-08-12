package com.amazoonS3.mini.model;

import java.util.ArrayList;
import java.util.List;

public class Board {

    private int bIdx;
    private int rowSpan;
    private int columnSpan;
    private String title;
    private String content;
    private List<Comment> comments = new ArrayList<>();
    private int likes;
    private int dislikes;

    public int getBIdx() {
        return this.bIdx;
    }

    public void setBIdx(int bIdx) {
        this.bIdx = bIdx;
    }

    public int getRowSpan() {
        return this.rowSpan;
    }

    public void setRowSpan(int rowSpan) {
        this.rowSpan = rowSpan;
    }

    public int getColumnSpan() {
        return this.columnSpan;
    }

    public void setColumnSpan(int columnSpan) {
        this.columnSpan = columnSpan;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void removeComment(Comment comment) {
        this.comments.remove(comment);
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }
}