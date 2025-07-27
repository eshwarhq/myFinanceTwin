
import { Request, Response } from "express";
import {
  VertexAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google-cloud/vertexai";

const chat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { history, message } = req.body;
    console.log(req.body)
    const vertex_ai = new VertexAI({
      project: "my-finance-demo",
      location: "us-central1",
    });
    const model = "gemini-1.0-pro-001";

    const generativeModel = vertex_ai.preview.getGenerativeModel({
      model: model,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.2,
        topP: 1,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const chat = generativeModel.startChat({
      history: history,
    });

    const stream = await chat.sendMessage(message);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // for await (const item of stream.stream) {
    //   res.write(JSON.stringify(item));
    // }

    res.send({stream});
  } catch (error) {
    console.error("Stream error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default { chat } as const;
