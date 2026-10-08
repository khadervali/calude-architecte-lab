import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

async function main() {
    const a = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 200,
        messages: [{ role: "user", content: "My name is Khader and my order number is 4471." }]
    });
    console.log(JSON.stringify(a, null, 2));

    const b = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 200,
        messages: [
            { role: "user", content: "My name is Khader and my order number is 4471." },
            { role: "assistant", content: a.content },
            { role: "user", content: "what is my order number?" }

        ]
    });
    console.log(JSON.stringify(b, null, 2));
}

main();

/*
Output:
Before fixing anything: 
Call A
{
  "model": "claude-haiku-4-5-20251001",
  "id": "msg_011CfohMHKmyweVNeVcFPFxD",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Hello Khader! Thank you for providing your order number 4471. \n\nHow can I help you today? Are you looking to:\n- Checkon your order status\n- Make changes to your order\n- Report an issue with your delivery\n- Ask a question about your purchase\n\nPlease let me know what you need assistance with!"
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
    "output_tokens": 74,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "diagnostics": null
}
  Call B
{
  "model": "claude-haiku-4-5-20251001",
  "id": "msg_011CfohMMy5UZpUc15ADALxf",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I don't have access to any information about your orders. To find your order number, you could:\n\n1. **Check your email** - Look for order confirmation emails from the company you ordered from\n2. **Log into your account** - Visit the retailer's website and sign in to view your order history\n3. **Check your receipt** - If you have a physical or digital receipt, it should have the order number\n4. **Contact customer service** - Reach out to the company directly with your details\n\nIf you let me know which company or service you ordered from, I can give you more specific guidance!"
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 13,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 133,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "diagnostics": null
}

After fixing:

{
  "model": "claude-haiku-4-5-20251001",
  "id": "msg_011CfooAWJXATomawRLFSHcw",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Hello Khader! Thank you for providing your order number **4471**. \n\nHow can I help you today? Are you looking to:\n- Track your order status?\n- Ask about a product in your order?\n- Report an issue with your order?\n- Get information about returns or refunds?\n\nPlease let me know what you need assistance with."
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
    "output_tokens": 81,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "diagnostics": null
}
{
  "model": "claude-haiku-4-5-20251001",
  "id": "msg_011CfooAb8VnrNtVH8rEFmjU",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Your order number is **4471**."
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 112,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 11,
    "service_tier": "standard",
    "inference_geo": "not_available"
  },
  "diagnostics": null
}
*/