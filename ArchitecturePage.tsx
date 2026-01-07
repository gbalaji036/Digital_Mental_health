
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAIClient } from '../services/geminiService';
import BackgroundVideo from '../components/BackgroundVideo';

// FIX: Removed local declare global for aistudio as it conflicts with the environment's existing AIStudio type definition on the Window interface.

const ArchitecturePage: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState('');

    const generateDiagram = async () => {
        setIsLoading(true);
        setError(null);
        setStatusMessage('Syncing with AI Studio Environment...');

        try {
            // FIX: Rely on the global AIStudio type for window.aistudio which is pre-configured in this context.
            const hasKey = await window.aistudio.hasSelectedApiKey();
            if (!hasKey) {
                setStatusMessage('User Action Required: Select API Key...');
                await window.aistudio.openSelectKey();
            }

            setStatusMessage('Compiling System Metadata...');
            const client = getAIClient();
            
            setStatusMessage('Synthesizing Schematic (Gemini 3 Pro Image 1K)...');
            
            const prompt = `Highly professional technical architecture diagram for 'Healer Wellness Hub'. 
            Isometric 3D blocks, glowing neon lavender connections on dark background. 
            Nodes: 1. React Frontend SPA, 2. Intelligent Inference Layer, 3. Neural Context (LLM), 4. Geospatial Grounding (Maps API). 
            Modern SaaS aesthetic, 4K clarity, professional typography.`;

            const response = await client.models.generateContent({
                model: 'gemini-3-pro-image-preview',
                contents: {
                    parts: [{ text: prompt }],
                },
                config: {
                    imageConfig: {
                        aspectRatio: "16:9",
                        imageSize: "1K"
                    },
                },
            });

            const candidate = response.candidates?.[0];
            let foundImage = false;

            if (candidate?.content?.parts) {
                for (const part of candidate.content.parts) {
                    if (part.inlineData) {
                        setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
                        foundImage = true;
                        break;
                    }
                }
            }

            if (!foundImage) throw new Error("Latency spike: Image generation timeout. Please retry.");
            
            setStatusMessage('System Schema Generated Successfully.');
        } catch (err: any) {
            console.error("Architecture Gen Error:", err);
            const errorMsg = err.message || "";
            
            // Per instructions: If request fails with permission or not found, prompt for key again.
            if (errorMsg.includes("permission") || errorMsg.includes("not found")) {
                setError("Permission Denied: Gemini 3 Pro models require an API key from a PAID Google Cloud project. Please select a valid key and try again.");
                // FIX: Automatically prompt again to fix the state. No delay added to mitigate race conditions as per guidelines.
                await window.aistudio.openSelectKey();
            } else {
                setError(err.message || "Synthetics service unavailable.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        generateDiagram();
    }, []);

    return (
        <div className="relative min-h-screen">
            <BackgroundVideo src="https://videos.pexels.com/video-files/5492119/5492119-hd_1920_1080_25fps.mp4" />
            
            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="text-center mb-12 animate-fade-in-up">
                    <span className="text-primary-light text-sm font-mono tracking-widest uppercase">System Metadata</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Intelligence Architecture</h1>
                    <p className="text-light-text/60 max-w-2xl mx-auto italic font-mono text-sm">
                        Healer v2.5 / Distributed Neural Processing Schematic
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="bg-dark-neutral/90 backdrop-blur-3xl rounded-3xl border border-light-neutral/50 p-2 md:p-6 shadow-2xl relative overflow-hidden min-h-[550px] flex flex-col items-center justify-center">
                        
                        {isLoading && (
                            <div className="text-center animate-pulse flex flex-col items-center gap-6 p-12">
                                <div className="w-20 h-20 border-t-4 border-r-4 border-primary rounded-full animate-spin"></div>
                                <div className="space-y-4">
                                    <p className="text-xl font-mono text-primary">{statusMessage}</p>
                                    <div className="w-64 h-1 bg-light-neutral rounded-full mx-auto overflow-hidden">
                                        <div className="h-full bg-primary animate-[pageTransition_2s_infinite]"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="text-center p-12 max-w-md">
                                <h3 className="text-2xl font-bold text-red-500 mb-4 font-mono">_SYSTEM_ERR</h3>
                                <p className="text-light-text/70 mb-8">{error}</p>
                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={generateDiagram}
                                        className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-3 px-10 rounded-full transition-all hover:scale-105 active:scale-95"
                                    >
                                        Re-Initialize Sequence
                                    </button>
                                    <button 
                                        onClick={() => window.aistudio.openSelectKey()}
                                        className="text-primary hover:underline text-sm font-mono"
                                    >
                                        Change API Key
                                    </button>
                                </div>
                                <p className="mt-8 text-xs text-light-text/40">Reference: ai.google.dev/gemini-api/docs/billing</p>
                            </div>
                        )}

                        {imageUrl && !isLoading && (
                            <div className="animate-fade-in-up w-full flex flex-col items-center">
                                <img 
                                    src={imageUrl} 
                                    alt="Technical Architecture Schematic" 
                                    className="w-full rounded-2xl shadow-inner border border-light-neutral/30 mb-8 transition-transform hover:scale-[1.01] duration-700"
                                />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-4 mb-4">
                                    <div className="text-center p-3 bg-dark-bg/40 rounded-xl border border-primary/20">
                                        <p className="text-primary text-xs font-mono">LATENCY</p>
                                        <p className="text-light-text text-lg font-bold">~250ms</p>
                                    </div>
                                    <div className="text-center p-3 bg-dark-bg/40 rounded-xl border border-accent/20">
                                        <p className="text-accent text-xs font-mono">MODEL</p>
                                        <p className="text-light-text text-lg font-bold">GEMINI 3</p>
                                    </div>
                                    <div className="text-center p-3 bg-dark-bg/40 rounded-xl border border-blue-400/20">
                                        <p className="text-blue-400 text-xs font-mono">ENGINE</p>
                                        <p className="text-light-text text-lg font-bold">VITE/REACT</p>
                                    </div>
                                    <div className="text-center p-3 bg-dark-bg/40 rounded-xl border border-red-400/20">
                                        <p className="text-red-400 text-xs font-mono">SECURITY</p>
                                        <p className="text-light-text text-lg font-bold">TLS 1.3</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link to="/" className="text-light-text/40 hover:text-primary transition-colors text-xs font-mono">&lt; RETURN_HOME /&gt;</Link>
                        <Link to="/contact" className="text-light-text/40 hover:text-primary transition-colors text-xs font-mono">&lt; CONTACT_SYS_ADMIN /&gt;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchitecturePage;
