package com.heraco.hera.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of TransportationMethodSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TransportationMethodSearchRepositoryMockConfiguration {

    @MockBean
    private TransportationMethodSearchRepository mockTransportationMethodSearchRepository;

}
