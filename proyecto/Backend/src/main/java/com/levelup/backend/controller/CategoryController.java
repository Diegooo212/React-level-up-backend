package com.levelup.backend.controller;

import com.levelup.backend.model.Category;
import com.levelup.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    // Obtener todas las categorías
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Obtener una categoría por ID
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable String id) {
        return categoryRepository.findById(id).orElse(null);
    }

    // Crear una nueva categoría
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    // Actualizar una categoría
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable String id, @RequestBody Category categoryDetails) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setName(categoryDetails.getName());
            category.setImg(categoryDetails.getImg());
            category.setLink(categoryDetails.getLink());
            category.setDescription(categoryDetails.getDescription());
            return categoryRepository.save(category);
        }
        return null;
    }

    // Eliminar una categoría
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable String id) {
        categoryRepository.deleteById(id);
    }
}