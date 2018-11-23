package com.heraco.hera.service.mapper;

import com.heraco.hera.domain.*;
import com.heraco.hera.service.dto.TransportationMethodDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransportationMethod and its DTO TransportationMethodDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransportationMethodMapper extends EntityMapper<TransportationMethodDTO, TransportationMethod> {



    default TransportationMethod fromId(String id) {
        if (id == null) {
            return null;
        }
        TransportationMethod transportationMethod = new TransportationMethod();
        transportationMethod.setId(id);
        return transportationMethod;
    }
}
