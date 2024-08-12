package com.amazoonS3.mini.model;

public class Comment {
    private int cIdx;
    private int bIdx;
    private String content;
    private String writer;
    private String regDate;

    public int getCIdx() {
        return cIdx;
    }

    public void setCIdx(int cIdx) {
        this.cIdx = cIdx;
    }

    public int getBIdx() {
        return bIdx;
    }

    public void setBIdx(int bIdx) {
        this.bIdx = bIdx;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }
}