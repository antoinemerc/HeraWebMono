package com.heraco.hera.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TransportationMethod.
 */
@Document(collection = "transportation_method")
public class TransportationMethod implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("fix_cost")
    private Double fixCost;

    @Field("percent_cost")
    private Double percentCost;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TransportationMethod name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getFixCost() {
        return fixCost;
    }

    public TransportationMethod fixCost(Double fixCost) {
        this.fixCost = fixCost;
        return this;
    }

    public void setFixCost(Double fixCost) {
        this.fixCost = fixCost;
    }

    public Double getPercentCost() {
        return percentCost;
    }

    public TransportationMethod percentCost(Double percentCost) {
        this.percentCost = percentCost;
        return this;
    }

    public void setPercentCost(Double percentCost) {
        this.percentCost = percentCost;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TransportationMethod transportationMethod = (TransportationMethod) o;
        if (transportationMethod.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transportationMethod.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransportationMethod{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fixCost=" + getFixCost() +
            ", percentCost=" + getPercentCost() +
            "}";
    }
}
