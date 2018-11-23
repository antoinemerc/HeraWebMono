package com.heraco.hera.repository.search;

import com.heraco.hera.domain.TransportationMethod;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TransportationMethod entity.
 */
public interface TransportationMethodSearchRepository extends ElasticsearchRepository<TransportationMethod, String> {
}
