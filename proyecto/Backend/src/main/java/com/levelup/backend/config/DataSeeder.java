package com.levelup.backend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.levelup.backend.model.Category;
import com.levelup.backend.model.Product;
import com.levelup.backend.repository.CategoryRepository;
import com.levelup.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository, CategoryRepository categoryRepository) {
        return args -> {
            ObjectMapper mapper = new ObjectMapper();

            // 1. CARGA DE PRODUCTOS
            if (productRepository.count() == 0) {
                try {
                    InputStream inputStream = TypeReference.class.getResourceAsStream("/data/products.json");
                    if (inputStream != null) {
                        List<Product> products = mapper.readValue(inputStream, new TypeReference<List<Product>>(){});
                        productRepository.saveAll(products);
                        System.out.println("--- PRODUCTOS cargados: " + products.size() + " ---");
                    } else {
                        System.out.println("--- NO SE ENCONTRO products.json ---");
                    }
                } catch (Exception e) {
                    System.out.println("--- Error cargando productos: " + e.getMessage());
                }
            } else {
                System.out.println("--- Productos ya existen. Omitiendo carga. ---");
            }

            // 2. CARGA DE CATEGORÍAS
            if (categoryRepository.count() == 0) {
                try {
                    InputStream inputStream = TypeReference.class.getResourceAsStream("/data/categories.json");
                    if (inputStream != null) {
                        List<Category> categories = mapper.readValue(inputStream, new TypeReference<List<Category>>(){});
                        categoryRepository.saveAll(categories);
                        System.out.println("--- CATEGORÍAS cargadas: " + categories.size() + " ---");
                    } else {
                        System.out.println("--- NO SE ENCONTRO categories.json ---");
                    }
                } catch (Exception e) {
                    System.out.println("--- Error cargando categorías: " + e.getMessage());
                }
            } else {
                System.out.println("--- Categorías ya existen. Omitiendo carga. ---");
            }
        };
    }
}