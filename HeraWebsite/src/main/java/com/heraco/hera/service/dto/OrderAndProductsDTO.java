package com.heraco.hera.service.dto;

import java.io.Serializable;
import java.util.List;

import com.heraco.hera.service.dto.ProductDTO;

/**
 * A DTO for the Order entity.
 */
public class OrderAndProductsDTO implements Serializable {

    private OrderDTO order;

    private List<ProductDTO> products;

    public OrderAndProductsDTO() {
    }

    public OrderDTO getOrder() {
        return this.order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    public List<ProductDTO> getProducts() {
        return this.products;
    }

    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }

}
