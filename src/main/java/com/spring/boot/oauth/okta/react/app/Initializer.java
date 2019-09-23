package com.spring.boot.oauth.okta.react.app;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.spring.boot.oauth.okta.react.app.model.Event;
import com.spring.boot.oauth.okta.react.app.model.Group;
import com.spring.boot.oauth.okta.react.app.repository.GroupRepository;

@Component
class Initializer implements CommandLineRunner {

    private final GroupRepository repository;

    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Denver Tour", "Utah JUG", "Seattle Tour",
                "Richmond Tour").forEach(name ->
                repository.save(new Group(name))
        );

        Group djug = repository.findByName("Denver Tour");
        Event e = Event.builder().title("Full Stack Reactive")
                .description("Reactive with Spring Boot + React + Okta oAuth2")
                .date(Instant.parse("2019-09-19T11:38:08Z"))
                .build();
        djug.setEvents(Collections.singleton(e));
        repository.save(djug);

        repository.findAll().forEach(System.out::println);
    }
}