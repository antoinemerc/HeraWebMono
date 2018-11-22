package com.heraco.hera.web.rest;

import com.heraco.hera.HeraShopApp;

import com.heraco.hera.domain.TransportationMethod;
import com.heraco.hera.repository.TransportationMethodRepository;
import com.heraco.hera.repository.search.TransportationMethodSearchRepository;
import com.heraco.hera.service.TransportationMethodService;
import com.heraco.hera.service.dto.TransportationMethodDTO;
import com.heraco.hera.service.mapper.TransportationMethodMapper;
import com.heraco.hera.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;


import static com.heraco.hera.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TransportationMethodResource REST controller.
 *
 * @see TransportationMethodResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HeraShopApp.class)
public class TransportationMethodResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_FIX_COST = 1D;
    private static final Double UPDATED_FIX_COST = 2D;

    private static final Double DEFAULT_PERCENT_COST = 1D;
    private static final Double UPDATED_PERCENT_COST = 2D;

    @Autowired
    private TransportationMethodRepository transportationMethodRepository;

    @Autowired
    private TransportationMethodMapper transportationMethodMapper;
    
    @Autowired
    private TransportationMethodService transportationMethodService;

    /**
     * This repository is mocked in the com.heraco.hera.repository.search test package.
     *
     * @see com.heraco.hera.repository.search.TransportationMethodSearchRepositoryMockConfiguration
     */
    @Autowired
    private TransportationMethodSearchRepository mockTransportationMethodSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restTransportationMethodMockMvc;

    private TransportationMethod transportationMethod;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransportationMethodResource transportationMethodResource = new TransportationMethodResource(transportationMethodService);
        this.restTransportationMethodMockMvc = MockMvcBuilders.standaloneSetup(transportationMethodResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransportationMethod createEntity() {
        TransportationMethod transportationMethod = new TransportationMethod()
            .name(DEFAULT_NAME)
            .fixCost(DEFAULT_FIX_COST)
            .percentCost(DEFAULT_PERCENT_COST);
        return transportationMethod;
    }

    @Before
    public void initTest() {
        transportationMethodRepository.deleteAll();
        transportationMethod = createEntity();
    }

    @Test
    public void createTransportationMethod() throws Exception {
        int databaseSizeBeforeCreate = transportationMethodRepository.findAll().size();

        // Create the TransportationMethod
        TransportationMethodDTO transportationMethodDTO = transportationMethodMapper.toDto(transportationMethod);
        restTransportationMethodMockMvc.perform(post("/api/transportation-methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportationMethodDTO)))
            .andExpect(status().isCreated());

        // Validate the TransportationMethod in the database
        List<TransportationMethod> transportationMethodList = transportationMethodRepository.findAll();
        assertThat(transportationMethodList).hasSize(databaseSizeBeforeCreate + 1);
        TransportationMethod testTransportationMethod = transportationMethodList.get(transportationMethodList.size() - 1);
        assertThat(testTransportationMethod.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTransportationMethod.getFixCost()).isEqualTo(DEFAULT_FIX_COST);
        assertThat(testTransportationMethod.getPercentCost()).isEqualTo(DEFAULT_PERCENT_COST);

        // Validate the TransportationMethod in Elasticsearch
        verify(mockTransportationMethodSearchRepository, times(1)).save(testTransportationMethod);
    }

    @Test
    public void createTransportationMethodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportationMethodRepository.findAll().size();

        // Create the TransportationMethod with an existing ID
        transportationMethod.setId("existing_id");
        TransportationMethodDTO transportationMethodDTO = transportationMethodMapper.toDto(transportationMethod);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportationMethodMockMvc.perform(post("/api/transportation-methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportationMethodDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransportationMethod in the database
        List<TransportationMethod> transportationMethodList = transportationMethodRepository.findAll();
        assertThat(transportationMethodList).hasSize(databaseSizeBeforeCreate);

        // Validate the TransportationMethod in Elasticsearch
        verify(mockTransportationMethodSearchRepository, times(0)).save(transportationMethod);
    }

    @Test
    public void getAllTransportationMethods() throws Exception {
        // Initialize the database
        transportationMethodRepository.save(transportationMethod);

        // Get all the transportationMethodList
        restTransportationMethodMockMvc.perform(get("/api/transportation-methods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportationMethod.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].fixCost").value(hasItem(DEFAULT_FIX_COST.doubleValue())))
            .andExpect(jsonPath("$.[*].percentCost").value(hasItem(DEFAULT_PERCENT_COST.doubleValue())));
    }
    
    @Test
    public void getTransportationMethod() throws Exception {
        // Initialize the database
        transportationMethodRepository.save(transportationMethod);

        // Get the transportationMethod
        restTransportationMethodMockMvc.perform(get("/api/transportation-methods/{id}", transportationMethod.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transportationMethod.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.fixCost").value(DEFAULT_FIX_COST.doubleValue()))
            .andExpect(jsonPath("$.percentCost").value(DEFAULT_PERCENT_COST.doubleValue()));
    }

    @Test
    public void getNonExistingTransportationMethod() throws Exception {
        // Get the transportationMethod
        restTransportationMethodMockMvc.perform(get("/api/transportation-methods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTransportationMethod() throws Exception {
        // Initialize the database
        transportationMethodRepository.save(transportationMethod);

        int databaseSizeBeforeUpdate = transportationMethodRepository.findAll().size();

        // Update the transportationMethod
        TransportationMethod updatedTransportationMethod = transportationMethodRepository.findById(transportationMethod.getId()).get();
        updatedTransportationMethod
            .name(UPDATED_NAME)
            .fixCost(UPDATED_FIX_COST)
            .percentCost(UPDATED_PERCENT_COST);
        TransportationMethodDTO transportationMethodDTO = transportationMethodMapper.toDto(updatedTransportationMethod);

        restTransportationMethodMockMvc.perform(put("/api/transportation-methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportationMethodDTO)))
            .andExpect(status().isOk());

        // Validate the TransportationMethod in the database
        List<TransportationMethod> transportationMethodList = transportationMethodRepository.findAll();
        assertThat(transportationMethodList).hasSize(databaseSizeBeforeUpdate);
        TransportationMethod testTransportationMethod = transportationMethodList.get(transportationMethodList.size() - 1);
        assertThat(testTransportationMethod.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTransportationMethod.getFixCost()).isEqualTo(UPDATED_FIX_COST);
        assertThat(testTransportationMethod.getPercentCost()).isEqualTo(UPDATED_PERCENT_COST);

        // Validate the TransportationMethod in Elasticsearch
        verify(mockTransportationMethodSearchRepository, times(1)).save(testTransportationMethod);
    }

    @Test
    public void updateNonExistingTransportationMethod() throws Exception {
        int databaseSizeBeforeUpdate = transportationMethodRepository.findAll().size();

        // Create the TransportationMethod
        TransportationMethodDTO transportationMethodDTO = transportationMethodMapper.toDto(transportationMethod);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransportationMethodMockMvc.perform(put("/api/transportation-methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportationMethodDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransportationMethod in the database
        List<TransportationMethod> transportationMethodList = transportationMethodRepository.findAll();
        assertThat(transportationMethodList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TransportationMethod in Elasticsearch
        verify(mockTransportationMethodSearchRepository, times(0)).save(transportationMethod);
    }

    @Test
    public void deleteTransportationMethod() throws Exception {
        // Initialize the database
        transportationMethodRepository.save(transportationMethod);

        int databaseSizeBeforeDelete = transportationMethodRepository.findAll().size();

        // Get the transportationMethod
        restTransportationMethodMockMvc.perform(delete("/api/transportation-methods/{id}", transportationMethod.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransportationMethod> transportationMethodList = transportationMethodRepository.findAll();
        assertThat(transportationMethodList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TransportationMethod in Elasticsearch
        verify(mockTransportationMethodSearchRepository, times(1)).deleteById(transportationMethod.getId());
    }

    @Test
    public void searchTransportationMethod() throws Exception {
        // Initialize the database
        transportationMethodRepository.save(transportationMethod);
        when(mockTransportationMethodSearchRepository.search(queryStringQuery("id:" + transportationMethod.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(transportationMethod), PageRequest.of(0, 1), 1));
        // Search the transportationMethod
        restTransportationMethodMockMvc.perform(get("/api/_search/transportation-methods?query=id:" + transportationMethod.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportationMethod.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].fixCost").value(hasItem(DEFAULT_FIX_COST.doubleValue())))
            .andExpect(jsonPath("$.[*].percentCost").value(hasItem(DEFAULT_PERCENT_COST.doubleValue())));
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportationMethod.class);
        TransportationMethod transportationMethod1 = new TransportationMethod();
        transportationMethod1.setId("id1");
        TransportationMethod transportationMethod2 = new TransportationMethod();
        transportationMethod2.setId(transportationMethod1.getId());
        assertThat(transportationMethod1).isEqualTo(transportationMethod2);
        transportationMethod2.setId("id2");
        assertThat(transportationMethod1).isNotEqualTo(transportationMethod2);
        transportationMethod1.setId(null);
        assertThat(transportationMethod1).isNotEqualTo(transportationMethod2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportationMethodDTO.class);
        TransportationMethodDTO transportationMethodDTO1 = new TransportationMethodDTO();
        transportationMethodDTO1.setId("id1");
        TransportationMethodDTO transportationMethodDTO2 = new TransportationMethodDTO();
        assertThat(transportationMethodDTO1).isNotEqualTo(transportationMethodDTO2);
        transportationMethodDTO2.setId(transportationMethodDTO1.getId());
        assertThat(transportationMethodDTO1).isEqualTo(transportationMethodDTO2);
        transportationMethodDTO2.setId("id2");
        assertThat(transportationMethodDTO1).isNotEqualTo(transportationMethodDTO2);
        transportationMethodDTO1.setId(null);
        assertThat(transportationMethodDTO1).isNotEqualTo(transportationMethodDTO2);
    }
}
