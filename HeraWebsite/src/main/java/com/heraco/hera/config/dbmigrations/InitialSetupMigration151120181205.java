package com.heraco.hera.config.dbmigrations;

import com.heraco.hera.domain.Authority;
import com.heraco.hera.domain.BasketItem;
import com.heraco.hera.domain.User;
import com.heraco.hera.domain.Product;
import com.heraco.hera.domain.TransportationMethod;
import com.heraco.hera.domain.Category;
import com.heraco.hera.domain.Comments;
import com.heraco.hera.domain.ImageUrl;
import com.heraco.hera.domain.Order;
import com.heraco.hera.security.AuthoritiesConstants;
import com.heraco.hera.domain.Address;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;

/**
 * Creates the initial database setup
 */
@ChangeLog(order = "001")
public class InitialSetupMigration151120181205 {

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
        add1.setZipCode("38000");
        add1.setCity("Grenoble");
        add1.setCountry("France");

        Address add2 = new Address();
        add2.setStreet1("5 rue Jules Flandrin");
        add2.setZipCode("38100");
        add2.setCity("Grenoble");
        add2.setCountry("France");

        Address add3 = new Address();
        add3.setStreet1("3 rainbow street");
        add3.setCity("Glyndwr");
        add3.setZipCode("LLH 12869");
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
        systemUser.setAllAddress(allAddress1);
        systemUser.setCreatedBy(systemUser.getLogin());
        systemUser.setCreatedDate(Instant.now());
        systemUser.getAuthorities().add(adminAuthority);
        systemUser.getAuthorities().add(userAuthority);
        systemUser.setBasket(new ArrayList<BasketItem>());
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
        anonymousUser.setAllAddress(allAddress2);
        anonymousUser.setCreatedBy(systemUser.getLogin());
        anonymousUser.setCreatedDate(Instant.now());
        anonymousUser.setBasket(new ArrayList<BasketItem>());
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
        adminUser.setAllAddress(allAddress3);
        adminUser.setCreatedBy(systemUser.getLogin());
        adminUser.setCreatedDate(Instant.now());
        adminUser.getAuthorities().add(adminAuthority);
        adminUser.getAuthorities().add(userAuthority);
        adminUser.setBasket(new ArrayList<BasketItem>());
        mongoTemplate.save(adminUser);

