import Image from "next/image";
import { useEffect, useState } from "react";

const ShimmerMessages = () => {
    const messages = [
    "Thinking...",
    "Loading...",
    "Generating...",
    "Analysing your request...",
    "Building your website...",
    "Crafting components...",
    "Optimizing layout...",
    "Adding final touches...",
    "Almonst ready...",
    "Your website is ready!",
];

const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

useEffect(() => {
const interval =setInterval(() => {
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
}, 2000);

return () => clearInterval(interval);
}, [messages.length]);

return (
    <div className="flex items-center gap-2">
        <span className="text-base text-muted-foreground animate-pulse">
        {messages[currentMessageIndex]}
    </span>
    </div>
);
};

export const MessageLoading = () => {
    return (
        <div className="flex flex-col group px-2 pb-4">
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image 
                src="logo.svg"
                alt="arjun"
                width={18}
                height={18}
                className="shrinl-0"
                />
                <span className="text-sm font-medium">arjun</span>
            </div>
            <div>
            <ShimmerMessages />
            </div>
        </div>
    );
}; 
  