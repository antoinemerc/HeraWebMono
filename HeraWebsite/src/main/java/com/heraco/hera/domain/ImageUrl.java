package com.heraco.hera.domain;
import java.io.Serializable;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ImageUrl implements Serializable{

    private String url;
    private String alternativeText;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAlternativeText() {
        return alternativeText;
    }

    public void setAlternativeText(String alternativeText) {
        this.alternativeText = alternativeText;
    }

}