        User userUser = new User();
        userUser.setId("user-3");
        userUser.setLogin("user");
        userUser.setPassword("$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K");
        userUser.setFirstName("");
        userUser.setLastName("User");
        userUser.setEmail("user@localhost");
        userUser.setActivated(true);
        userUser.setLangKey("fr");
        userUser.setAllAddress(allAddress2);
        userUser.setCreatedBy(systemUser.getLogin());
        userUser.setCreatedDate(Instant.now());
        userUser.getAuthorities().add(userAuthority);
        userUser.setBasket(new ArrayList<BasketItem>());
        mongoTemplate.save(userUser);
    }

    @ChangeSet(order = "03", author = "initiator", id = "03-addCategory")
    public void addCategory(MongoTemplate mongoTemplate) {

        Category c1 = new Category();
        c1.setName("Ordinateur Portable");
        mongoTemplate.save(c1);

        Category c2 = new Category();
        c2.setName("Carte Graphique");
        mongoTemplate.save(c2);

    }

    @ChangeSet(order = "04", author = "initiator", id = "04-addProduct")
    public void addProduct(MongoTemplate mongoTemplate) {

        User adminUser = mongoTemplate.findById("user-2", User.class);

        Query query1 = new Query();
        query1.addCriteria(Criteria.where("name").is("Carte Graphique"));
        Query query2 = new Query();
        query2.addCriteria(Criteria.where("name").is("Ordinateur Portable"));

        Category category1 = mongoTemplate.findOne(query1, Category.class);
        Category category2 = mongoTemplate.findOne(query2, Category.class);

        ArrayList<Category> allCategories1 = new ArrayList<>();
        ArrayList<Category> allCategories2 = new ArrayList<>();
        ArrayList<Category> allCategories3 = new ArrayList<>();

        allCategories1.add(category1);
        allCategories2.add(category2);

        ArrayList<Comments> comments1 = new ArrayList<>();
        ArrayList<Comments> comments2 = new ArrayList<>();
        ArrayList<Comments> comments3 = new ArrayList<>();
        ArrayList<Comments> comments4 = new ArrayList<>();

        String date = "10-05-2018;22:14:54";

        Comments comment1 = new Comments();
        comment1.setTitle("This is the best Graphic Card I ever bougth");
        comment1.setBody(
                "J'ai acheté cette carte pour remplacer l'ancienne carte video du PC de mon fils que j'ai monté moi-même il y a trois ans avec un Core i5 et une carte mère Asus. Alors qu'avant il \"plafonnait\" à 40 fps ou même 25 dans certains nouveaux jeux gourmands, il est passé largement au delà des 100 fps. Cette carte est puissante même si un peu chère.");
        comment1.setNote(5);
        comment1.setDate(date);
        comment1.setUser(adminUser);

        Comments comment2 = new Comments();
        comment2.setTitle("Ne marche plus au bout de 5 mois");
        comment2.setBody(
                "ça allait plutôt bien les premiers mois.Maintenant j'ai un écran noir a chaque fois que je lance un jeu. Bien sûr le support MSI met des plombs à répondre..        à éviter");
        comment2.setNote(1);
        comment2.setDate(date);
        comment2.setUser(adminUser);

        Comments comment3 = new Comments();
        comment3.setTitle("Très bonne carte");
        comment3.setBody(
                "Très content de cette carte ! Prepar3d est fluide avec un niveau détails élevé et à la résolution maximale de mon écran 22p.");
        comment3.setNote(5);
        comment3.setDate(date);
        comment3.setUser(adminUser);

        Comments comment4 = new Comments();
        comment4.setTitle("Pas de suremballage");
        comment4.setBody(
                "Pas de problème au niveau de la carte graphique.        Mais aucune protection par suremballage, une déception, surtout pour un produit vendu par amazon.");
        comment4.setNote(3);
        comment4.setDate(date);
        comment4.setUser(adminUser);

        comments1.add(comment1);
        comments1.add(comment2);
        comments2.add(comment2);
        comments2.add(comment4);
        comments3.add(comment2);
        comments3.add(comment4);
        comments3.add(comment3);
        comments4.add(comment3);

        ArrayList<ImageUrl> images = new ArrayList<ImageUrl>();
        ImageUrl imagesDefault = new ImageUrl("content/images/placeHolder.png", "Placeholder picture");
        ArrayList<ImageUrl> allImageDefaultUrl = new ArrayList<ImageUrl>();
        allImageDefaultUrl.add(imagesDefault);

        Product p2 = new Product();
        p2.setName("GTX 1080");
        p2.setDescription("The best graphics card of it's time");
        p2.setQuantity(200);
        p2.setPrice(560.00);
        p2.setComments(comments1);
        images.clear();
        images.add(new ImageUrl("gtx1080.jpg", "A GTX 1080 picture"));
        images.add(new ImageUrl("gtx1070.jpg", "A GTX 1070 picture"));
        p2.setAllImageUrl(images);
        p2.setUser(adminUser);
        p2.setCategories(allCategories1);
        mongoTemplate.save(p2);

        Product p3 = new Product();
        p3.setName("GTX 1070");
        p3.setDescription("The best price/quality ration");
        p3.setQuantity(15);
        p3.setPrice(350.00);
        p3.setComments(comments2);
        images.clear();
        images.add(new ImageUrl("gtx1070.jpg", "A GTX 1070 picture"));
        p3.setAllImageUrl(images);
        p3.setUser(adminUser);
        p3.setCategories(allCategories1);
        mongoTemplate.save(p3);

        Product p4 = new Product();
        p4.setName("GTX 1060");
        p4.setDescription("Same as 1050 but better");
        p4.setQuantity(44);
        p4.setPrice(280.00);
        p4.setComments(comments3);
        images.clear();
        images.add(new ImageUrl("gtx1060.jpg", "A GTX 1060 picture"));
        p4.setAllImageUrl(images);
        p4.setUser(adminUser);
        p4.setCategories(allCategories1);
        mongoTemplate.save(p4);

        Product p5 = new Product();
        p5.setName("GTX 1050");
        p5.setDescription("The cheapest one");
        p5.setQuantity(5);
        p5.setPrice(150.00);
        p5.setComments(new ArrayList<Comments>());
        images.clear();
        images.add(new ImageUrl("gtx1050.jpg", "A GTX 1050 picture"));
        p5.setAllImageUrl(images);
        p5.setUser(adminUser);
        p5.setCategories(allCategories1);
        mongoTemplate.save(p5);

        Product p7 = new Product();
        p7.setName("GTX 980");
        p7.setDescription("An older model but with a good performance/price ration for it's time");
        p7.setQuantity(1);
        p7.setPrice(500.00);
        p7.setComments(comments4);
        p7.setUser(adminUser);
        p7.setCategories(allCategories1);
        mongoTemplate.save(p7);

        Product p8 = new Product();
        p8.setName("Radeon RX 460");
        p8.setDescription("An old player");
        p8.setQuantity(4);
        p8.setPrice(150.00);
        p8.setComments(comments4);
        images.clear();
        images.add(new ImageUrl("radeonRx460.png", "A Radeon RX 460 picture"));
        p8.setAllImageUrl(images);
        p8.setUser(adminUser);
        p8.setCategories(allCategories1);
        mongoTemplate.save(p8);

        Product p6 = new Product();
        p6.setName("RADEON RX Vega 56");
        p6.setDescription("The middle ground card");
        p6.setQuantity(50);
        p6.setPrice(650.00);
        p6.setComments(new ArrayList<Comments>());
        images.clear();
        images.add(new ImageUrl("vega56.jpg", "A Vega 56 picture"));
        p6.setAllImageUrl(images);
        p6.setUser(adminUser);
        p6.setCategories(allCategories1);
        mongoTemplate.save(p6);

        Product p9 = new Product();
        p9.setName("RADEON RX Vega 64");
        p9.setDescription("High end card for AMD");
        p9.setQuantity(150);
        p9.setPrice(450.00);
        p9.setComments(new ArrayList<Comments>());
        images.clear();
        images.add(new ImageUrl("vega64.jpg", "A Vega 64 picture"));
        p9.setAllImageUrl(images);
        p9.setUser(adminUser);
        p9.setCategories(allCategories1);
        mongoTemplate.save(p9);

        Product p10 = new Product();
        p10.setName("Surface 2 Laptop");
        p10.setDescription("The most versatile workstation of the industry");
        p10.setQuantity(50);
        p10.setPrice(1250.00);
        p10.setComments(comments1);
        images.clear();
        images.add(new ImageUrl("surface2.jpg", "A Surface 2 picture"));
        p10.setAllImageUrl(images);
        p10.setUser(adminUser);
        p10.setCategories(allCategories2);
        mongoTemplate.save(p10);

        Product p11 = new Product();
        p11.setName("LG Gram");
        p11.setDescription("Thinnest and lightest laptop ever conceived");
        p11.setQuantity(50);
        p11.setPrice(950.00);
        p11.setComments(comments2);
        images.clear();
        images.add(new ImageUrl("lgGram.jpg", "An LG Gram picture"));
        p11.setAllImageUrl(images);
        p11.setUser(adminUser);
        p11.setCategories(allCategories2);
        mongoTemplate.save(p11);

        Product p12 = new Product();
        p12.setName("Macbook Air 2018");
        p12.setDescription("The iconic ultrabook return");
        p12.setQuantity(10);
        p12.setPrice(10000.00);
        p12.setComments(comments3);
        images.clear();
        images.add(new ImageUrl("macbook2018.jpg", "A Macbook 2018 picture"));
        p12.setAllImageUrl(images);
        p12.setUser(adminUser);
        p12.setCategories(allCategories2);

        mongoTemplate.save(p12);

        Product p13 = new Product();
        p13.setName("Lenovo Legion Y520");
        p13.setDescription("Only the best for a gamer");
        p13.setQuantity(10);
        p13.setPrice(1000.00);
        p13.setComments(new ArrayList<Comments>());
        images.clear();
        images.add(new ImageUrl("lenovoLegion.jpg", "A Lenovo Legion picture"));
        p13.setAllImageUrl(images);
        p13.setUser(adminUser);
        p13.setCategories(allCategories2);
        mongoTemplate.save(p13);

        Product p14 = new Product();
        p14.setName("Alienware 15 R4");
        p14.setDescription("The heavyweigth for a no compromise product");
        p14.setQuantity(15);
        p14.setPrice(2000.00);
        p14.setComments(new ArrayList<Comments>());
        images.clear();
        images.add(new ImageUrl("Alienware15R4.jpg", "An Alienware 15 R4 picture"));
        p14.setAllImageUrl(images);
        p14.setUser(adminUser);
        p14.setCategories(allCategories2);
        mongoTemplate.save(p14);

        Product p15 = new Product();
        p15.setName("Razer Blade 15");
        p15.setDescription("The stealtiest laptop for gamers");
        p15.setQuantity(15);
        p15.setPrice(2500.00);
        p15.setComments(new ArrayList<Comments>());
        images.clear();
        images.add(new ImageUrl("razerBlade15.jpg", "A Razer Blade picture"));
        p15.setAllImageUrl(images);
        p15.setUser(adminUser);
        p15.setCategories(allCategories2);
        mongoTemplate.save(p15);

        Product p16 = new Product();
        p16.setName("GIGABYTE Aero 15X");
        p16.setDescription("High end gaming performance in a cool form factor");
        p16.setQuantity(27);
        p16.setPrice(2700.00);
        p16.setComments(comments3);
        images.clear();
        images.add(new ImageUrl("GIGABYTEAero15X.jpg", "An GIGABYTE Aero 15X picture"));
        p16.setAllImageUrl(images);
        p16.setUser(adminUser);
        p16.setCategories(allCategories2);
        mongoTemplate.save(p16);

        Product p17 = new Product();
        p17.setName("OMEN 15");
        p17.setDescription("Affordable yet powerfull gaming");
        p17.setQuantity(56);
        p17.setPrice(800.00);
        p17.setComments(comments1);
        images.clear();
        images.add(new ImageUrl("omen15.jpg", "An Omen 15 picture"));
        p17.setAllImageUrl(images);
        p17.setUser(adminUser);
        p17.setCategories(allCategories2);
        mongoTemplate.save(p17);

        Product p18 = new Product();
        p18.setName("Asus ROG FX553VD");
        p18.setDescription("The refernce for a quality experience");
        p18.setQuantity(44);
        p18.setPrice(850.00);
        p18.setComments(comments2);
        images.clear();
        images.add(new ImageUrl("AsusROGFX553VD.jpg", "An Asus ROG FX553VD picture"));
        p18.setAllImageUrl(images);
        p18.setUser(adminUser);
        p18.setCategories(allCategories2);
        mongoTemplate.save(p18);
    }

    @ChangeSet(order = "05", author = "initiator", id = "05-addTransportationMethod")
    public void addTransportationMethod(MongoTemplate mongoTemplate) {
        TransportationMethod t1 = new TransportationMethod();
        t1.setName("Colis");
        t1.setFixCost(0.);
        t1.setPercentCost(0.);
        mongoTemplate.save(t1);

        TransportationMethod t2 = new TransportationMethod();
        t2.setName("Transporteur Hera");
        t2.setFixCost(10.);
        t2.setPercentCost(0.);
        mongoTemplate.save(t2);

    }

    @ChangeSet(order = "06", author = "initiator", id = "06-addOrder")
    public void addOrder(MongoTemplate mongoTemplate) {
        Order o1 = new Order();

        User adminUser = mongoTemplate.findById("user-2", User.class);
        o1.setUser(adminUser);
        Query query1 = new Query();
        query1.addCriteria(Criteria.where("name").is("Colis"));
        TransportationMethod t = mongoTemplate.findOne(query1, TransportationMethod.class);

        Query query2 = new Query();
        query2.addCriteria(Criteria.where("name").is("GTX 1080"));
        Product p = mongoTemplate.findOne(query2, Product.class);
        int q1 = 1;

        Query query3 = new Query();
        query3.addCriteria(Criteria.where("name").is("GTX 1070"));
        Product p2 = mongoTemplate.findOne(query3, Product.class);
        int q2 = 10;

        ArrayList<BasketItem> cart = new ArrayList<>();
        BasketItem item = new BasketItem();
        item.setProd(p.getId());
        item.setQuantity(q1);
        cart.add(item);

        BasketItem item2 = new BasketItem();
        item2.setProd(p2.getId());
        item2.setQuantity(q2);
        cart.add(item2);

        o1.setOrderLine(cart);
        o1.setAddress(adminUser.getAllAddress().get(0));
        o1.setTransportationMethod(t);
        o1.setPaymentMethod("Paypal");
        o1.setDate("2018-12-03");
        o1.setState("Transit");
        o1.setTotalPrice(p.getPrice() * q1 + p2.getPrice() * q2);

        mongoTemplate.save(o1);

    }
}
