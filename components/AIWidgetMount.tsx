import React from 'react';
import Script from 'next/script';

export function AIWidgetMount() {
  const widgetUrl = process.env.NEXT_PUBLIC_AI_WIDGET_URL;

  return (
    <>
      {/* Reserved AI Chat Widget Mount Point */}
      <div id="mfa-ai-widget" className="relative z-50" />

      {/* Floating launcher button position - hidden by default until widget script mounts and activates */}
      <div
        id="mfa-ai-launcher"
        data-widget-ready="false"
        className="fixed bottom-5 right-5 z-40 hidden [&[data-widget-ready=true]]:flex items-center justify-center w-14 h-14 rounded-full bg-volt text-pitch-black shadow-volt-glow cursor-pointer transition-transform hover:scale-105 active:scale-95"
        aria-label="Open MFA Sports AI Jersey Assistant"
      >
        <span className="sr-only">AI Assistant</span>
      </div>

      {/* Optional external widget script, loaded only when NEXT_PUBLIC_AI_WIDGET_URL is set */}
      {widgetUrl && (
        <Script
          src={widgetUrl}
          strategy="lazyOnload"
          onLoad={() => {
            const launcher = document.getElementById('mfa-ai-launcher');
            if (launcher) launcher.setAttribute('data-widget-ready', 'true');
          }}
        />
      )}
    </>
  );
}
