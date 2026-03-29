import llmFundamentals from './llm-fundamentals.json';
import retrievalAugmentedGenerationRag from './retrieval-augmented-generation-rag.json';
import promptEngineering from './prompt-engineering.json';
import agents from './agents.json';
import vectorDatabases from './vector-databases.json';
import fineTuning from './fine-tuning.json';
import multimodalAi from './multimodal-ai.json';
import aiSafety from './ai-safety.json';
import langchainLanggraph from './langchain-langgraph.json';
import productionGenai from './production-genai.json';

export const generativeAi = {
  id: 'generative-ai',
  title: 'Generative AI',
  topics: [llmFundamentals, retrievalAugmentedGenerationRag, promptEngineering, agents, vectorDatabases, fineTuning, multimodalAi, aiSafety, langchainLanggraph, productionGenai]
};