
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Logo } from "@/components/layout/Logo";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { ChatInput } from "./components/ChatInput";
import { ChatMessageList } from "./components/ChatMessageList";
import { SuggestedQueries } from "./components/SuggestedQueries";
import { suggestedQueries } from "./data/suggestedQueries";
import { BrainCircuit } from "lucide-react";
import { ChatMessage, aiService } from "@/services/aiService";

export function AIChat() {
  // Start with empty messages array; assistant responses will be fetched via aiService using the knowledge base
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: messageText,
      timestamp: Date.now(), // Convert Date to number timestamp
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get AI response using the updated service method
      const response = await aiService.generateChatResponse(messageText);
      
      if (response.status === 'success') {
        const botMessage: ChatMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: response.text,
          timestamp: Date.now(), // Convert Date to number timestamp
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        toast.error(response.message || 'Failed to get a response');
      }
    } catch (error) {
      console.error('Error in chat:', error);
      toast.error('Something went wrong with the AI chat');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestedQuery = (query: string) => {
    handleSend(query);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black/40 border-purple-500/30">
      <CardHeader className="border-b border-purple-500/20">
        <CardTitle className="flex items-center gap-2">
          <Logo iconType="gem" size={6} interactive={false} />
          <span className="text-white flex items-center">
            <BrainCircuit className="w-5 h-5 mr-1 text-purple-400" />
            QuantumBot AI Assistant
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChatMessageList messages={messages} />
        
        {/* Suggested queries section */}
        {messages.length < 3 && (
          <SuggestedQueries 
            suggestions={suggestedQueries} 
            onSelectQuery={handleSuggestedQuery} 
            isLoading={isLoading}
          />
        )}
      </CardContent>
      <CardFooter className="border-t border-purple-500/20 p-4">
        <ChatInput onSendMessage={handleSend} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
}
