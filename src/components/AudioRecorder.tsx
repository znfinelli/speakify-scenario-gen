
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Play, Pause, Square } from "lucide-react";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(audioBlob);
        
        // Create and store the audio URL
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access your microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      // Create a new audio element or use the existing one
      if (!audioPlayerRef.current) {
        audioPlayerRef.current = new Audio(audioUrl);
      } else {
        audioPlayerRef.current.src = audioUrl;
      }
      
      audioPlayerRef.current.onended = () => {
        setIsPlaying(false);
      };
      
      // Play the audio
      audioPlayerRef.current.play().catch(err => {
        console.error("Error playing audio:", err);
      });
      
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Card className="bg-gray-50">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">Record Your Response</h3>
        
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
            {isRecording ? (
              <div className="absolute w-full h-full rounded-full animate-pulse bg-red-200"></div>
            ) : null}
            {isRecording ? (
              <MicOff className="w-8 h-8 text-red-500 z-10" />
            ) : (
              <Mic className="w-8 h-8 text-blue-500 z-10" />
            )}
          </div>
          
          <div className="flex gap-4">
            {!isRecording ? (
              <Button 
                onClick={startRecording} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Start Recording
              </Button>
            ) : (
              <Button 
                onClick={stopRecording} 
                variant="destructive"
              >
                Stop Recording
              </Button>
            )}
          </div>
          
          {recordedAudio && !isRecording && (
            <div className="mt-4 flex gap-4">
              {!isPlaying ? (
                <Button 
                  onClick={playRecording}
                  variant="outline"
                  className="flex gap-2"
                >
                  <Play className="w-4 h-4" /> Play
                </Button>
              ) : (
                <Button 
                  onClick={pausePlayback}
                  variant="outline"
                  className="flex gap-2"
                >
                  <Pause className="w-4 h-4" /> Pause
                </Button>
              )}
              
              {/* Add an audio element for direct playback as a fallback */}
              {audioUrl && (
                <audio 
                  className="hidden" 
                  controls 
                  src={audioUrl} 
                  id="recorded-audio"
                />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioRecorder;
