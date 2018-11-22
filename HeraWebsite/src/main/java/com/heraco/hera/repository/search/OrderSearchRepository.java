package com.heraco.hera.repository.search;

import com.heraco.hera.domain.Order;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Order entity.
 */
public interface OrderSearchRepository extends ElasticsearchRepository<Order, String> {
}
