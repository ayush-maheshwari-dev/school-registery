package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping("/")
    public String root() {
        System.out.println("Root accessed - returning home view");
        return "home";
    }

    @RequestMapping("/home")
    public String home() {
       // System.out.println("Home accessed - returning home view");
        return "home";
    }

    @RequestMapping("/contact")
    public String contact() {
        // System.out.println("Home accessed - returning home view");
        return "contact";
    }
}