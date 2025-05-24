
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight } from 'lucide-react';
import { usePersonalizedRecommendations } from '@/hooks/usePersonalizedRecommendations';
import { Link } from 'react-router-dom';

const RecommendationEngine = () => {
  const { recommendations } = usePersonalizedRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-gray-700/30 shadow-xl">
      <CardHeader className="border-b border-gray-700/20">
        <CardTitle className="flex items-center text-accent text-xl">
          <Sparkles className="w-6 h-6 mr-2" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {recommendations.slice(0, 3).map((rec, index) => (
          <div
            key={rec.serviceSlug}
            className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-600/20 hover:border-accent/30 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">{rec.title}</h4>
              <p className="text-sm text-gray-300 mb-2">{rec.reason}</p>
              <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
                {Math.round(rec.score * 100)}% match
              </Badge>
            </div>
            <Link to={`/services/${rec.serviceSlug}`}>
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80 hover:bg-accent/10">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendationEngine;
