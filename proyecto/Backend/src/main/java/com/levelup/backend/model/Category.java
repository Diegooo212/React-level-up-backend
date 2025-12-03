package com.levelup.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "categories")
public class Category {
    @Id
    private String id; 
    private String name;
    private String img;
    private String link;
    private String description;
}