package com.heraco.hera.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.io.Serializable;
import java.util.Objects;
import java.util.ArrayList;
import com.heraco.hera.domain.User;
import com.heraco.hera.domain.Category;
import com.heraco.hera.domain.ImageUrl;
import com.heraco.hera.domain.Comments;

/**
 * A Product.
 */
@Document(collection = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @NotNull
    @Field("quantity")
    private Integer quantity;

    @NotNull
    @Field("price")
    private Double price;

    @Field("allImageUrl")
    private ArrayList<ImageUrl> allImageUrl;

    @DBRef(lazy = true)
    @Field("user")
    private User user;

    @DBRef(lazy = true)
    @Field("categories")
    private ArrayList<Category> categories;

    @Field("comments")
    private ArrayList<Comments> comments;


    public Product(){
        this.allImageUrl = new ArrayList<ImageUrl>();
        this.categories = new ArrayList<Category>();
        this.comments = new ArrayList<Comments>();
    }

    public ArrayList<Comments> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comments> c) {
        this.comments = c;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User u) {
        this.user = u;
    }

    public ArrayList<Category> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<Category> c) {
        this.categories = c;
    }

    public void setAllImageUrl(ArrayList<ImageUrl> allImageUrl) {
        this.allImageUrl = allImageUrl;
    }

    public ArrayList<ImageUrl> getAllImageUrl() {
        return allImageUrl;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Product quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public Product price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" + "id=" + getId() + ", name='" + getName() + "'" + ", description='" + getDescription() + "'"
                + ", quantity=" + getQuantity() + ", price=" + getPrice() + "}";
    }
}
