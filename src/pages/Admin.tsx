import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Star,
  CheckCircle,
  XCircle,
  LogOut,
  Trash2,
  MessageSquareQuote,
  Eye,
  EyeOff,
} from "lucide-react";
import logo from "@/assets/ew-logo.png";

interface Review {
  id: string;
  rating: number;
  text: string | null;
  reviewer_name: string | null;
  company: string | null;
  status: string;
  created_at: string;
}

type Filter = "all" | "approved" | "rejected";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    checkAdminAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        navigate("/auth");
        return;
      }
      setUserId(session.user.id);

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        setIsLoading(false);
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      setIsLoading(false);
      fetchReviews();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "An error occurred during authentication.",
        variant: "destructive",
      });
      navigate("/auth");
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .neq("status", "deleted")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      toast({
        title: "Error loading reviews",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (
    reviewId: string,
    newStatus: "approved" | "rejected"
  ) => {
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
        title: newStatus === "approved" ? "Review approved" : "Review hidden",
        description:
          newStatus === "approved"
            ? "It's now visible on your site."
            : "It's no longer visible on your site.",
      });
      fetchReviews();
    } catch (error) {
      toast({
        title: "Error updating review",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({
          status: "deleted",
          moderated_by: userId,
          moderated_at: new Date().toISOString(),
        })
        .eq("id", reviewId);
      if (error) throw error;

      // Drop it from view immediately.
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      toast({
        title: "Review deleted",
        description: "It has been permanently removed from your site.",
      });
    } catch (error) {
      toast({
        title: "Error deleting review",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          {isLoading ? "Loading…" : ""}
        </div>
      </div>
    );
  }

  const approved = reviews.filter((r) => r.status === "approved");
  const rejected = reviews.filter((r) => r.status === "rejected");
  const pending = reviews.filter((r) => r.status === "pending");
  const avgRating =
    approved.length > 0
      ? approved.reduce((s, r) => s + r.rating, 0) / approved.length
      : 0;

  const visible =
    filter === "all"
      ? reviews
      : reviews.filter((r) => r.status === filter);

  const stats = [
    { label: "Total reviews", value: reviews.length, icon: MessageSquareQuote },
    { label: "Live on site", value: approved.length, icon: Eye },
    { label: "Hidden", value: rejected.length + pending.length, icon: EyeOff },
    {
      label: "Avg rating",
      value: avgRating ? avgRating.toFixed(1) : "—",
      icon: Star,
    },
  ];

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: reviews.length },
    { key: "approved", label: "Live", count: approved.length },
    { key: "rejected", label: "Hidden", count: rejected.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="EchoWebs" className="h-9 w-9 object-contain" />
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground">
                Review Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">EchoWebs Admin</p>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground md:text-3xl">
                {s.value}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                filter === f.key
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-card/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {f.label}
              <span className="ml-1.5 opacity-60">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Reviews */}
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <MessageSquareQuote className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              No reviews here yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {filter === "all"
                ? "Reviews left on your site will appear here."
                : "Nothing matches this filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onApprove={() => handleUpdateStatus(review.id, "approved")}
                onReject={() => handleUpdateStatus(review.id, "rejected")}
                onDelete={() => handleDelete(review.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const statusStyles: Record<string, string> = {
  approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rejected: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const statusLabel: Record<string, string> = {
  approved: "Live",
  rejected: "Hidden",
  pending: "Pending",
};

const ReviewCard = ({
  review,
  onApprove,
  onReject,
  onDelete,
}: {
  review: Review;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
}) => {
  const name = review.reviewer_name?.trim() || "Anonymous";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/30 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-hero text-sm font-bold text-primary-foreground">
            {initials || "?"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{name}</span>
              {review.company && (
                <span className="text-sm text-muted-foreground">
                  · {review.company}
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(review.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            statusStyles[review.status] ?? statusStyles.pending
          }`}
        >
          {statusLabel[review.status] ?? review.status}
        </span>
      </div>

      {review.text && (
        <p className="mt-4 border-l-2 border-primary/30 pl-4 text-muted-foreground">
          {review.text}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {review.status !== "approved" && (
          <Button size="sm" variant="brand" onClick={onApprove}>
            <CheckCircle className="mr-1.5 h-4 w-4" />
            Approve
          </Button>
        )}
        {review.status !== "rejected" && (
          <Button size="sm" variant="outline" onClick={onReject}>
            <XCircle className="mr-1.5 h-4 w-4" />
            Hide
          </Button>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this review?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes the review from your site for good. This can't be
                undone from here.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Admin;
