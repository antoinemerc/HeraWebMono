package com.heraco.hera.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TransportationMethod entity.
 */
public class TransportationMethodDTO implements Serializable {

    private String id;

    private String name;

    private Double fixCost;

    private Double percentCost;

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

    public Double getFixCost() {
        return fixCost;
    }

    public void setFixCost(Double fixCost) {
        this.fixCost = fixCost;
    }

    public Double getPercentCost() {
        return percentCost;
    }

    public void setPercentCost(Double percentCost) {
        this.percentCost = percentCost;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransportationMethodDTO transportationMethodDTO = (TransportationMethodDTO) o;
        if (transportationMethodDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transportationMethodDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransportationMethodDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fixCost=" + getFixCost() +
            ", percentCost=" + getPercentCost() +
            "}";
    }
}
