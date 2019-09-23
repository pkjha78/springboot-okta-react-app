package com.spring.boot.oauth.okta.react.app.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
//@Profile("prod")
public class RedirectController {
	
	@GetMapping("/private")
    public String redirectToRoot() {
        return "redirect:http://localhost:3000/"; // In production it should be root return "redirect:/"
    }
}