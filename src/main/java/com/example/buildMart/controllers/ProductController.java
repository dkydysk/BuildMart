package com.example.buildMart.controllers;

import com.example.buildMart.models.Product;
import com.example.buildMart.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/")
    public List<Product> findAllByPage(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size){
        return productService.findAllByPage(page, size);
    }

    @GetMapping("/id/{id}")
    public Optional<Product> findById(@PathVariable String id){
        return  productService.findById(id);
    }

    @GetMapping("/category/{category}")
    public List<Product> findByCategory(@PathVariable String category){
        return productService.findByCategory(category);
    }

    @GetMapping("/params")
    public List<Product> findByParams(@RequestParam(required = false) Float rating, @RequestParam Float minPrice, @RequestParam Float maxPrice, @RequestParam Integer page, @RequestParam Integer size){
        return productService.findByParams(rating ,minPrice, maxPrice, page, size);
    }
}
