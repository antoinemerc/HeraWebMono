package com.heraco.hera.repository;


import java.util.List;

import com.heraco.hera.domain.Product;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    Page<Product> findAllByCategories(Pageable pageable, String categories);
    Page<Product> findAllByIdIn(Pageable pageable, List<String> id);

}
