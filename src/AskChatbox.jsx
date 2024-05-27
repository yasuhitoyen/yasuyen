import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const AskChatbox = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [playerStats, setPlayerStats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);
  const matchHistory = props.matchHistory;
  const riotID = props.riotID;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (matchHistory && matchHistory.length > 0) {
      const stats = matchHistory.map((match) => {
        return match.info.participants
          .filter(
            (player) =>
              (player.riotIdGameName + "#" + player.riotIdTagline).toLowerCase() ===
              riotID.toLowerCase()
          )
          .map((player) => ({
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            physicalDmg: player.physicalDamageDealtToChampions,
            magicDmg: player.magicDamageDealtToChampions,
            trueDmg: player.trueDamageDealtToChampions,
            damageDealtToObjectives: player.damageDealtToObjectives,
            damageDealtToBuildings: player.damageDealtToBuildings,
            damageSelfMitigated: player.damageSelfMitigated,
            individualPosition: player.individualPosition,
            totalDmg: player.totalDamageDealtToChampions,
            championName: player.championName,
            visionScore: player.visionScore,
            wardsPlaced: player.wardsPlaced,
            wardsKilled: player.wardsKilled,
          }));
      }).flat();
      setPlayerStats(stats);
    }
  }, [matchHistory, riotID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessages = [...messages, { sender: "user", text: inputValue }];
      setMessages(newMessages);
      setInputValue("");
      setIsTyping(true);

      const formattedMessages = newMessages.map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      }));

      try {
        const response = await axios.post(`${API_BASE_URL}/chat`, {
          prompt: inputValue,
          playerStats: playerStats,
          messages: formattedMessages,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: response.data.response,
          },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: "Sorry, there was an error processing your request.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessages = () =>
    messages.map((message, index) => (
      <div
        key={index}
        className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`${
            message.sender === "user"
              ? "bg-lime-500 text-black"
              : "bg-gray-200 text-gray-800"
          } rounded-lg px-3 py-1 text-sm opacity-90 hover:scale-[1.015] transition-all duration-200`}
        >
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      </div>
    ));

  const renderTypingIndicator = () => (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-1 text-sm opacity-90 flex items-center">
        <span className="typing-indicator">Thinking...</span>
      </div>
    </div>
  );

  return (
    <div className="w-[900px] mx-auto bg-white shadow-lg rounded-lg bg-opacity-75">
      <div
        className="p-2 text-center border-b border-gray-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h1 className="text-xl font-semibold text-gray-800 select-none hover:scale-105 transition-all duration-200">
          Ask Yasu
        </h1>
      </div>
      {isExpanded && (
        <>
          <div id="chat-box" className="p-4 h-[180px] overflow-y-auto" ref={chatBoxRef}>
            {renderMessages()}
            {isTyping && renderTypingIndicator()}
          </div>
          <div className="p-0 border-t border-gray-200">
            <form id="chat-form" className="flex" onSubmit={handleSubmit}>
              <input
                id="message-input"
                type="text"
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-1 outline-none"
                placeholder="Type your message... (e.g., Give me advice based on my stats...)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
              >
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AskChatbox;
