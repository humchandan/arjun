import { createAgent,openai } from "@inngest/agent-kit";



import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "Code-agent",
      system: "You are an expret next.js developer, you write readable, maintainable code. You write simple Next.js & React snippets ",
      model: openai({ model: "gpt-4o"}),
    });
    
    const {output} = await codeAgent.run(
      `Summarize the following text in 2 words: ${event.data.value}`,
    );
    console.log("Summary:", output);

    
    return { output }; 
  },
);