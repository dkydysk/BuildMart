package com.example.buildMart.repositories.interfaces;

import com.example.buildMart.models.Product;

import java.util.List;

public interface ProductCustomRepository {
    List<Product> findAllByPage(Integer page, Integer size);
    List<Product> findByCategory(String category);
    List<Product> findByParams(Float rating, Float minPrice, Float maxPrice, Integer page, Integer size);
}
