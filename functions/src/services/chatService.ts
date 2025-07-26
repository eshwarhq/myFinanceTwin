import { Request, Response } from "express"

const chat = async (req: Request, res: Response): Promise<void> => {
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const data = "This is how ChatGPT sends data... streaming like a beast.";

        for (let i = 0; i < data.length; i++) {
            res.write(data[i]);
            await new Promise(r => setTimeout(r, 30));
        }

        res.end();
    } catch (error) {
        console.error("Stream error:", error);
    }
}

export default { chat } as const;