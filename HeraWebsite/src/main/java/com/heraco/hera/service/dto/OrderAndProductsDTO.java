package com.heraco.hera.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.ArrayList;
import com.heraco.hera.domain.User;
import com.heraco.hera.service.dto.ProductDTO;
import com.heraco.hera.domain.Address;
import com.heraco.hera.domain.BasketItem;
import com.heraco.hera.domain.TransportationMethod;

/**
 * A DTO for the Order entity.
 */
public class OrderAndProductsDTO implements Serializable {

    private OrderDTO order;

    private ArrayList<ProductDTO> products;

    public OrderAndProductsDTO() {
    }

    public OrderDTO getOrder() {
        return this.order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    public ArrayList<ProductDTO> getProducts() {
        return this.products;
    }

    public void setProducts(ArrayList<ProductDTO> products) {
        this.products = products;
    }

}
