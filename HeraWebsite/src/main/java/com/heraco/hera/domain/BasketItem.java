package com.heraco.hera.domain;
import java.io.Serializable;
import com.heraco.hera.domain.Product;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Document
public class BasketItem implements Serializable{
    
    private String prod;
    private Integer quantity;

    public String getProd() {
        return prod;
    }

    public void setProduct(String prod) {
        this.prod = prod;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


}