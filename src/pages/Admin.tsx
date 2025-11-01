import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, XCircle, LogOut } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  text: string | null;
  reviewer_name: string | null;
  company: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUserId(session.user.id);

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges. Please contact the administrator.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchReviews();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/auth");
    } finally {
      setIsLoading(false);
    }
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
      toast({
        title: "Error loading reviews",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (reviewId: string, newStatus: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({
          status: newStatus,
          moderated_by: userId,
          moderated_at: new Date().toISOString(),
        })
        .eq("id", reviewId);

      if (error) throw error;

      toast({
        title: `Review ${newStatus}`,
        description: `The review has been ${newStatus} successfully.`,
      });

      fetchReviews();
    } catch (error) {
      console.error("Error updating review:", error);
      toast({
        title: "Error updating review",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const pendingReviews = reviews.filter(r => r.status === "pending");
  const approvedReviews = reviews.filter(r => r.status === "approved");
  const rejectedReviews = reviews.filter(r => r.status === "rejected");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Review Moderation Dashboard</h1>
            <p className="text-muted-foreground">Manage and moderate user reviews</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-yellow-500">Pending</CardTitle>
              <CardDescription>Awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pendingReviews.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-green-500">Approved</CardTitle>
              <CardDescription>Visible to public</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{approvedReviews.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">Rejected</CardTitle>
              <CardDescription>Not visible</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{rejectedReviews.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No reviews yet
              </CardContent>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <Badge
                          variant={
                            review.status === "approved"
                              ? "default"
                              : review.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {review.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        {review.reviewer_name || "Anonymous"}
                        {review.company && (
                          <span className="text-sm font-normal text-muted-foreground ml-2">
                            - {review.company}
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {new Date(review.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {review.text && (
                    <p className="text-muted-foreground mb-4">{review.text}</p>
                  )}
                  {review.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleUpdateStatus(review.id, "approved")}
                        className="flex-1"
                        variant="default"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleUpdateStatus(review.id, "rejected")}
                        className="flex-1"
                        variant="destructive"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
