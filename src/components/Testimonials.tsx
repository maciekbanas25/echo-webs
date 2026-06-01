import { useState, useEffect } from "react";
import { Star, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReviewForm from "./ReviewForm";
import Reveal from "@/components/Reveal";

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
        .from("reviews_public")
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

  const handleDeleteReview = async (reviewId: string) => {
    try {
      // Get the session ID from localStorage for secure deletion
      const sessionId = localStorage.getItem('userReviewSessionId');
      
      if (!sessionId) {
        toast({
          title: "Cannot delete review",
          description: "Session information not found. You can only delete reviews from your current session.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('delete-review', {
        body: { reviewId, sessionId },
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          title: "Cannot delete review",
          description: data.error === 'Unauthorized to delete this review' 
            ? "You can only delete your own reviews"
            : data.error,
          variant: "destructive",
        });
        return;
      }

      // Clear localStorage on successful deletion
      if (localStorage.getItem('userReviewId') === reviewId) {
        localStorage.removeItem('userReviewId');
        localStorage.removeItem('userReviewSessionId');
      }

      toast({
        title: "Success",
        description: "Review deleted successfully",
      });

      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      });
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
        <Reveal className="text-center mb-16">
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
        </Reveal>

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
              <Reveal key={review.id} animation="scale-in" delay={index * 0.1}>
              <Card
                className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 relative"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    {localStorage.getItem('userReviewId') === review.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteReview(review.id)}
                        title="Delete your review"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
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
              </Reveal>
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
