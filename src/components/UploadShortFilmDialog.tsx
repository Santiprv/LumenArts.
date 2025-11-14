import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Upload, Play } from "@/lib/icon-imports";

interface UploadShortFilmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess?: () => void;
}

const UploadShortFilmDialog = ({ open, onOpenChange, onUploadSuccess }: UploadShortFilmDialogProps) => {
  const { user, profile } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: "drama", label: "Drama" },
    { value: "comedia", label: "Comedia" },
    { value: "terror", label: "Terror" },
    { value: "ciencia-ficcion", label: "Ciencia Ficción" },
    { value: "documental", label: "Documental" },
    { value: "animacion", label: "Animación" },
    { value: "experimental", label: "Experimental" }
  ];

  const getVideoEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop()?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop()?.split("?")[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }
    return null;
  };

  const getVideoDuration = async (url: string): Promise<number> => {
    // Por simplicidad, retornamos una duración por defecto
    // En una implementación real, podrías usar la API de YouTube/Vimeo
    return 300; // 5 minutos por defecto
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailUrl(""); // Limpiar URL si se selecciona archivo

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUrlChange = (url: string) => {
    setThumbnailUrl(url);
    setThumbnailFile(null); // Limpiar archivo si se ingresa URL
    setThumbnailPreview(url);
  };

  const uploadThumbnail = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `thumb-${user?.id}-${Date.now()}.${fileExt}`;

      // Intentar subir a storage, pero si falla, usar imagen por defecto
      const { data, error } = await supabase.storage
        .from('thumbnails')
        .upload(fileName, file, { upsert: true });

      if (error) {
        console.warn('Storage upload failed, using default thumbnail:', error);
        return null; // Retornar null para usar imagen por defecto
      }

      const { data: publicUrl } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(data.path);

      return publicUrl.publicUrl;
    } catch (error) {
      console.warn('Storage upload failed, using default thumbnail:', error);
      return null; // Retornar null para usar imagen por defecto
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setVideoLink("");
    setCategory("");
    setThumbnailFile(null);
    setThumbnailUrl("");
    setThumbnailPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Debes iniciar sesión para subir un cortometraje");
      return;
    }

    if (!title.trim() || !description.trim() || !videoLink.trim()) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    // Validar URL del video
    const embedUrl = getVideoEmbedUrl(videoLink);
    if (!embedUrl) {
      toast.error("Por favor ingresa un enlace válido de YouTube o Vimeo");
      return;
    }

    setIsUploading(true);

    try {
      // Subir miniatura si se seleccionó un archivo
      let finalThumbnailUrl = thumbnailUrl;
      if (thumbnailFile) {
        const uploadedUrl = await uploadThumbnail(thumbnailFile);
        if (uploadedUrl) {
          finalThumbnailUrl = uploadedUrl;
        }
      }

      // Si no hay miniatura, usar una por defecto basada en la categoría
      if (!finalThumbnailUrl) {
        const defaultThumbnails: { [key: string]: string } = {
          drama: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
          comedia: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80',
          terror: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
          'ciencia-ficcion': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
          documental: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
          animacion: 'https://images.unsplash.com/photo-1542204165-1d7a6a9d3a9d?w=800&q=80',
          experimental: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80'
        };
        finalThumbnailUrl = defaultThumbnails[category] || 'https://images.unsplash.com/photo-1489599511986-c2b8e5b1b5b5?w=800&q=80';
      }

      // Obtener duración del video
      const duration = await getVideoDuration(videoLink);

      // Preparar datos del cortometraje
      const shortFilmData = {
        title: title.trim(),
        description: description.trim(),
        video_url: videoLink.trim(),
        thumbnail_url: finalThumbnailUrl,
        duration,
        creator_id: user.id,
        creator_name: profile?.full_name || user.email?.split('@')[0] || 'Usuario',
        creator_avatar: profile?.avatar_url,
        category: category || null,
        views_count: 0,
        likes_count: 0,
        is_featured: false
      };

      // Insertar en la base de datos
      const { error } = await supabase
        .from('short_films')
        .insert([shortFilmData]);

      if (error) {
        console.error('Error inserting short film:', error);
        toast.error('Error al subir el cortometraje. Inténtalo de nuevo.');
        return;
      }

      toast.success('¡Cortometraje subido con éxito!');
      resetForm();
      onOpenChange(false);

      // Notificar al componente padre para actualizar la lista
      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (error) {
      console.error('Error uploading short film:', error);
      toast.error('Error al subir el cortometraje. Inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Subir Cortometraje
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Comparte tu obra con la comunidad de LumenArts
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Título <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="El nombre de tu cortometraje"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary border-border"
              required
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Descripción <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Cuéntanos sobre tu cortometraje..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-secondary border-border min-h-[100px]"
              required
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoLink" className="text-foreground">
              Enlace del video <span className="text-destructive">*</span>
            </Label>
            <Input
              id="videoLink"
              type="url"
              placeholder="https://youtube.com/... o https://vimeo.com/..."
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="bg-secondary border-border"
              required
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">
              Soportamos enlaces de YouTube y Vimeo
            </p>
            {videoLink && getVideoEmbedUrl(videoLink) && (
              <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-700 dark:text-green-300 flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  Enlace válido detectado
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">
              Categoría
            </Label>
            <Select value={category} onValueChange={setCategory} disabled={isUploading}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Miniatura</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Imagen
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailFileChange}
                  className="hidden"
                />
              </div>

              <div className="text-xs text-muted-foreground text-center">o</div>

              <Input
                placeholder="URL de la miniatura (opcional)"
                value={thumbnailUrl}
                onChange={(e) => handleThumbnailUrlChange(e.target.value)}
                className="bg-secondary border-border"
                disabled={isUploading}
              />

              {thumbnailPreview && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-2">Vista previa:</p>
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
              className="border-border"
              disabled={isUploading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Subiendo...
                </>
              ) : (
                'Publicar Cortometraje'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadShortFilmDialog;
