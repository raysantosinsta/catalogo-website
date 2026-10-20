"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Film, Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import ImageCarousel from "./ImageCarousel";

interface AfterMediaViewerProps {
  images?: string[];
  video?: string;
  altPrefix?: string;
}

export default function AfterMediaViewer({
  images = [],
  video,
  altPrefix = "Depois"
}: AfterMediaViewerProps) {
  const hasImages = images && images.length > 0;
  const hasVideo = Boolean(video);

  // Se tiver ambos, inicia em "images", mas permite alternar facilmente
  const [mode, setMode] = useState<"images" | "video">("images");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isVideoFile = video && !video.toLowerCase().endsWith(".gif");

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  // Se só tiver vídeo, o modo ativo é forçado para vídeo
  const activeMode = !hasImages && hasVideo ? "video" : hasImages && !hasVideo ? "images" : mode;

  return (
    <div className="flex-1 w-full flex flex-col gap-3">
      {/* Header com indicador DEPOIS e seletor de mídia */}
      <div className="flex items-center justify-between min-h-[32px]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
          <h4 className="text-sm tracking-widest text-[var(--accent)] font-semibold">DEPOIS</h4>
        </div>

        {hasImages && hasVideo && (
          <div className="flex items-center bg-black/60 border border-white/10 rounded-full p-1 gap-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMode("images")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeMode === "images"
                  ? "bg-[var(--accent)] text-black shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <ImageIcon size={13} />
              <span>Fotos ({images.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("video")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeMode === "video"
                  ? "bg-[var(--accent)] text-black shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Film size={13} />
              <span>Vídeo</span>
            </button>
          </div>
        )}
      </div>

      {/* Conteúdo de Mídia */}
      {activeMode === "images" && hasImages && (
        <ImageCarousel images={images} altPrefix={altPrefix} />
      )}

      {activeMode === "video" && video && (
        <div
          ref={containerRef}
          className="relative w-full h-[320px] sm:h-[420px] md:h-[550px] lg:h-[600px] rounded-xl overflow-hidden border border-[var(--border)] group bg-black/40 flex items-center justify-center"
        >
          {isVideoFile ? (
            <>
              <video
                ref={videoRef}
                src={video}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Controles discretos flutuantes */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-85 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="text-white hover:text-[var(--accent)] transition-colors p-1"
                  title={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="text-white hover:text-[var(--accent)] transition-colors p-1"
                  title={isMuted ? "Ativar som" : "Desativar som"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="text-white hover:text-[var(--accent)] transition-colors p-1"
                  title="Tela cheia"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </>
          ) : (
            <img
              src={video}
              alt={`${altPrefix} vídeo`}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      )}
    </div>
  );
}
