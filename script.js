let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")
function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-IN"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Dear")
    }
    else if(hours>=12 && hours<16){
        speak("Good Afternoon Dear")
    }
    else{
        speak("Good Evening Dear")
    }
}
window.addEventListener("load", () => {
wishMe(); // greet automatically when site opens
});

window.addEventListener('load',()=>{
wishMe()
btn.addEventListener("load", wishMe);
})
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.computedStyleMap.display="flex"
    voice.computedStyleMap.display="block"
})

function takeCommand(message){
   btn.computedStyleMap.display="none"
       voice.computedStyleMap.display="none" 
    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello Mam, what can I help you?");
    } 
    else if (message.includes("who are you")|| message.includes("what's your name")|| message.includes("who created you")) {
        speak("I am Alina, your smart virtual assistant, created by Nandani Mam to help you with anything you need.");
    } 
    else if (message.includes("how are you")) {
        speak("I am always good when I am with you!");
    } 
    else if (message.includes("time")) {
    let time = new Date().toLocaleTimeString();
    speak("The time is " + time);
    }
    else if (message.includes("date")) {
        let date = new Date().toDateString();
        speak("Today's date is " + date);
    }
    else if (message.includes("thank you") || message.includes("thanks")) {
        speak("Anytime Mam! That's what I'm here for.");
    } 

    else if (message.includes("youtube") || message.includes("play")) {
    // For YouTube search
    let query = message
        .replace("play", "")
        .replace("on youtube", "")
        .replace("youtube", "")
        .trim();

    if (query.length === 0) {
        speak("What should I search on YouTube?");
    } else {
        speak("Searching " + query + " on YouTube");
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
    }
    } 
    else if (message.includes("search") || message.includes("weather") || message.includes("who") || message.includes("what") || message.includes("tell")) {
    // For Google search
    let query = message
        .replace("search", "")
        .replace("tell me", "")
        .replace("what is", "")
        .replace("who is", "")
        .replace("weather of", "")
        .trim();

    if (query.length === 0) {
        speak("What should I search for?");
    } else {
        speak("Searching " + query + " on Google");
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
    }       
/*
    else if (message.includes("search")) {
    let query = message.replace("search", "").trim();  
    if (query.length === 0) {
        speak("What should I search for?");
    } else {
        speak("Searching " + query + " on Google");
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
}
*/     
    else if (message.includes("play song") || message.includes("play music")||message.includes("can u play music")) {
        speak("yes! Playing music for you");
        window.open(`https://www.youtube.com/results?search_query=latest+songs`, "_blank");
    }
    else if (message.includes("weather")) {
        speak("Currently I cannot fetch real-time weather, but you can check on Google.");
        window.open("https://www.google.com/search?q=weather", "_blank");
    }
    else if(message.includes("open youtube")){
        speak("opening youtube")
        window.open("https://youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram")
        window.open("https://instagram.com/","_blank")
    }
    else if(message.includes("open linkedin")){
        speak("opening linkedin")
        window.open("https://linkedin.com/","_blank")
    }
    else if (message.includes("OK stop it ")) {
    speak("okh");
    } 
    else {
    speak("Let me think...");

    // PROMPT LOGIC
    let aiPrompts = [
    { key: "joke", ans: "Okay, here's a joke! Why did the scarecrow win an award? Because he was outstanding in his field!" },

    // NEW JOKES ↓↓↓
    { key: "another joke", ans: "Why don’t eggs tell jokes? Because they might crack each other up!" },
    { key: "tell me jokes", ans: "Why did the computer go to the doctor? Because it had a virus!" },
    { key: "more jokes", ans: "Why was the math book sad? Because it had too many problems!" },
    { key: "funny jokes", ans: "Why don’t skeletons fight each other? Because they don’t have the guts!" },
    { key: "joke", ans: "Why was the broom late? Because it swept in!" },

    // MOTIVATION
    { key: "motivate", ans: "You are strong, brilliant and capable of achieving anything you set your mind to!" },
    // CREATOR
    { key: "who made you", ans: "I was created by Nandani Mam with love and smart coding skills." },
    // STORY
    { key: "story", ans: "Once upon a time, there was a girl who created her own AI assistant. And guess what? You're talking to her creation now!" },
    { key: "sing", ans: "La la laaaa! I may not be a singer, but I tried for you Mam!" },
    { key: "dance", ans: "If I had legs, Mam, I would be dancing right now!" }
];

        let found = false;

        aiPrompts.forEach(data => {
            if (message.includes(data.key)) {
                speak(data.ans);
                found = true;
            }
        });

        // If not matched,AI reply
        if (!found) {
            let fallbackReplies = [
                "Sorry Mam, I did not understand that. Could you repeat?",
                "Hmm, I am not sure about that, but I can learn!",
                "Interesting! Could you ask in another way?"
            ];

            let randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
            speak(randomReply);
        }
    }
    
}

