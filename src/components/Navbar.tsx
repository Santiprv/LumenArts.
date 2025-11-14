import React, { useState, useCallback } from "react";
import { Film, Search, User, Upload, LogOut, Settings, Loader2 } from "@/lib/icon-imports";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadShortFilmDialog from "./UploadShortFilmDialog";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
// ...existing code...

const Navbar = React.memo(() => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, profile, signOut, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Abrir dialog de login si ?login=1 en la URL
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('login') === '1') {
      setLoginDialogOpen(true);
      // limpiar el query param sin recargar
      params.delete('login');
      const newSearch = params.toString();
      navigate({ search: newSearch }, { replace: true });
    }
  }, [location.search, navigate]);

  const handleSignOut = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      
      // Ejecutar logout (ahora es más rápido)
      await signOut();
      
      // Mostrar toast de éxito
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente.",
      });
      
      // Redirect to home page after successful logout
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al cerrar sesión. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  }, [signOut, toast, navigate]);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-18 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3">
                <div className="h-10 w-10 text-primary">
                  <img src="/assets/camera-logo.svg" alt="LumenArts Logo" className="h-full w-full" style={{filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)'}} />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground">
                  LumenArts
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
                <Link to="/cortometrajes" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Cortometrajes
                </Link>
                <Link to="/artistas" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Artistas
                </Link>
                <Link to="/eventos" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Eventos
                </Link>
                <Link to="/comunidad" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Comunidad
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center relative group">
                <Search className="absolute left-4 h-4 w-4 text-primary transition-colors" />
                <Input 
                  placeholder="Buscar cortometrajes..." 
                  className="pl-12 w-72 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 hover:bg-card/70"
                />
              </div>
              
              {user ? (
                <>
                  <Button 
                    className="bg-primary hover:bg-primary/90 transition-colors gap-2"
                    onClick={() => setUploadDialogOpen(true)}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="hidden sm:inline">Subir Video</span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || undefined} />
                          <AvatarFallback>
                            {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex flex-col space-y-1 p-2">
                        <p className="text-sm font-medium leading-none">{profile?.full_name || "Usuario"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/perfil" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Perfil</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/perfil" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Configuración</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleSignOut} 
                        className="text-red-600"
                        disabled={isLoggingOut || loading}
                      >
                        {isLoggingOut ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <LogOut className="mr-2 h-4 w-4" />
                        )}
                        <span>{isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setLoginDialogOpen(true)}
                    className="border-border text-sm"
                  >
                    <span className="hidden sm:inline">Iniciar Sesión</span>
                    <span className="sm:hidden">Login</span>
                  </Button>
                  <Button 
                    className="bg-gradient-primary hover:opacity-90 transition-opacity text-sm"
                    onClick={() => setRegisterDialogOpen(true)}
                  >
                    <span className="hidden sm:inline">Registrarse</span>
                    <span className="sm:hidden">Registro</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <UploadShortFilmDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen}
        onUploadSuccess={() => {
          // El cortometraje se guardó en la base de datos
          // Los ejemplos siguen visibles en la pestaña de cortometrajes
          console.log('Cortometraje subido exitosamente');
        }}
      />
      
      <LoginDialog 
        open={loginDialogOpen} 
        onOpenChange={setLoginDialogOpen}
        onSwitchToRegister={() => {
          setLoginDialogOpen(false);
          setRegisterDialogOpen(true);
        }}
      />
      
      <RegisterDialog 
        open={registerDialogOpen} 
        onOpenChange={setRegisterDialogOpen}
        onSwitchToLogin={() => {
          setRegisterDialogOpen(false);
          setLoginDialogOpen(true);
        }}
      />
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
