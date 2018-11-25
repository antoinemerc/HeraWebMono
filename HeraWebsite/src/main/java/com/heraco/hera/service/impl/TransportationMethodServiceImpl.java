package com.heraco.hera.service.impl;

import com.heraco.hera.service.TransportationMethodService;
import com.heraco.hera.domain.TransportationMethod;
import com.heraco.hera.repository.TransportationMethodRepository;
import com.heraco.hera.service.dto.TransportationMethodDTO;
import com.heraco.hera.service.mapper.TransportationMethodMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing TransportationMethod.
 */
@Service
public class TransportationMethodServiceImpl implements TransportationMethodService {

    private final Logger log = LoggerFactory.getLogger(TransportationMethodServiceImpl.class);

    private final TransportationMethodRepository transportationMethodRepository;

    private final TransportationMethodMapper transportationMethodMapper;


    public TransportationMethodServiceImpl(TransportationMethodRepository transportationMethodRepository, TransportationMethodMapper transportationMethodMapper) {
        this.transportationMethodRepository = transportationMethodRepository;
        this.transportationMethodMapper = transportationMethodMapper;
    }

    /**
     * Save a transportationMethod.
     *
     * @param transportationMethodDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransportationMethodDTO save(TransportationMethodDTO transportationMethodDTO) {
        log.debug("Request to save TransportationMethod : {}", transportationMethodDTO);
        TransportationMethod transportationMethod = transportationMethodMapper.toEntity(transportationMethodDTO);
        transportationMethod = transportationMethodRepository.save(transportationMethod);
        TransportationMethodDTO result = transportationMethodMapper.toDto(transportationMethod);
        return result;
    }

    /**
     * Get all the transportationMethods.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<TransportationMethodDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TransportationMethods");
        return transportationMethodRepository.findAll(pageable)
            .map(transportationMethodMapper::toDto);
    }


    /**
     * Get one transportationMethod by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<TransportationMethodDTO> findOne(String id) {
        log.debug("Request to get TransportationMethod : {}", id);
        return transportationMethodRepository.findById(id)
            .map(transportationMethodMapper::toDto);
    }

    /**
     * Delete the transportationMethod by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete TransportationMethod : {}", id);
        transportationMethodRepository.deleteById(id);
    }

    /**
     * Search for the transportationMethod corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     *//*
    @Override
    public Page<TransportationMethodDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TransportationMethods for query {}", query);
        return transportationMethodSearchRepository.search(queryStringQuery(query), pageable)
            .map(transportationMethodMapper::toDto);
    }*/
}
