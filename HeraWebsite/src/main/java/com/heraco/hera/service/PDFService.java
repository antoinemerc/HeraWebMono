package com.heraco.hera.service;

import com.heraco.hera.service.ProductService;
import com.heraco.hera.service.dto.OrderDTO;
import com.heraco.hera.service.dto.ProductDTO;

import io.github.jhipster.config.JHipsterProperties;

import java.util.Locale;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

/**
 * Service for sending emails.
 * <p>
 * We use the @Async annotation to send emails asynchronously.
 */
@Service
public class PDFService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    private static final String BASE_URL = "baseUrl";

    private final JHipsterProperties jHipsterProperties;

    private final SpringTemplateEngine templateEngine;

    private ProductService productService;

    public PDFService(JHipsterProperties jHipsterProperties, SpringTemplateEngine templateEngine, ProductService p) {

        this.jHipsterProperties = jHipsterProperties;
        this.templateEngine = templateEngine;
        this.productService = p;
    }

    public byte[] generatePDF(OrderDTO order) {

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        String templateName = "mail/orderCreated";
        Locale locale = Locale.forLanguageTag(order.getUser().getLangKey());
        Context context = new Context(locale);
        context.setVariable("order", order);
        context.setVariable("products", buildProductList(order));
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        try {
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document, baos);
            document.open();
            InputStream is = new ByteArrayInputStream(content.getBytes());
            XMLWorkerHelper.getInstance().parseXHtml(writer, document, is);
            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return baos.toByteArray();
    }

    public List<ProductDTO> buildProductList(OrderDTO order) {
        ArrayList<String> ids = new ArrayList<>();
        for (int i = 0; i < order.getOrderLine().size(); i++) {
            ids.add(order.getOrderLine().get(i).getProd());
        }
        return productService.findByBasket(ids, null).getContent();
    }
}
