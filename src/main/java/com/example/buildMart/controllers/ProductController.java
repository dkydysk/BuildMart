package com.example.buildMart.controllers;

import com.example.buildMart.models.Product;
import com.example.buildMart.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public Page<Product> findAllByPage(/*@RequestParam String sort,*/ @RequestParam Integer page, @RequestParam Integer size){
        return productService.findAllByPage(/*sort,*/ page, size);
    }

    @GetMapping("/id/{id}")
    public Optional<Product> findById(@PathVariable String id){
        return  productService.findById(id);
    }

    @GetMapping("/category/{category}")
    public List<Product> findAllByCategory(@PathVariable String category){
        return productService.findAllByCategory(category);
    }

    @GetMapping("/params")
    public Page<Product> findAllByParams(@RequestParam(required = false) Float rating, @RequestParam Float minPrice, @RequestParam Float maxPrice, /*@RequestParam String sort,*/ @RequestParam Integer page, @RequestParam Integer size){
        return productService.findAllByParams(rating, minPrice, maxPrice, /*sort,*/ page, size);
    }
}
