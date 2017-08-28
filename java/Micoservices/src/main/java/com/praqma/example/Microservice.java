package com.praqma.example;

import com.google.gson.Gson;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@SpringBootApplication
public class Microservice {

    private DbAccessor db =new DbAccessor();
    private Gson gson = new Gson();

    @PostMapping("/")
	public String home() {
		return "The system is up and running";
	}

	@PostMapping(value = "/insert",produces = APPLICATION_JSON_VALUE)
    public String insert(@RequestBody WordModel data) {
	    return db.Insert(data);
	}

	@GetMapping(value = "/list")
    public String list() { return gson.toJson(db.List()); }


    @DeleteMapping(value = "/delete",produces = APPLICATION_JSON_VALUE)
    public String delete(@RequestBody WordModel data) {
	    return db.Delete(data);
	}

	@PostMapping(value = "/get",produces = APPLICATION_JSON_VALUE)
    public String get(@RequestBody WordModel data) {
        WordModel dt=db.Get(data);
        if (dt != null) {
            return gson.toJson(dt);
        }
        return "Document "+data.word+" not found";
	}

	public static void main(String[] args) {
		SpringApplication.run(Microservice.class, args);

	}
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }
}