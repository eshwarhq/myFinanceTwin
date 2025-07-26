// myFinanceTwin/functions/src/services/fiMcpService.ts
import axios, { AxiosResponse } from 'axios';

// const FI_MCP_BASE_URL = 'http://localhost:8080'; // Replace with actual port

// Define types for tool call
export interface ToolCallPayload {
  [key: string]: any;
}

export interface ToolCallResponse {
  result: any;
  [key: string]: any;
}

// Updated: Call a tool endpoint using JSON-RPC and session header
export async function callTool(
  toolName: string,
  args: object = {},
  sessionId: any,
): Promise<any> {
  const url = `http://34.46.24.70:8080/mcp/stream`;
  const body = {
    jsonrpc: "2.0",
    id: `${toolName}-${Date.now()}`,
    method: "tools/call",
    params: {
      name: toolName,
      arguments: args
    }
  };
  console.log('**********', sessionId)

  const response: AxiosResponse<any> = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      "Mcp-Session-Id": sessionId
    }
  });

  console.log('**********', response)
  return response.data;
}

// // Add more functions for other endpoints as needed
// export async function streamData(): Promise<any> {
//   const url = `${FI_MCP_BASE_URL}/stream`;
//   const response: AxiosResponse<any> = await axios.get(url);
//   return response.data;
// }

// ...add more as needed