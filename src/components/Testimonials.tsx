import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string;
  rating: number;
  text: string | null;
  reviewer_name: string | null;
  company: string | null;
  created_at: string;
}

const Testimonials = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  const hasMoreReviews = reviews.length > 3;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Client Feedback
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            See what my clients have to say
          </p>
          
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(averageRating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-semibold text-foreground">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="outline"
            size="lg"
          >
            {showForm ? "Cancel" : "Leave a Review"}
          </Button>
        </div>

        {showForm && (
          <div className="max-w-2xl mx-auto mb-16 animate-fade-in-up">
            <ReviewForm
              onReviewSubmitted={() => {
                setShowForm(false);
                fetchReviews();
              }}
            />
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-muted-foreground text-xl">
            No reviews yet. Be the first to leave one!
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {displayedReviews.map((review, index) => (
              <Card
                key={review.id}
                className="animate-scale-in border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {review.text && (
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{review.text}"
                    </p>
                  )}

                  <div>
                    <p className="font-semibold text-foreground">
                      {review.reviewer_name || "Anonymous User"}
                      {review.company && ` - ${review.company}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {hasMoreReviews && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowAllReviews(!showAllReviews)}
                variant="outline"
                size="lg"
              >
                {showAllReviews ? "Show Less" : "View All Reviews"}
              </Button>
            </div>
          )}
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
