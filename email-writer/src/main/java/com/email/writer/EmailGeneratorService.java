package com.email.writer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    private final String apiKey;

    public EmailGeneratorService(WebClient webClient,
                                 @Value("${gemini.api.key}") String geminiApikey) {
        this.webClient = webClient;
        this.apiKey = geminiApikey;
    }

    public Mono<String> generateEmailReply(EmailRequest emailRequest) {
        // Build prompt
        String prompt = buildPrompt(emailRequest);

        // Raw JSON Body
        String requestBody = String.format("""
            {
              "contents": [
                {
                  "parts": [
                    { "text": "%s" }
                  ]
                }
              ]
            }
            """, prompt);

        // Send Request (non-blocking)
        return webClient.post()
                .uri("/v1beta/models/gemini-2.5-flash:generateContent")
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .map(this::extractResponseContent); // transform JSON into text
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        } catch (JacksonException e) {
            throw new RuntimeException(e);
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email. ");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone. ");
        }
        prompt.append("Original Email:\n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}