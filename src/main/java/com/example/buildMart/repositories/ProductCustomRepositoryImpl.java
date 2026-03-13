package com.example.buildMart.repositories;

import com.example.buildMart.models.Product;
import com.example.buildMart.repositories.interfaces.ProductCustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

public class ProductCustomRepositoryImpl implements ProductCustomRepository {
    private final MongoTemplate mongoTemplate;
    @Autowired
    public ProductCustomRepositoryImpl(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }
    @Override
    public List<Product> findAllByPage(Integer page, Integer size){
        Query query = new Query();
        if(page!=null && size!=null) {
            Pageable pageable = PageRequest.of(page, size);
            query.with(pageable);
        }
        return mongoTemplate.find(query, Product.class);
    };
    @Override
    public List<Product> findByCategory(String category){
        Query query = new Query();
        query.addCriteria(Criteria.where("category").is(category));
        return mongoTemplate.find(query, Product.class);
    };
    @Override
    public List<Product> findByParams(Float rating, Float minPrice, Float maxPrice, Integer page, Integer size){
        Query query = new Query();
        if(page!=null && size!=null){
            Pageable pageable = PageRequest.of(page, size);
            query.with(pageable);
        }
        if (rating!=null){
            query.addCriteria(Criteria.where("rating").gte(rating));
        }
        if(minPrice!=null || maxPrice!=null) {
            Criteria priceCriteria = Criteria.where("price");
            if(minPrice!=null){
                priceCriteria.gte(minPrice);
            }
            if(maxPrice!=null){
                priceCriteria.lte(maxPrice);
            }
            query.addCriteria(priceCriteria);
        }
        return mongoTemplate.find(query, Product.class);
    }
}
