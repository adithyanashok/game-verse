import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { Content } from './interface/content.interface';

@Injectable()
export class AiProvider {
  constructor() {}
  ai = new GoogleGenAI({});
  public async aiOverview(content: Content[], review: Content | null) {
    const stringContent = JSON.stringify(content);
    const reviewText = JSON.stringify(review);
    const prompt = `
            Analyze the following game reviews. Provide a concise summary of the main positive feedback, the most common criticisms, and any suggestions for improvement. Present the summary as:
            - A list of pros
            - A list of cons
            - A final takeaway conclusion
            - Lessthan 100 words

            Reviews:
            ${stringContent}

            ${review ? `Additional Review:\n${reviewText}` : ''}
            `;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  }
}
