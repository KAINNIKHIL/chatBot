import { useState, useEffect, useRef } from 'react'
import axios from "axios";

function App() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null);

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  const sendMessage = async()=>{
    if(!input.trim()) return;

     const newMessages = [...messages, { sender: "user", text: input }];
     setMessages(newMessages);
      setInput("");
      try{
     const res = await axios.post('http://localhost:5000/chat', {messages : newMessages});
     
     setMessages([...newMessages, { sender: "Bot", text: res.data.reply }]);
      } catch {
    setMessages([
      ...newMessages,
      { sender: "Bot", text: "Server Error" },
    ]);
  }
  };

  return (
      <div  style={{  width: "500px",
          height: "100vh",
          gap: 8,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          background: "#0c1424",  
          overflow: "hidden", }}>
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#222a3aff",
    padding: "10px 14px",
    borderBottom: "1px solid #1a2335",
  }}
>

  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIBUyDnsAGDAt2i08CWdGVAnWsV-k82f7cXw&s" 
    alt="Bot Avatar"
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
    }}
  />

 
  <div style={{ display: "flex", flexDirection: "column" }}>
    <span style={{ color: "#fff", fontWeight: 600, fontSize: "16px" }}>
      Ira
    </span>
    <span style={{ color: "#aaa", fontSize: "12px" }}>Online</span>
  </div>
</div>

        <div style={{
           flex: 1,
           padding: "10px",
           overflowY: "auto",
           scrollbarWidth: "none",
           msOverflowStyle: "none", 
        }}>
          {messages.map((msg, idx)=>(
            <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                maxWidth: "60%",
                padding: "10px 15px",
                borderRadius: "15px",
                background: msg.sender === "user" ? "#ff2e92" : "#3b4454",
                color: "white",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              {msg.text}
            </span>
          </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div style={{display: "flex",
    gap: 8,
    padding: 10,
    margin: 0, 
    borderTop: "1px solid #1a2335",
    background: "#222a3aff",
    borderRadius: 12, }}>
        <textarea
  style={{
    flex: 1,
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid white",
    outline: "none",
    background: "#1c2434",
    color: "#fff",
    fontSize: "15px",
    height: "25px",
    resize: "none"
  }}
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      sendMessage();      
    }
  }}
  placeholder="Typing..."
/>

        
        <button  style={{
        marginLeft: "8px",
        padding: "8px 12px",
        borderRadius: "8px",
        border: "none",
        background: "#ff2e92",
        color: "white",
        cursor: "pointer",
      }}
      onClick={sendMessage}>Send</button>
      </div></div>
  );
}    

export default App
