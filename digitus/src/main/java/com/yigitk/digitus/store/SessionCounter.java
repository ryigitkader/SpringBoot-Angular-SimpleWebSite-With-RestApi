package com.yigitk.digitus.store;

import lombok.AllArgsConstructor;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@EnableAutoConfiguration
@WebListener
public class SessionCounter implements HttpSessionListener {

    private List<String> sessions = new ArrayList<>();
    public static final String COUNTER = "session-counter";

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        System.out.println("SessionCounter.sessionCreated");
        HttpSession session = event.getSession();
        sessions.add(session.getId());
        //session.setAttribute(SessionCounter.COUNTER, this);



    }


    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        System.out.println("SessionCounter.sessionDestroyed");
        HttpSession session = event.getSession();
        sessions.remove(session.getId());
        //session.setAttribute(SessionCounter.COUNTER, this);

    }

    public int getActiveSessionNumber() {
        return sessions.size();
    }


}
