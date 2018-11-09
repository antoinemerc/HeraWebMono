package com.heraco.hera.domain;
import java.io.Serializable;
import com.heraco.hera.domain.Product;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class BasketItem implements Serializable{
    
    @DBRef(lazy = true)
    @Field("productID")
    private Product product;

    @Field("quantity")
    private Integer quantity;


    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


}