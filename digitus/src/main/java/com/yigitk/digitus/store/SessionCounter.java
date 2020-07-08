package com.yigitk.digitus.store;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.ArrayList;
import java.util.List;


@WebListener
public class SessionCounter implements HttpSessionListener {

    private List<String> sessions = new ArrayList<>();
    public static final String COUNTER = "session-counter";


    public void sessionCreated(HttpSessionEvent event) {
        System.out.println("SessionCounter.sessionCreated");
        HttpSession session = event.getSession();
        //event.getSession().setMaxInactiveInterval(1);
        sessions.add(session.getId());


        session.setAttribute(SessionCounter.COUNTER, this);
    }


    public void sessionDestroyed(HttpSessionEvent event) {
        System.out.println("SessionCounter.sessionDestroyed");
        HttpSession session = event.getSession();
        //event.getSession().setMaxInactiveInterval(1);
        sessions.remove(session.getId());


        session.setAttribute(SessionCounter.COUNTER, this);
    }

    public int getActiveSessionNumber() {
        return sessions.size();
    }

}
