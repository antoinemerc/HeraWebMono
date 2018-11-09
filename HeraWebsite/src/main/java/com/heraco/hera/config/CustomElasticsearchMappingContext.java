package com.heraco.hera.config;

import org.springframework.data.elasticsearch.core.mapping.ElasticsearchPersistentProperty;
import org.springframework.data.elasticsearch.core.mapping.SimpleElasticsearchMappingContext;
import org.springframework.data.elasticsearch.core.mapping.SimpleElasticsearchPersistentEntity;
import org.springframework.data.mapping.model.Property;
import org.springframework.data.mapping.model.SimpleTypeHolder;
import com.heraco.hera.config.config.CustomElasticsearchPersistentProperty;


public class CustomElasticsearchMappingContext extends SimpleElasticsearchMappingContext {
    @Override
    protected ElasticsearchPersistentProperty createPersistentProperty(Property property,
            SimpleElasticsearchPersistentEntity owner, SimpleTypeHolder simpleTypeHolder) {
        return new CustomElasticsearchPersistentProperty(property, owner, simpleTypeHolder);
    }
}