package com.example.buildMart.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String category;
    private List<String> images;
    private Float rating;
    private Float price;
    private Float discount;
    private String description;
    private Map<String,String> technicalSpecifications;
    private List<Integer> relatedProducts;

    public Product() {}

    public Product(String id, String name, String category, List<String> images, Float rating, Float price, Float discount, String description, Map<String, String> technicalSpecifications, List<Integer> relatedProducts) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.images = images;
        this.rating = rating;
        this.price = price;
        this.discount = discount;
        this.description = description;
        this.technicalSpecifications = technicalSpecifications;
        this.relatedProducts = relatedProducts;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategories(String category) {
        this.category = category;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getDiscount() {
        return discount;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Map<String, String> getTechnicalSpecifications() {
        return technicalSpecifications;
    }

    public void setTechnicalSpecifications(Map<String, String> technicalSpecifications) {
        this.technicalSpecifications = technicalSpecifications;
    }

    public List<Integer> getRelatedProducts() {
        return relatedProducts;
    }

    public void setRelatedProducts(List<Integer> relatedProducts) {
        this.relatedProducts = relatedProducts;
    }
}
