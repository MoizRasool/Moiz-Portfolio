const text = "DevOps Engineer | Cloud Architect | Automation Specialist";
let i = 0;

function typingEffect(){
    if(i < text.length){
        document.querySelector(".typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typingEffect, 60);
    }
}

// Start typing effect when page loads
window.onload = typingEffect;
