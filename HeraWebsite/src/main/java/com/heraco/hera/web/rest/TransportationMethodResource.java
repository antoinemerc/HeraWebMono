package com.heraco.hera.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.heraco.hera.service.TransportationMethodService;
import com.heraco.hera.web.rest.errors.BadRequestAlertException;
import com.heraco.hera.web.rest.util.HeaderUtil;
import com.heraco.hera.web.rest.util.PaginationUtil;
import com.heraco.hera.service.dto.TransportationMethodDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TransportationMethod.
 */
@RestController
@RequestMapping("/api")
public class TransportationMethodResource {

    private final Logger log = LoggerFactory.getLogger(TransportationMethodResource.class);

    private static final String ENTITY_NAME = "transportationMethod";

    private final TransportationMethodService transportationMethodService;

    public TransportationMethodResource(TransportationMethodService transportationMethodService) {
        this.transportationMethodService = transportationMethodService;
    }

    /**
     * POST  /transportation-methods : Create a new transportationMethod.
     *
     * @param transportationMethodDTO the transportationMethodDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportationMethodDTO, or with status 400 (Bad Request) if the transportationMethod has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transportation-methods")
    @Timed
    public ResponseEntity<TransportationMethodDTO> createTransportationMethod(@RequestBody TransportationMethodDTO transportationMethodDTO) throws URISyntaxException {
        log.debug("REST request to save TransportationMethod : {}", transportationMethodDTO);
        if (transportationMethodDTO.getId() != null) {
            throw new BadRequestAlertException("A new transportationMethod cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportationMethodDTO result = transportationMethodService.save(transportationMethodDTO);
        return ResponseEntity.created(new URI("/api/transportation-methods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transportation-methods : Updates an existing transportationMethod.
     *
     * @param transportationMethodDTO the transportationMethodDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportationMethodDTO,
     * or with status 400 (Bad Request) if the transportationMethodDTO is not valid,
     * or with status 500 (Internal Server Error) if the transportationMethodDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transportation-methods")
    @Timed
    public ResponseEntity<TransportationMethodDTO> updateTransportationMethod(@RequestBody TransportationMethodDTO transportationMethodDTO) throws URISyntaxException {
        log.debug("REST request to update TransportationMethod : {}", transportationMethodDTO);
        if (transportationMethodDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportationMethodDTO result = transportationMethodService.save(transportationMethodDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportationMethodDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transportation-methods : get all the transportationMethods.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transportationMethods in body
     */
    @GetMapping("/transportation-methods")
    @Timed
    public ResponseEntity<List<TransportationMethodDTO>> getAllTransportationMethods(Pageable pageable) {
        log.debug("REST request to get a page of TransportationMethods");
        Page<TransportationMethodDTO> page = transportationMethodService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transportation-methods");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /transportation-methods/:id : get the "id" transportationMethod.
     *
     * @param id the id of the transportationMethodDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transportationMethodDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transportation-methods/{id}")
    @Timed
    public ResponseEntity<TransportationMethodDTO> getTransportationMethod(@PathVariable String id) {
        log.debug("REST request to get TransportationMethod : {}", id);
        Optional<TransportationMethodDTO> transportationMethodDTO = transportationMethodService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transportationMethodDTO);
    }

    /**
     * DELETE  /transportation-methods/:id : delete the "id" transportationMethod.
     *
     * @param id the id of the transportationMethodDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transportation-methods/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportationMethod(@PathVariable String id) {
        log.debug("REST request to delete TransportationMethod : {}", id);
        transportationMethodService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * SEARCH  /_search/transportation-methods?query=:query : search for the transportationMethod corresponding
     * to the query.
     *
     * @param query the query of the transportationMethod search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/transportation-methods")
    @Timed
    public ResponseEntity<List<TransportationMethodDTO>> searchTransportationMethods(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TransportationMethods for query {}", query);
        Page<TransportationMethodDTO> page = transportationMethodService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/transportation-methods");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
