'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Code, Eye, CheckCircle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FastNewsletterGeneratorProps {
  htmlCode: string;
}

export default function FastNewsletterGenerator({ htmlCode }: FastNewsletterGeneratorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const [isGenerationComplete, setIsGenerationComplete] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('/api/generateNL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: htmlCode }),
        });

        if (response.ok) {
          const result = await response.json();
          setSuggestions(result.suggestions || []);
        } else {
          console.error('Error occurred while fetching suggestions');
        }
      } catch (error) {
        console.error('Error occurred while fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [htmlCode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode).then(() => {
      alert('HTML code copied to clipboard');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }

  const handleSuggestionClick = (suggestion: string) => {
    console.log("Suggestion clicked:", suggestion);
    // Handle the suggestion click event here
  }

  if (!isVisible) return null

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-darkBlack transition-colors duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4" />
          <Switch
            checked={isPreview}
            onCheckedChange={setIsPreview}
            aria-label="Toggle preview"
          />
          <Eye className="h-4 w-4" />
          {isGenerationComplete && <CheckCircle className="h-4 w-4 text-green-500" />}
        </div>
        <button onClick={copyToClipboard} aria-label="Copy">
          <Copy className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          {isPreview ? (
            <iframe
              srcDoc={htmlCode}
              title="Newsletter Preview"
              className="w-full h-[400px] border-none overflow-hidden"
              style={{ backgroundColor: "white" }}
            />
          ) : (
            <pre className="p-4 bg-gray-50 dark:bg-gray-900 overflow-auto h-[400px] text-sm">
              <code>{htmlCode}</code>
            </pre>
          )}
        </div>
        {suggestions.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Suggestions:</h2>
            <ul className="list-disc list-inside">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm">{suggestion}</li>
              ))}
            </ul>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="rounded-lg border-2 border-border hover:border-primary text-foreground hover:text-white px-2 py-1 transition-colors duration-300 text-xs"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}