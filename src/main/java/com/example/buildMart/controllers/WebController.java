package com.example.buildMart.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebController {

    @GetMapping("/product")
    public String productPage(@RequestParam String id) {
        return "forward:/pages/product.html";
    }
}
