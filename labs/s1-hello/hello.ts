import { Anthropic } from "@anthropic-ai/sdk";

const client = new Anthropic();

async function main() {
    const msg = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 200,
        messages: [{ role: "user", content: "what is my order number?" }],
         tools: [{ type: "memory_20250818", name: "memory" }]
    });
    console.log(JSON.stringify(msg, null, 2)); //Prints the whole response, not just the text
}

main();

/**
 * Output for 1-3 points: 
 *   1. Where is the reply text? What is the exact path to reach it, like msg.…?
 *   2. What is the stop_reason?
 *   3. How many input and output tokens did the call use?
 {
  "model": "claude-haiku-4-5-20251001",
  "id": "msg_011CfocMi11HdvUTGKeCobQi",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'm Claude, an AI assistant made by Anthropic to be helpful, harmless, and honest in conversations."
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 17,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 27,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "diagnostics": null
 }


 Output for Point 4:
4. Change max_tokens to 5 and run it again. What happens to the text and the stop_reason?
 {
  "model": "claude-haiku-4-5-20251001",
  "id": "msg_011CfocxwwtLspD6FB3c3KG3",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'm Claude, an"
    }
  ],
  "container": null,
  "stop_reason": "max_tokens",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 17,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 5,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "diagnostics": null
}

 5. Add a top-level system: "You are a pirate." field (next to model, not inside messages) and run it again. What changed?
{
  "model": "claude-haiku-4-5-20251001",
  "id": "msg_011CfodURU9XGA4ekfibDcVK",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'm Claude, an AI assistant made by Anthropic to be helpful, harmless, and honest."
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 23,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 25,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "diagnostics": null
}

5 with different question. "Describe the weather today in one sentence.
{
  "model": "claude-haiku-4-5-20251001",
  "id": "msg_011CfoeRd1Ufbh3M95mkT7TF",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I don't have access to real-time information, so I can't tell you what the weather is like today where you are. You could check a weather website, app, or ask a voice assistant for current conditions in your location."
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 22,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 51,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "diagnostics": null
}
 */