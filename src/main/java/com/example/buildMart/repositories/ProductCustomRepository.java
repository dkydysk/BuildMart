package com.example.buildMart.repositories;

import com.example.buildMart.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductCustomRepository {
    private final MongoTemplate mongoTemplate;
    @Autowired
    public ProductCustomRepository(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }
    public Page<Product> findAllByPage(/*String sort,*/ Integer page, Integer size){
        Query query = new Query();
        Query totalQuery = new Query();
        long total = mongoTemplate.count(totalQuery, Product.class);
        Pageable pageable = PageRequest.of(page, size);
        query.with(pageable);
//        switch (sort) {
//            case "name_asc":
//                query.with(Sort.by(Sort.Direction.ASC, "name"));
//                break;
//            case "name_desc":
//                query.with(Sort.by(Sort.Direction.DESC, "name"));
//                break;
//            case "price_asc":
//                query.with(Sort.by(Sort.Direction.ASC, "price"));
//                break;
//            case "price_desc":
//                query.with(Sort.by(Sort.Direction.DESC, "price"));
//                break;
//            default:
//                break;
//        }
        return new PageImpl<>(mongoTemplate.find(query, Product.class), pageable, total);
    };
    public List<Product> findByCategory(String category){
        Query query = new Query();
        query.addCriteria(Criteria.where("category").is(category));
        return mongoTemplate.find(query, Product.class);
    };
    public Page<Product> findByParams(Float rating, Float minPrice, Float maxPrice, /*String sort,*/ Integer page, Integer size){
        Query query = new Query();
        Query totalQuery = new Query();
        if (rating!=null){
            query.addCriteria(Criteria.where("rating").gte(rating));
            totalQuery.addCriteria(Criteria.where("rating").gte(rating));
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
            totalQuery.addCriteria(priceCriteria);
        }
        long total = mongoTemplate.count(totalQuery, Product.class);
        Pageable pageable = PageRequest.of(page, size);
        query.with(pageable);
//        switch (sort) {
//            case "name_asc":
//                query.with(Sort.by(Sort.Direction.ASC, "name"));
//                break;
//            case "name_desc":
//                query.with(Sort.by(Sort.Direction.DESC, "name"));
//                break;
//            case "price_asc":
//                query.with(Sort.by(Sort.Direction.ASC, "price"));
//                break;
//            case "price_desc":
//                query.with(Sort.by(Sort.Direction.DESC, "price"));
//                break;
//            default:
//                break;
//        }
        return new PageImpl<>(mongoTemplate.find(query, Product.class), pageable, total);
    }
}
