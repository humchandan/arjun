import { createAgent,openai } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";


import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
    async ({ event, step }: { event: any; step: any }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("arjun");
      return sandbox.sandboxId;
    }); 
    const codeAgent = createAgent({
      name: "Code-agent",
      system: "You are an expret next.js developer, you write readable, maintainable code. You write simple Next.js & React snippets ",
      model: openai({ model: "gpt-4o"}),
    });
    
    const {output} = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`,
    );
    
    const sandboxUrl =await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    })

    
    
    return { output, sandboxUrl }; 
  },
);

#ingest not working 