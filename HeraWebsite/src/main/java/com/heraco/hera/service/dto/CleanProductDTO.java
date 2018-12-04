package com.heraco.hera.service.dto;

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
import com.heraco.hera.service.dto.CleanCommentsDTO;
import com.heraco.hera.service.dto.CleanUserDTO;
import com.heraco.hera.domain.Category;
import com.heraco.hera.domain.ImageUrl;
import com.heraco.hera.domain.Comments;

/**
 * A Product.
 */
public class CleanProductDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    private String name;

    private String description;

    private Integer quantity;

    private Double price;

    private ArrayList<ImageUrl> allImageUrl;

    private CleanUserDTO user;

    private ArrayList<Category> categories;

    public CleanProductDTO(){
        this.allImageUrl = new ArrayList<ImageUrl>();
        this.categories = new ArrayList<Category>();
    }

 
    public CleanUserDTO getUser() {
        return user;
    }

    public void setUser(CleanUserDTO u) {
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
        CleanProductDTO product = (CleanProductDTO) o;
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
