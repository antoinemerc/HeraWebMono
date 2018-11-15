package com.heraco.hera.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.ArrayList;
import com.heraco.hera.domain.User;
import com.heraco.hera.domain.Category;
import com.heraco.hera.domain.Comment;
import com.heraco.hera.domain.ImageUrl;

/**
 * A DTO for the Product entity.
 */
public class ProductDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    private String description;

    @NotNull
    private Integer quantity;

    @NotNull
    private Double price;

    private User user;

    private ArrayList<ImageUrl> allImageUrl;

    private ArrayList<Category> categories;

    private ArrayList<Comment> comments;

    public ProductDTO(){
        this.allImageUrl = new ArrayList<ImageUrl>();
        this.categories = new ArrayList<Category>();
        this.comments = new ArrayList<Comment>();
    }

    public ArrayList<Comment> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comment> c) {
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if (productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" + "id=" + getId() + ", name='" + getName() + "'" + ", description='" + getDescription()
                + "'" + ", quantity=" + getQuantity() + ", price=" + getPrice() + "}";
    }
}
