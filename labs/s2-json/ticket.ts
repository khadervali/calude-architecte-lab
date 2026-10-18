import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

const client = new Anthropic();

const TICKET_STRUCTURE = z.object({
    category: z.enum(["lost_bag", "damaged_bag", "fee_question", "other"]),
    flight: z.string().nullable().describe("Flight number ONLY if the customer wrote it. Otherwise null."),
    urgency: z.enum(["low", "medium", "high"]),
    needs_human: z.boolean().describe("true if lost/damaged bag or angry customer; false for simple fee questions")
});

async function main(message: string) {
    const msg = await client.messages.parse({
        model: "claude-haiku-4-5",
        max_tokens: 500,
        system: [
            { type: "text", text: `Act as an airline support agent of Maya's airline company.` }
        ],
        output_config: { format: zodOutputFormat(TICKET_STRUCTURE) },
        messages: [
            { role: "user", content: message }
        ]
    });
    if (msg.parsed_output === null) {
        throw new Error("No structured ticket output was returned.");
    }
    return checkFlight(msg.parsed_output, message);
}

async function ask() {
    const EMAILS = [
        "Hi, I flew MA204 from Oslo yesterday and my red suitcase never showed up on the belt. I have medication in it. Please help!",
        "How much does it cost to add a second checked bag on flight MA118?",
        "My stroller came out of the plane with a broken wheel. Flight MA331.",
        "I'm so angry. Third time this year. Nobody answers the phone. Fix this NOW.",
        "Hello, where do I pick up a bag that was delivered to the wrong airport?"
    ];
    for (let i = 0; i < EMAILS.length; i++) {
        try {
            const email = await main(EMAILS[i]);
            console.log(`Email ${i + 1} -`, email);
        } catch (error) {
            const failure = {
                email: (i+1),
                ok: false,
                reason: /parse|parsing/i.test(errorFormat(error)) ? "truncated" : "api_error",
                details: errorFormat(error),
            };
            console.error(failure);
        }
    }
}

function errorFormat(error: Error | unknown) {
    return error instanceof Error ? error.message : String(error);
}

function checkFlight(ticket: z.infer<typeof TICKET_STRUCTURE>, email: string) {
    const normalizedEmail = email.replace(/[^a-z0-9]/gi, "").toUpperCase();
    const normalizedFlight = ticket.flight?.replace(/[^a-z0-9]/gi, "").toUpperCase();
     if (ticket.flight !== null && !normalizedEmail.includes(normalizedFlight!)) {
         ticket.flight = null;
     }
    return ticket;
};

ask().catch(console.error);
const a = checkFlight({ category: 'lost_bag', flight: 'MA204', urgency: 'high', needs_human: true }, "Hi, I flew MA204 from Oslo yesterday and my red suitcase never showed up on the belt. I have medication in it. Please help!");
const b = checkFlight({ category: 'fee_question', flight: 'MA999', urgency: 'low', needs_human: true }, "How much does it cost to add a second checked bag on flight MA118?");
console.log("Test A:", a.flight === "MA204" ? "PASS ✅" : "FAIL ❌");
console.log("Test B:", b.flight === null ? "PASS ✅" : "FAIL ❌");
/**
 * Step 1 5 emails
 * Email 1 - {
  category: 'lost_bag',
  flight: 'MA204',
  urgency: 'high',
  needs_human: true
}
Email 2 - {
  category: 'fee_question',
  flight: 'MA118',
  urgency: 'low',
  needs_human: true
}
Email 3 - {
  category: 'damaged_bag',
  flight: 'MA331',
  urgency: 'medium',
  needs_human: true
}
Email 4 - { category: 'other', flight: null, urgency: 'high', needs_human: true }
Email 5 - {
  category: 'lost_bag',
  flight: null,
  urgency: 'high',
  needs_human: true
}
 */