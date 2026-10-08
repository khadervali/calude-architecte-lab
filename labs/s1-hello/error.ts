import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

async function main() {
    try {
    const msg = await client.messages.create({
        model: "claude-banana",
        max_tokens: 200,
        messages: []
    });
    
    console.log(JSON.stringify(msg, null, 2));
    } catch (error) {
        console.error("Caught an error:", error);
    }
}

main();

/*
Output:
1. Bad model name: model: "claude-banana"
Caught an error: NotFoundError: 404 {"type":"error","error":{"type":"not_found_error","message":"model: claude-banana"},"request_id":"req_011Cfop73HMp5HAvDitB1AjL"}
    at APIError.generate (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/node_modules/@anthropic-ai/sdk/src/core/error.ts:87:14)
    at Anthropic.makeStatusError (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/node_modules/@anthropic-ai/sdk/src/client.ts:1152:28)
    at Anthropic.makeRequest (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/node_modules/@anthropic-ai/sdk/src/client.ts:1456:24)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async main (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/error.ts:7:17) {
  status: 404,
  headers: Headers {
    date: 'Thu, 08 Oct 2026 00:20:28 GMT',
    'content-type': 'application/json',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'x-should-retry': 'false',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'request-id': 'req_011Cfop73HMp5HAvDitB1AjL',
    traceresponse: '00-1480c5bf18acde6b681e6911cebd4660-a590723a57c5e0de-01',
    'anthropic-organization-id': 'c7cfcc2d-ae6e-44ad-a4f8-ba5ac88850fc',
    'anthropic-workspace-id': 'wrkspc_01243xkYDUjCGCirTczHgVwY',
    vary: 'Accept-Encoding',
    'content-encoding': 'br',
    server: 'cloudflare',
    'cf-cache-status': 'DYNAMIC',
    'x-robots-tag': 'none',
    'content-security-policy': "default-src 'none'; frame-ancestors 'none'",
    'cf-ray': 'a470fad8e9c9efdb-ARN'
  },
  requestID: 'req_011Cfop73HMp5HAvDitB1AjL',
  workspaceID: 'wrkspc_01243xkYDUjCGCirTczHgVwY',
  error: {
    type: 'error',
    error: { type: 'not_found_error', message: 'model: claude-banana' },
    request_id: 'req_011Cfop73HMp5HAvDitB1AjL'
  },
  type: 'not_found_error'
}
  2.Bad API key: construct the client with new Anthropic({ apiKey: "sk-ant-wrong" })
Caught an error: AuthenticationError: 401 {"type":"error","error":{"type":"authentication_error","message":"API key is invalid."},"request_id":null}
    at APIError.generate (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/node_modules/@anthropic-ai/sdk/src/core/error.ts:79:14)
    at Anthropic.makeStatusError (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/node_modules/@anthropic-ai/sdk/src/client.ts:1152:28)
    at Anthropic.makeRequest (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/node_modules/@anthropic-ai/sdk/src/client.ts:1456:24)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async main (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/error.ts:7:17) {
  status: 401,
  headers: Headers {
    date: 'Thu, 08 Oct 2026 00:22:01 GMT',
    'content-type': 'application/json',
    'content-length': '106',
    connection: 'keep-alive',
    'cache-control': 'no-store',
    'x-should-retry': 'false',
    server: 'cloudflare',
    'cf-cache-status': 'DYNAMIC',
    'x-robots-tag': 'none',
    'content-security-policy': "default-src 'none'; frame-ancestors 'none'",
    'cf-ray': 'a470fd20ef1a4eff-ARN'
  },
  requestID: null,
  workspaceID: null,
  error: {
    type: 'error',
    error: { type: 'authentication_error', message: 'API key is invalid.' },
    request_id: null
  },
  type: 'authentication_error'
}
  3.Empty conversation: messages: []

  Caught an error: BadRequestError: 400 {"type":"error","error":{"type":"invalid_request_error","message":"messages: at least one messageis required"},"request_id":"req_011CfopM8pdAquayoZSFWG9R"}
    at APIError.generate (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/node_modules/@anthropic-ai/sdk/src/core/error.ts:75:14)
    at Anthropic.makeStatusError (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/node_modules/@anthropic-ai/sdk/src/client.ts:1152:28)
    at Anthropic.makeRequest (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/node_modules/@anthropic-ai/sdk/src/client.ts:1456:24)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async main (/Users/Khader.Kalava/Documents/AI/claude-architect-lab/labs/s1-hello/error.ts:7:17) {
  status: 400,
  headers: Headers {
    date: 'Thu, 08 Oct 2026 00:23:39 GMT',
    'content-type': 'application/json',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'x-should-retry': 'false',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'request-id': 'req_011CfopM8pdAquayoZSFWG9R',
    traceresponse: '00-b92029fb264d1f7a334bddd41f2f4650-0388ac0d6eaa48be-01',
    'anthropic-organization-id': 'c7cfcc2d-ae6e-44ad-a4f8-ba5ac88850fc',
    'anthropic-workspace-id': 'wrkspc_01243xkYDUjCGCirTczHgVwY',
    vary: 'Accept-Encoding',
    'content-encoding': 'br',
    server: 'cloudflare',
    'cf-cache-status': 'DYNAMIC',
    'x-robots-tag': 'none',
    'content-security-policy': "default-src 'none'; frame-ancestors 'none'",
    'cf-ray': 'a470ff83ca950cc3-ARN'
  },
  requestID: 'req_011CfopM8pdAquayoZSFWG9R',
  workspaceID: 'wrkspc_01243xkYDUjCGCirTczHgVwY',
  error: {
    type: 'error',
    error: {
      type: 'invalid_request_error',
      message: 'messages: at least one message is required'
    },
    request_id: 'req_011CfopM8pdAquayoZSFWG9R'
  },
  type: 'invalid_request_error'
}
*/