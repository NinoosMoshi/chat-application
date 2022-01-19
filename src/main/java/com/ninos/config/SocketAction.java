package com.ninos.config;

import com.ninos.model.ChatMessage;
import com.ninos.model.ChatType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class SocketAction {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event){
        System.out.println("Hi Iam connected");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String userName = (String) headerAccessor.getSessionAttributes().get("username");
        if (userName != null){
            System.out.println("Hi Iam NOT connected" + userName);
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setChatType(ChatType.OFFLINE);
            chatMessage.setSender(userName);
            messagingTemplate.convertAndSend("/topic/all",chatMessage);
        }
    }




}
