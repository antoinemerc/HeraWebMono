package com.heraco.hera.config.dbmigrations;

import com.heraco.hera.domain.Authority;
import com.heraco.hera.domain.BasketItem;
import com.heraco.hera.domain.User;
import com.heraco.hera.domain.Product;
import com.heraco.hera.domain.Category;
import com.heraco.hera.domain.Comment;
import com.heraco.hera.security.AuthoritiesConstants;
import com.heraco.hera.domain.Address;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.Instant;
import java.util.ArrayList;

/**
 * Creates the initial database setup
 */
@ChangeLog(order = "001")
public class InitialSetupMigration {

    @ChangeSet(order = "01", author = "initiator", id = "01-addAuthorities")
    public void addAuthorities(MongoTemplate mongoTemplate) {
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        Authority userAuthority = new Authority();
        userAuthority.setName(AuthoritiesConstants.USER);
        mongoTemplate.save(adminAuthority);
        mongoTemplate.save(userAuthority);
    }

    @ChangeSet(order = "02", author = "initiator", id = "02-addUsers")
    public void addUsers(MongoTemplate mongoTemplate) {
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        Authority userAuthority = new Authority();
        userAuthority.setName(AuthoritiesConstants.USER);

        Address add1 = new Address();
        add1.setStreet1("27 Avenue Jeanne d'arc");
        add1.setCountry("France");

        Address add2 = new Address();
        add2.setStreet1("27 Avenue Jeanne d'arc");
        add2.setCountry("France");

        Address add3 = new Address();
        add3.setStreet1("3 rainbow street");
        add3.setCountry("England");

        ArrayList<Address> allAddress1 = new ArrayList<Address>();
        ArrayList<Address> allAddress2 = new ArrayList<Address>();
        ArrayList<Address> allAddress3 = new ArrayList<Address>();

        allAddress1.add(add1);
        allAddress1.add(add2);

        allAddress2.add(add2);
        allAddress2.add(add3);

        allAddress3.add(add1);

        User systemUser = new User();
        systemUser.setId("user-0");
        systemUser.setLogin("system");
        systemUser.setPassword("$2a$10$mE.qmcV0mFU5NcKh73TZx.z4ueI/.bDWbj0T1BYyqP481kGGarKLG");
        systemUser.setFirstName("");
        systemUser.setLastName("System");
        systemUser.setEmail("system@localhost");
        systemUser.setActivated(true);
        systemUser.setLangKey("fr");
        systemUser.setAddress(allAddress1);
        systemUser.setCreatedBy(systemUser.getLogin());
        systemUser.setCreatedDate(Instant.now());
        systemUser.getAuthorities().add(adminAuthority);
        systemUser.getAuthorities().add(userAuthority);
        mongoTemplate.save(systemUser);

        User anonymousUser = new User();
        anonymousUser.setId("user-1");
        anonymousUser.setLogin("anonymoususer");
        anonymousUser.setPassword("$2a$10$j8S5d7Sr7.8VTOYNviDPOeWX8KcYILUVJBsYV83Y5NtECayypx9lO");
        anonymousUser.setFirstName("Anonymous");
        anonymousUser.setLastName("User");
        anonymousUser.setEmail("anonymous@localhost");
        anonymousUser.setActivated(true);
        anonymousUser.setLangKey("fr");
        anonymousUser.setAddress(allAddress2);

        anonymousUser.setCreatedBy(systemUser.getLogin());
        anonymousUser.setCreatedDate(Instant.now());
        mongoTemplate.save(anonymousUser);

        User adminUser = new User();
        adminUser.setId("user-2");
        adminUser.setLogin("admin");
        adminUser.setPassword("$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC");
        adminUser.setFirstName("admin");
        adminUser.setLastName("Administrator");
        adminUser.setEmail("admin@localhost");
        adminUser.setActivated(true);
        adminUser.setLangKey("fr");
        adminUser.setAddress(allAddress3);
        adminUser.setCreatedBy(systemUser.getLogin());
        adminUser.setCreatedDate(Instant.now());
        adminUser.getAuthorities().add(adminAuthority);
        adminUser.getAuthorities().add(userAuthority);
        mongoTemplate.save(adminUser);

        ArrayList<Comment> comments = new ArrayList<>();
        Comment comment = new Comment();
        comment.setTitle("TITLE");
        comment.setBody("BODY");
        comment.setUser(adminUser);
        comments.add(comment);

        Product p = new Product();
        p.setName("TESTDTO");
        p.setDescription("DTOOOOOOOO");
        p.setQuantity(1);
        p.setPrice(10.0);
        p.setUser(adminUser);
        p.setComments(comments);     
        mongoTemplate.save(p);

        ArrayList<BasketItem> basket = new ArrayList<>();
        BasketItem item = new BasketItem();
        item.setQuantity(1);
        item.setProduct(p);
        basket.add(item);

        User userUser = new User();
        userUser.setId("user-3");
        userUser.setLogin("user");
        userUser.setPassword("$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K");
        userUser.setFirstName("");
        userUser.setLastName("User");
        userUser.setEmail("user@localhost");
        userUser.setActivated(true);
        userUser.setLangKey("fr");
        userUser.setAddress(allAddress2);
        userUser.setCreatedBy(systemUser.getLogin());
        userUser.setCreatedDate(Instant.now());
        userUser.getAuthorities().add(userAuthority);
        userUser.setBasket(basket);
        mongoTemplate.save(userUser);
    }
    
    @ChangeSet(order = "03", author = "initiator", id = "03-addCategory")
    public void addCategory(MongoTemplate mongoTemplate) {
       
        Category c1 = new Category();
        c1.setName("LEGUMES");
        mongoTemplate.save(c1);

        Category c2 = new Category();
        c2.setName("ORDINATEUR");
        mongoTemplate.save(c2);
        
    }

    @ChangeSet(order = "04", author = "initiator", id = "03-addProduct")
    public void addProduct(MongoTemplate mongoTemplate) {
       
        Product p = new Product();
        p.setName("Patato");
        p.setDescription("DES BELLES PATATES");
        p.setQuantity(10);   
        p.setPrice(1.);  
        mongoTemplate.save(p);

        Product p2 = new Product();
        p2.setName("ORDI");
        p2.setDescription("GROS ORDI MA GUEULE");
        p2.setQuantity(1);
        p2.setPrice(1000.); 
        mongoTemplate.save(p2);
    }
}
