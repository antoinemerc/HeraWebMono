package com.heraco.hera.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;
import java.util.ArrayList;

/**
 * A Order.
 */
@Document(collection = "order")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef(lazy = true)
    @Field("user")
    private User user;

    @Field("orderLine")
    private ArrayList<BasketItem> orderLine;

    @Field("address")
    private Address address;

    @DBRef(lazy = true)
    @Field("transportationMethod")
    private TransportationMethod transportationMethod;

    @Field("date")
    private String date;

    @Field("state")
    private String state;

    @Field("totalPrice")
    private Double totalPrice;

    public Order() {
        this.orderLine = new ArrayList<>();
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User u) {
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

    public String getDate() {
        return date;
    }

    public Order date(String date) {
        this.date = date;
        return this;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getState() {
        return state;
    }

    public Order state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public Order totalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
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
        Order order = (Order) o;
        if (order.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), order.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Order{" + "id=" + getId() + ", date='" + getDate() + "'" + ", state='" + getState() + "'"
                + ", totalPrice=" + getTotalPrice() + "}";
    }
}
