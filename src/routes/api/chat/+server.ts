import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

import { GOOGLE_API_KEY } from '$env/static/private';

const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_API_KEY,
});

export async function POST({ request }: any) {
  const { messages } = await request.json();

  const result = streamText({
    model: google('gemini-2.5-flash-preview-04-17'),
    system: 'Please format your responses using GitHub Flavored Markdown (GFM). Use code blocks with language specifiers for code examples, and use other markdown formatting like **bold**, *italic*, headers, and lists where appropriate.',
    messages,
  });

  return result.toDataStreamResponse();
}
