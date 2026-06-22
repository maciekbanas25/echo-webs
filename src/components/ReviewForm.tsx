import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ReviewForm = ({ onReviewSubmitted }: { onReviewSubmitted: () => void }) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting review...');
      const { data, error } = await supabase.functions.invoke('submit-review', {
        body: {
          rating,
          text: text.trim() || null,
          reviewer_name: name.trim() || null,
          company: company.trim() || null,
        },
      });

      console.log('Review submission response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data?.error) {
        toast({
          title: "Review limit reached",
          description: data.message || "You already have an active review. Please delete your existing review before submitting a new one.",
          variant: "destructive",
        });
        return;
      }

      // Store review ID and session ID in localStorage for deletion capability
      if (data?.reviewId) {
        localStorage.setItem('userReviewId', data.reviewId);
      }
      if (data?.sessionId) {
        localStorage.setItem('userReviewSessionId', data.sessionId);
      }

      toast({
        title: "Review submitted!",
        description: "Thank you! Your review will appear once it's been approved.",
      });

      setRating(0);
      setText("");
      setName("");
      setCompany("");
      onReviewSubmitted();
    } catch (error) {
      console.log("Review submission error:", error);
      toast({
        title: "Error submitting review",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm">
      <div>
        <label className="block text-sm font-medium mb-2">Rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review-name" className="block text-sm font-medium mb-2">
          Your name (optional)
        </label>
        <Input
          id="review-name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="review-company" className="block text-sm font-medium mb-2">
          Your company (optional)
        </label>
        <Input
          id="review-company"
          placeholder="Your company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="review-text" className="block text-sm font-medium mb-2">
          Your review (optional)
        </label>
        <Textarea
          id="review-text"
          placeholder="Tell us about your experience"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          maxLength={500}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
