package com.heraco.hera.service.dto;
import java.io.Serializable;


public class CleanBasketItemDTO implements Serializable{
    
    private CleanProductDTO prod;

    private Integer quantity;

    public CleanProductDTO getProd() {
        return prod;
    }

    public void setProd(CleanProductDTO prod) {
        this.prod = prod;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


}