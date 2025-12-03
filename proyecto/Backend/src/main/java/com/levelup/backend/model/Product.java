package com.levelup.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data 
@Document(collection = "products") 
public class Product {

    @Id 
    private String id;

    private String name;
    private String description;
    private String brand;
    private String category;
    private Double price;
    private Double discountPrice;
    private Boolean onSale;
    private Integer stock;
    private String img;

}