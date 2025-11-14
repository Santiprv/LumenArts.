import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type CommunityPost = {
  id: string;
  author_name: string | null;
  author_avatar: string | null;
  content: string;
  created_at: string;
  likes_count: number | null;
  comments_count: number | null;
  likedByMe?: boolean;
};

function ensureDeviceId(): string {
  const key = "lumenarts_device_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return id;
}

// Memoized post component to prevent unnecessary re-renders
const PostCard = memo(({ post, onToggleLike }: { post: CommunityPost; onToggleLike: (post: CommunityPost) => void }) => (
  <Card className="bg-card border-border hover:shadow-elegant transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={post.author_avatar ?? undefined} alt={post.author_name ?? undefined} />
          <AvatarFallback>{(post.author_name ?? "?").charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{post.author_name ?? "Anónimo"}</h3>
          <p className="text-sm text-muted-foreground">{new Date(post.created_at).toLocaleString()}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>
      
      <div className="flex items-center gap-6 pt-4 border-t border-border">
        <Button onClick={() => onToggleLike(post)} variant="ghost" size="sm" className={`gap-2 ${post.likedByMe ? "text-primary" : "text-muted-foreground"} hover:text-primary`}>
          <Heart className="h-4 w-4" />
          <span>{(post.likes_count ?? 0).toString()}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
          <MessageCircle className="h-4 w-4" />
          <span>{(post.comments_count ?? 0).toString()}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
));

PostCard.displayName = 'PostCard';

const Comunidad = () => {
  const [posts, setPosts] = useState<CommunityPost[] | null>(null);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deviceId = useMemo(() => ensureDeviceId(), []);
  const { user, profile } = useAuth();

  const fetchPosts = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const { data: postsData, error: postsError } = await supabase
        .from("community_posts")
        .select("id, author_name, author_avatar, content, created_at, likes_count, comments_count")
        .order("created_at", { ascending: false })
        .limit(50);

      if (postsError) throw postsError;

      // Fetch likes by this user/device to mark likedByMe
      const likesQuery = user 
        ? supabase.from("community_likes").select("post_id").eq("user_id", user.id)
        : supabase.from("community_likes").select("post_id").eq("device_id", deviceId);
      
      const { data: likesData, error: likesError } = await likesQuery;

      if (likesError) throw likesError;

      const likedSet = new Set((likesData ?? []).map((l) => l.post_id));
      const mapped = (postsData ?? []).map((p) => ({
        ...p,
        likedByMe: likedSet.has(p.id)
      }));
      setPosts(mapped);
    } catch (e: any) {
      setError("No se pudo cargar el feed. Mostrando ejemplos.");
      // Fallback data if Supabase not configured yet
      const fallback: CommunityPost[] = [
        {
          id: "1",
          author_name: "María Rodríguez",
          author_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
          content:
            "¡Acabo de terminar mi nuevo cortometraje! Fue un desafío increíble pero estoy muy orgullosa del resultado. ¿Qué opinan de trabajar con iluminación natural?",
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes_count: 45,
          comments_count: 12,
          likedByMe: false,
        },
        {
          id: "2",
          author_name: "Carlos Méndez",
          author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          content:
            "Busco colaboradores para un proyecto de thriller urbano. Necesito camarógrafo y editor. ¡Envíenme mensaje!",
          created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          likes_count: 28,
          comments_count: 8,
          likedByMe: false,
        },
      ];
      setPosts(fallback);
    } finally {
      setLoading(false);
    }
  }, [user, deviceId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePublish = useCallback(async () => {
    if (!newPost.trim()) return;
    
    const authorName = profile?.full_name || user?.email || "Usuario";
    const authorAvatar = profile?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
    
    const optimistic: CommunityPost = {
      id: crypto.randomUUID(),
      author_id: user?.id || null,
      author_name: authorName,
      author_avatar: authorAvatar,
      content: newPost.trim(),
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      likedByMe: false,
    };
    setPosts((prev) => (prev ? [optimistic, ...prev] : [optimistic]));
    setNewPost("");

    const { data, error: insertError } = await supabase
      .from("community_posts")
      .insert({
        content: optimistic.content,
        author_id: optimistic.author_id,
        author_name: optimistic.author_name,
        author_avatar: optimistic.author_avatar,
      })
      .select()
      .single();

    if (insertError || !data) {
      // Revert optimistic
      setPosts((prev) => prev?.filter((p) => p.id !== optimistic.id) ?? null);
      setError("No se pudo publicar. Inténtalo de nuevo.");
      return;
    }

    // Replace optimistic with real row
    setPosts((prev) =>
      (prev ?? []).map((p) => (p.id === optimistic.id ? { ...p, id: data.id, created_at: data.created_at } : p))
    );
  }, [newPost, profile, user]);

  const toggleLike = useCallback(async (post: CommunityPost) => {
    const isLiked = !!post.likedByMe;
    const delta = isLiked ? -1 : 1;
    // Optimistic update
    setPosts((prev) =>
      (prev ?? []).map((p) =>
        p.id === post.id
          ? {
              ...p,
              likes_count: Math.max(0, (p.likes_count ?? 0) + delta),
              likedByMe: !isLiked,
            }
          : p
      )
    );

    if (isLiked) {
      const deleteQuery = user
        ? supabase.from("community_likes").delete().eq("post_id", post.id).eq("user_id", user.id)
        : supabase.from("community_likes").delete().eq("post_id", post.id).eq("device_id", deviceId);
        
      const { error: delErr } = await deleteQuery;
      if (delErr) {
        // Revert on error
        setPosts((prev) =>
          (prev ?? []).map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  likes_count: (p.likes_count ?? 0) + 1,
                  likedByMe: true,
                }
              : p
          )
        );
      }
    } else {
      const insertData = user
        ? { post_id: post.id, user_id: user.id }
        : { post_id: post.id, device_id: deviceId };
        
      const { error: insErr } = await supabase
        .from("community_likes")
        .insert(insertData);
      if (insErr) {
        // Revert on error
        setPosts((prev) =>
          (prev ?? []).map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  likes_count: Math.max(0, (p.likes_count ?? 0) - 1),
                  likedByMe: false,
                }
              : p
          )
        );
      }
    }
  }, [user, deviceId]);

  return (
    <div className="min-h-screen bg-background mobile-nav-padding">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Comunidad
          </h1>
          <p className="text-muted-foreground text-lg">
            Conecta con otros cineastas, comparte ideas y colabora
          </p>
        </div>

        {/* Nueva publicación */}
        {user && (
          <Card className="bg-card border-border mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || undefined} />
                  <AvatarFallback>
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea 
                    placeholder="Comparte tus ideas, proyectos o preguntas..."
                    className="bg-secondary border-border mb-4 min-h-[100px]"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handlePublish} disabled={!newPost.trim()} className="bg-gradient-primary hover:opacity-90 transition-opacity">
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estados de carga y error */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground ml-3">Cargando publicaciones...</p>
          </div>
        )}
        {error && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-amber-800">{error}</p>
          </div>
        )}

        {/* Feed de publicaciones */}
        <div className="space-y-6">
          {(posts ?? []).length === 0 && !loading && (
            <p className="text-muted-foreground">Aún no hay publicaciones. ¡Sé el primero en compartir algo!</p>
          )}
          {(posts ?? []).map((post) => (
            <PostCard key={post.id} post={post} onToggleLike={toggleLike} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comunidad;
