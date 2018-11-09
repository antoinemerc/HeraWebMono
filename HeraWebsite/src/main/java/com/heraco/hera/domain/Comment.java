package com.heraco.hera.domain;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Date;

public class Comment implements Serializable {

    @DBRef(lazy = true)
    @Field("user")
    private User user;
    @Field("title")
    private String title;
    @Field("body")
    private String body;
    @Field("note")
    private Integer note;
    @Field("date")
    private Date date ;

    public Comment() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User u) {
        this.user  = u;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Comment(String title, String body, Integer note, Date date) {
        this.title = title;
        this.body = body;
        this.note = note;
        this.date = date;
    }
}