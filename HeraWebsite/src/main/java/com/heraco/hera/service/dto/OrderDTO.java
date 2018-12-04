package com.heraco.hera.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.ArrayList;
import com.heraco.hera.domain.User;
import com.heraco.hera.domain.Address;
import com.heraco.hera.domain.BasketItem;
import com.heraco.hera.domain.TransportationMethod;

/**
 * A DTO for the Order entity.
 */
public class OrderDTO implements Serializable {

    private String id;

    private CleanUserDTO user;

    private ArrayList<BasketItem> orderLine;

    private Address address;

    private TransportationMethod transportationMethod;

    private String paymentMethod;

    private String date;

    private String state;

    private Double totalPrice;

    public OrderDTO() {
        this.orderLine = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CleanUserDTO getUser() {
        return user;
    }

    public void setUser(CleanUserDTO u) {
        this.user = u;
    }

    public void setOrderLine(ArrayList<BasketItem> b) {
        this.orderLine = b;
    }

    public ArrayList<BasketItem> getOrderLine() {
        return this.orderLine;
    }

    public void setAddress(Address a){
        this.address = a;
    }

    public Address getAddress(){
        return this.address;
    }

    public void setTransportationMethod(TransportationMethod t) {
        this.transportationMethod = t;
    }

    public TransportationMethod getTransportationMethod() {
        return this.transportationMethod;
    }

    public String getPaymentMethod(){
        return this.paymentMethod;
    }

    public void setPaymentMethod(String p){
        this.paymentMethod = p;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderDTO orderDTO = (OrderDTO) o;
        if (orderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderDTO{" + "id=" + getId() + ", date='" + getDate() + "'" + ", state='" + getState() + "'"
                + ", totalPrice=" + getTotalPrice() + "}";
    }
}
