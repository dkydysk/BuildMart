package com.example.buildMart.services;

import com.example.buildMart.models.Product;
import com.example.buildMart.repositories.interfaces.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    @Autowired
    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }
    public List<Product> findAllByPage(Integer page, Integer size){
        return productRepository.findAllByPage(page, size);
    }
    public Optional<Product> findById(String id){
        return  productRepository.findById(id);
    }
    public List<Product> findByCategory(String category){
        return productRepository.findByCategory(category);
    }
    public List<Product> findByParams(Float rating, Float minPrice, Float maxPrice, Integer page, Integer size){
        return productRepository.findByParams(rating, minPrice, maxPrice, page, size);
    }
}
