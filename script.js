document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    if (!chatBox || !userInput || !sendBtn) return;

    sendBtn.addEventListener("click", async () => {
        const message = userInput.value.trim();
        if (!message) return;

        // User message
        const userMsg = document.createElement("div");
        userMsg.textContent = "You: " + message;
        userMsg.style.marginBottom = "10px";
        chatBox.appendChild(userMsg);

        userInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        // AI placeholder
        const responseMsg = document.createElement("div");
        responseMsg.textContent = "AI: typing...";
        responseMsg.style.marginBottom = "10px";
        chatBox.appendChild(responseMsg);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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"
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    temperature: 0.85,
                    max_tokens: 500,
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: message }
                    ]
                })
            });

            const data = await res.json();
            responseMsg.textContent =
                "AI: " + (data.choices?.[0]?.message?.content || "No response");

        } catch (err) {
            responseMsg.textContent = "AI: Error connecting to API";
            console.error(err);
        }

        chatBox.scrollTop = chatBox.scrollHeight;
    });

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendBtn.click();
    });
});


