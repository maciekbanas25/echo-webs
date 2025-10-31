import { useState, useEffect } from "react";
import { Star, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReviewForm from "./ReviewForm";
import DotGridBackground from "./DotGridBackground";
import BlurText from "./BlurText";

interface Review {
  id: string;
  rating: number;
  text: string | null;
  reviewer_name: string | null;
  company: string | null;
  created_at: string;
  session_id: string;
}

const Testimonials = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const getSessionId = () => {
    return localStorage.getItem("reviewSessionId");
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
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

  const handleDelete = async (reviewId: string) => {
    try {
      const sessionId = getSessionId();
      if (!sessionId) {
        toast({
          title: "Cannot delete review",
          description: "Session not found",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .rpc("delete_review_by_session", {
          review_id: reviewId,
          user_session_id: sessionId,
        });

      if (error) throw error;

      if (data) {
        toast({
          title: "Review deleted",
        });
        fetchReviews();
      } else {
        toast({
          title: "Cannot delete review",
          description: "You can only delete your own reviews",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({
        title: "Error deleting review",
        variant: "destructive",
      });
    }
  };

  const canDeleteReview = (review: Review) => {
    const sessionId = getSessionId();
    return sessionId && review.session_id === sessionId;
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle opacity-30" />
      <DotGridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <BlurText 
            text="Client Feedback"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent"
          />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className="animate-scale-in border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  {canDeleteReview(review) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

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
        )}
      </div>
    </section>
  );
};

export default Testimonials;
