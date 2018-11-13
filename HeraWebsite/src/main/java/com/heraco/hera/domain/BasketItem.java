package com.heraco.hera.domain;
import java.io.Serializable;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class BasketItem implements Serializable{
    
    private String prod;
    private Integer quantity;

    public String getProd() {
        return prod;
    }

    public void setProd(String prod) {
        this.prod = prod;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


}