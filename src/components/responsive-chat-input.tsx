'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Paperclip, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

interface ResponsiveChatInputProps {
  suggestions?: string[];
  onSubmit: (message: string) => void;
}

export function ResponsiveChatInput({ suggestions = [], onSubmit }: ResponsiveChatInputProps) {
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchedSuggestions, setFetchedSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('/api/generateNL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: message }),
        });

        if (response.ok) {
          const result = await response.json();
          setFetchedSuggestions(result.suggestions || []);
        } else {
          console.error('Error occurred while fetching suggestions');
        }
      } catch (error) {
        console.error('Error occurred while fetching suggestions:', error);
      }
    };

    if (message.trim() !== "") {
      fetchSuggestions();
    }
  }, [message]);

  const toggleChatHistory = () => {
    setShowChatHistory(!showChatHistory);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    onSubmit(message);
    setMessage("");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card dark:bg-card transition-colors duration-300 p-4 sm:p-6 shadow-lg rounded-lg overflow-hidden flex items-center justify-center min-h-screen">
      <div className="w-full">
        <h1 className="font-bold mb-4 text-center text-lg sm:text-xl text-foreground">
          What's your newsletter about?
        </h1>
        
        <form onSubmit={handleSubmit} className="relative mb-6 w-full">
          <Input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..." 
            className="rounded-lg border-2 border-border focus:border-primary focus:ring focus:ring-primary dark:focus:ring-primary text-sm text-center"
          />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <Button size="icon" variant="ghost" className="rounded-lg h-8 w-8 bg-muted dark:bg-muted">
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <Button type="submit" size="icon" className="rounded-lg h-8 w-8 bg-primary text-primary-foreground">
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>

        {fetchedSuggestions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {fetchedSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-lg border-2 border-border hover:border-primary text-foreground hover:text-white px-2 py-1 transition-colors duration-300 text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <Button onClick={toggleChatHistory}>
            {showChatHistory ? "Hide Chat History" : "Show Chat History"}
          </Button>
        </div>

        {showChatHistory && (
          <div className="mt-6">
            {/* Render chat history */}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResponsiveChatInput;