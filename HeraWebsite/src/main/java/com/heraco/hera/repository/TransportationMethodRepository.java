package com.heraco.hera.repository;

import com.heraco.hera.domain.TransportationMethod;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the TransportationMethod entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportationMethodRepository extends MongoRepository<TransportationMethod, String> {

}
