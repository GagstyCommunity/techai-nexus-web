
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
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center text-accent">
          <Sparkles className="w-5 h-5 mr-2" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.slice(0, 3).map((rec, index) => (
          <div
            key={rec.serviceSlug}
            className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-gray-200/50 hover:border-accent/30 transition-colors"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{rec.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {Math.round(rec.score * 100)}% match
              </Badge>
            </div>
            <Link to={`/services/${rec.serviceSlug}`}>
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
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
