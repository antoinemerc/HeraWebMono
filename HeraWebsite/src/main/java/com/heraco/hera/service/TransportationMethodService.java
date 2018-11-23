package com.heraco.hera.service;

import com.heraco.hera.service.dto.TransportationMethodDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing TransportationMethod.
 */
public interface TransportationMethodService {

    /**
     * Save a transportationMethod.
     *
     * @param transportationMethodDTO the entity to save
     * @return the persisted entity
     */
    TransportationMethodDTO save(TransportationMethodDTO transportationMethodDTO);

    /**
     * Get all the transportationMethods.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TransportationMethodDTO> findAll(Pageable pageable);


    /**
     * Get the "id" transportationMethod.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TransportationMethodDTO> findOne(String id);

    /**
     * Delete the "id" transportationMethod.
     *
     * @param id the id of the entity
     */
    void delete(String id);

    /**
     * Search for the transportationMethod corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TransportationMethodDTO> search(String query, Pageable pageable);
}
