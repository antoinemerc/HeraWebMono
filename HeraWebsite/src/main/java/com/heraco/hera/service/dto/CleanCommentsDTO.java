package com.heraco.hera.service.dto;
import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.heraco.hera.service.dto.CleanUserDTO;

import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;

public class CleanCommentsDTO implements Serializable {

    private CleanUserDTO user;

    private String title;

    private String body;

    private Integer note;

    private String date ;

    public CleanCommentsDTO() {
    }

    public CleanUserDTO getUser() {
        return user;
    }

    public void setUser(CleanUserDTO u) {
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public CleanCommentsDTO(String title, String body, Integer note, String date) {
        this.title = title;
        this.body = body;
        this.note = note;
        this.date = date;
    }
}