import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const BAGGAGE_POLICY = `Baggage policy: Each passenger may bring one carry-on bag and one checked bag. The carry-on must fit in the overhead bin or under the seat in front of the passenger. Keep medications, travel documents, valuables, and fragile items in the carry-on rather than checked baggage. Bags must be securely closed and labeled with the passenger's name and contact information. Prohibited items may not be packed in either bag; passengers should check current airport security requirements and restrictions for their itinerary before traveling. Use the airline's designated bag-drop counter and allow enough time for screening and processing. Keep the baggage receipt until the checked bag is returned. If a bag is delayed, missing, or damaged, report it to an airline representative as soon as possible and retain the claim reference and receipt. Support agents should explain reporting steps, collect contact details, and avoid promising delivery times or reimbursement before the case is reviewed. Additional, oversized, and special-handling baggage may have separate rules or fees, so confirm the terms for the specific flight before advising the passenger.`.repeat(25);
async function main(systemMessage: string) {
    const msg = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 500,
        system: [
            { type: "text", text: systemMessage },
            { type: "text", text: BAGGAGE_POLICY, cache_control: { type: "ephemeral" } },
        ],
        messages: [
            { role: "user", content: "Can I bring a 28kg bag on an economy ticket?" }
        ]
    });
    return JSON.stringify(msg, null, 2);
}

async function ask() {
    const response = await main("Act as an airline support agent of Maya's airline company.");
    console.log("Call 1 -", response);
    const response2 = await main("Act as an airline support agent of Maya's airline company.");
    console.log("Call 2 -", response2);
    const response3 = await main(`Act as an airline support agent of Maya's airline company. Today is ${new Date().toISOString()}`);
    console.log("Call 3 -", response3);
}

ask().catch(console.error);

/**
 * 
 * Call 1 - {
  "input_tokens": 19,
  "cache_creation_input_tokens": 0,
  "cache_read_input_tokens": 5684,
  "cache_creation": {
    "ephemeral_5m_input_tokens": 0,
    "ephemeral_1h_input_tokens": 0
  },
  "output_tokens": 226,
  "service_tier": "standard",
  "inference_geo": "not_available",
  "speed": "standard"
}
Call 2 - {
  "input_tokens": 19,
  "cache_creation_input_tokens": 0,
  "cache_read_input_tokens": 5684,
  "cache_creation": {
    "ephemeral_5m_input_tokens": 0,
    "ephemeral_1h_input_tokens": 0
  },
  "output_tokens": 219,
  "service_tier": "standard",
  "inference_geo": "not_available",
  "speed": "standard"
}
Call 3 - {
  "input_tokens": 19,
  "cache_creation_input_tokens": 5702,
  "cache_read_input_tokens": 0,
  "cache_creation": {
    "ephemeral_5m_input_tokens": 5702,
    "ephemeral_1h_input_tokens": 0
  },
  "output_tokens": 210,
  "service_tier": "standard",
  "inference_geo": "not_available",
  "speed": "standard"
}
 */