package com.heraco.hera.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.heraco.hera.domain.BasketItem;
import com.heraco.hera.domain.User;
import com.heraco.hera.security.SecurityUtils;
import com.heraco.hera.service.OrderService;
import com.heraco.hera.service.ProductService;
import com.heraco.hera.service.UserService;
import com.heraco.hera.web.rest.errors.BadRequestAlertException;
import com.heraco.hera.web.rest.util.HeaderUtil;
import com.heraco.hera.web.rest.util.PaginationUtil;
import com.heraco.hera.service.dto.OrderDTO;
import com.heraco.hera.service.dto.ProductDTO;
import com.heraco.hera.service.dto.UserDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Product.
 */
@RestController
@RequestMapping("/api")
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private static final String ENTITY_NAME = "product";

    private final ProductService productService;

    private OrderService orderService;

    private UserService userService;

    private Object lock = new Object();

    public ProductResource(ProductService productService, OrderService orderService, UserService userService) {
        this.productService = productService;
        this.orderService = orderService;
        this.userService = userService;
    }

    /**
     * POST /products : Create a new product.
     *
     * @param productDTO the productDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         productDTO, or with status 400 (Bad Request) if the product has
     *         already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/products")
    @Timed
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO)
            throws URISyntaxException {
        log.debug("REST request to save Product : {}", productDTO);
        if (productDTO.getId() != null) {
            throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductDTO result = productService.save(productDTO);
        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT /products : Updates an existing product.
     *
     * @param productDTO the productDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         productDTO, or with status 400 (Bad Request) if the productDTO is not
     *         valid, or with status 500 (Internal Server Error) if the productDTO
     *         couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/products")
    @Timed
    public ResponseEntity<ProductDTO> updateProduct(@Valid @RequestBody ProductDTO productDTO)
            throws URISyntaxException {
        log.debug("REST request to update Product : {}", productDTO);
        if (productDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductDTO result = productService.save(productDTO);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productDTO.getId().toString())).body(result);
    }

    /**
     * GET /products : get all the products.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of products in
     *         body
     */
    @GetMapping("/products")
    @Timed
    public ResponseEntity<List<ProductDTO>> getAllProducts(Pageable pageable) {
        log.debug("REST request to get a page of Products");
        Page<ProductDTO> page = productService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /products/:id : get the "id" product.
     *
     * @param id the id of the productDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productDTO,
     *         or with status 404 (Not Found)
     */
    @GetMapping("/products/{id}")
    @Timed
    public ResponseEntity<ProductDTO> getProduct(@PathVariable String id) {
        log.debug("REST request to get Product : {}", id);
        Optional<ProductDTO> productDTO = productService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productDTO);
    }

    /**
     * DELETE /products/:id : delete the "id" product.
     *
     * @param id the id of the productDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/products/{id}")
    @Timed
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        log.debug("REST request to delete Product : {}", id);
        productService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * SEARCH /_search/products?query=:query : search for the product corresponding
     * to the query.
     *
     * @param query    the query of the product search
     * @param pageable the pagination information
     * @return the result of the search
     *//*
        * @GetMapping("/_search/products")
        * 
        * @Timed public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam
        * String query, Pageable pageable) {
        * log.debug("REST request to search for a page of Products for query {}",
        * query); Page<ProductDTO> page = productService.search(query, pageable);
        * HttpHeaders headers =
        * PaginationUtil.generateSearchPaginationHttpHeaders(query, page,
        * "/api/_search/products"); return new ResponseEntity<>(page.getContent(),
        * headers, HttpStatus.OK); }
        */

    /**
     * SEARCH /_search/products?query=:query : search for the product corresponding
     * to the query.
     *
     * @param query    the query of the product search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/products/category/{categories}")
    @Timed
    public ResponseEntity<List<ProductDTO>> getProductsByCategories(@PathVariable String categories,
            Pageable pageable) {
        log.debug("REST request to search for a page of Products for query {}", categories);
        Page<ProductDTO> page = productService.findCategory(categories, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * SEARCH /products/search/{name} : search for the product corresponding to the
     * name.
     *
     * @param query    the query of the product search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/products/search/{name}")
    @Timed
    public ResponseEntity<List<ProductDTO>> getProductsByNameIgnoreCaseContaining(@PathVariable String name,
            Pageable pageable) {
        log.debug("REST request to search for a page of Products for query {}", name);
        Page<ProductDTO> page = productService.findByNameIgnoreCaseContaining(name, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * POST /products/basket : get all the products present in the connected user
     * basket. .
     *
     * @param userDTO  the userDTO from which we want to extract the informations
     *                 about products in the basket
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of products in
     *         body
     */
    @PostMapping("/products/basket")
    @Timed
    public ResponseEntity<List<ProductDTO>> getProductsFromBasket(@Valid @RequestBody List<BasketItem> basket,
            Pageable pageable) {
        System.out.println("REST request to get products present in current user basket");
        return new ResponseEntity<>(getProductsFromBasketAsArray(basket), HttpStatus.OK);
    }

    private List<ProductDTO> getProductsFromBasketAsArray(List<BasketItem> basket) {
        ArrayList<String> ids = new ArrayList<>();
        List<ProductDTO> ret = new ArrayList<>();
        for (int i = 0; i < basket.size(); i++) {
            ids.add(basket.get(i).getProd());
            ret.add(productService.findOne(basket.get(i).getProd()).get());
        }
        return ret;
    }

    /**
     * POST /products/updateByOrder : Update the quantity available for all product
     * in basket
     *
     * @param cart the cart containing the items to update.
     * @return the ResponseEntity with status 200 (OK)
     */
    @PostMapping("/products/updateByOrder")
    @Timed
    public ResponseEntity<OrderDTO> updateByOrder(@Valid @RequestBody OrderDTO order) {
        System.out.println("REST request to update products in database after payment");
        List<BasketItem> cart = order.getOrderLine();
        boolean allProductsAvailable = true;
        ArrayList<ProductDTO> productUpdated = new ArrayList<>();
        ResponseEntity<OrderDTO> ret = new ResponseEntity<>(HttpStatus.OK);
        synchronized (lock) {
            List<ProductDTO> originalProducts = getProductsFromBasketAsArray(cart);
            for (int i = 0; i < cart.size() && allProductsAvailable; i++) {
                ProductDTO prod = originalProducts.get(i);
                if (prod.getQuantity() < cart.get(i).getQuantity()) {
                    allProductsAvailable = false;
                    ret = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                } else {
                    prod.setQuantity(prod.getQuantity() - cart.get(i).getQuantity());
                    productUpdated.add(prod);
                }
            }
            if (allProductsAvailable) {
                for (ProductDTO p : productUpdated) {
                    productService.save(p);
                }
                ret = new ResponseEntity<>(this.orderService.save(order), HttpStatus.OK);
                User user = userService.getUserWithAuthorities().get();
                user.setBasket(new ArrayList<>());
                userService.updateUser(new UserDTO(user));
            }
        }
        return ret;
    }

}
