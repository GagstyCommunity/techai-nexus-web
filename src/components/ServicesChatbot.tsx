
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  services?: string[];
}

interface Service {
  title: string;
  slug: string;
  short_description: string;
  category: string;
}

const ServicesChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you find the perfect tech services for your needs. What kind of project are you working on?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const services: Service[] = [
    { title: 'AI Tool Development', slug: 'ai-tools', short_description: 'Custom AI tools and applications', category: 'ai-tools' },
    { title: 'AI Automation', slug: 'ai-automation', short_description: 'SaaS automation and intelligent workflows', category: 'ai-automation' },
    { title: 'Web3 Development', slug: 'web3', short_description: 'Blockchain games and DeFi solutions', category: 'web3' },
    { title: 'Web Development', slug: 'web-development', short_description: 'Modern web applications and mobile apps', category: 'web-development' },
    { title: 'Growth Hacking', slug: 'growth-hacking', short_description: 'Data-driven marketing strategies', category: 'growth-hacking' },
    { title: 'DevOps', slug: 'devops', short_description: 'Cloud infrastructure and DevOps practices', category: 'devops' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const matchServices = (userInput: string): string[] => {
    const input = userInput.toLowerCase();
    const keywords = {
      'ai': ['ai-tools', 'ai-automation'],
      'automation': ['ai-automation'],
      'chatbot': ['ai-tools'],
      'blockchain': ['web3'],
      'crypto': ['web3'],
      'defi': ['web3'],
      'website': ['web-development'],
      'app': ['web-development'],
      'mobile': ['web-development'],
      'marketing': ['growth-hacking'],
      'growth': ['growth-hacking'],
      'seo': ['growth-hacking'],
      'cloud': ['devops'],
      'infrastructure': ['devops'],
      'devops': ['devops'],
    };

    const matchedServices = new Set<string>();
    
    Object.entries(keywords).forEach(([keyword, serviceCategories]) => {
      if (input.includes(keyword)) {
        serviceCategories.forEach(category => matchedServices.add(category));
      }
    });

    return Array.from(matchedServices);
  };

  const generateBotResponse = (userInput: string): string => {
    const matchedServiceSlugs = matchServices(userInput);
    const matchedServices = services.filter(service => 
      matchedServiceSlugs.includes(service.category)
    );

    if (matchedServices.length > 0) {
      const serviceList = matchedServices.map(service => service.title).join(', ');
      return `Based on your needs, I'd recommend our ${serviceList} services. These would be perfect for your project! Would you like to know more about any of these?`;
    }

    const responses = [
      "That sounds interesting! Could you tell me more about your specific requirements?",
      "I'd love to help you find the right solution. What's your main goal with this project?",
      "Great! What technology stack are you considering, or do you need guidance on that too?",
      "Perfect! Are you looking for a complete solution or specific components?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const matchedServiceSlugs = matchServices(inputValue);
      const botResponse = generateBotResponse(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
        services: matchedServiceSlugs,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleServiceClick = (slug: string) => {
    window.open(`/services/${slug}`, '_blank');
    toast({
      title: "Opening service page",
      description: "Service details opened in a new tab",
    });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 bg-accent hover:bg-accent/80 shadow-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-40 animate-fade-in">
          <Card className="h-full flex flex-col shadow-xl border-2">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
              <CardTitle className="text-lg flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                AI Services Assistant
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-accent text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      {message.services && message.services.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.services.map((serviceSlug) => {
                            const service = services.find(s => s.category === serviceSlug);
                            return service ? (
                              <Badge
                                key={serviceSlug}
                                variant="secondary"
                                className="cursor-pointer hover:bg-accent hover:text-white mr-1 mb-1"
                                onClick={() => handleServiceClick(service.slug)}
                              >
                                {service.title}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about our services..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ServicesChatbot;
