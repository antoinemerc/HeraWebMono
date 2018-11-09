package com.heraco.hera.domain;
import java.io.Serializable;

public class Address implements Serializable{
    private String street1;
    private String country;

    public String getStreet1() {
        return street1;
    }

    public void setStreet1(String street1) {
        this.street1 = street1;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }


}