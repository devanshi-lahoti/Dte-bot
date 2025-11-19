package com.chat.controller;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import com.chat.config.JWTUtils;
import com.chat.entity.ChatHistory;
import com.chat.entity.User;
import com.chat.repository.UserRepository;
import com.chat.service.ChatService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Value("${gemini.api.key}")
    private String GEMINI_API_KEY;
    
    @Value("${gemini.api.url}")
    private String GEMINI_URL;

    @PostMapping
    public Map<String, String> chatWithBot(
            @RequestBody Map<String, String> payload,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) throws IOException {

        String question = payload.get("message");
        if (question == null || question.trim().isEmpty()) {
            throw new RuntimeException("Message cannot be empty");
        }

        // Call Gemini API
        OkHttpClient client = new OkHttpClient();
        String fullUrl = GEMINI_URL + "?key=" + GEMINI_API_KEY;

        JSONObject jsonBody = new JSONObject();
        jsonBody.put("contents", new org.json.JSONArray()
                .put(new JSONObject()
                        .put("parts", new org.json.JSONArray()
                                .put(new JSONObject().put("text", question)))));

        okhttp3.RequestBody body = okhttp3.RequestBody.create(
                jsonBody.toString(),
                MediaType.get("application/json")
        );

        Request geminiRequest = new Request.Builder()
                .url(fullUrl)
                .addHeader("Content-Type", "application/json")
                .addHeader("x-goog-api-key", GEMINI_API_KEY)
                .post(body)
                .build();

        Response response = client.newCall(geminiRequest).execute();
        if (!response.isSuccessful()) {
            throw new IOException("Unexpected code " + response + " | " + response.body().string());
        }

        String responseBody = response.body().string();
        JSONObject jsonResponse = new JSONObject(responseBody);
        String answer = jsonResponse
                .getJSONArray("candidates")
                .getJSONObject(0)
                .getJSONObject("content")
                .getJSONArray("parts")
                .getJSONObject(0)
                .getString("text");

        // Save chat only if user is logged in
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            String email = jwtUtils.extractUsername(jwt);
            User user = userRepository.findByEmail(email);
            if (user != null) {
                ChatHistory chat = new ChatHistory();
                chat.setQuestion(question);
                chat.setAnswer(answer);
                chat.setUser(user);
                chatService.saveChat(chat);
            }
        }

        // Return chat for both guest & user
        Map<String, String> res = new HashMap<>();
        res.put("reply", answer);
        return res;
    }


    @GetMapping("/history/{userId}")
    public List<ChatHistory> getChatHistory(@PathVariable Long userId) {
        return chatService.getChatsByUser(userId);
    }
}

